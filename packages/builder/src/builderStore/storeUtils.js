import {
  makePropsSafe,
  getBuiltin,
} from "components/userInterface/pagesParsing/createProps"
import api from "./api"
import { generate_screen_css } from "./generate_css"
import { uuid } from "./uuid"
import getNewComponentName from "./getNewComponentName"

export const selectComponent = (state, component) => {
  const componentDef = component._component.startsWith("##")
    ? component
    : state.components[component._component]
  state.currentComponentInfo = makePropsSafe(componentDef, component)
  state.currentView = "component"
  return state
}

export const getParent = (rootProps, child) => {
  let parent
  walkProps(rootProps, (p, breakWalk) => {
    if (
      p._children &&
      (p._children.includes(child) || p._children.some(c => c._id === child))
    ) {
      parent = p
      breakWalk()
    }
  })
  return parent
}

export const saveCurrentPreviewItem = s =>
  s.currentFrontEndType === "page"
    ? savePage(s)
    : saveScreenApi(s.currentPreviewItem, s)

export const savePage = async s => {
  const pageName = s.currentPageName || "main"
  const page = s.pages[pageName]
  await api.post(`/_builder/api/${s.appId}/pages/${pageName}`, {
    page: { componentLibraries: s.pages.componentLibraries, ...page },
    uiFunctions: s.currentPageFunctions,
    screens: page._screens,
  })
}

export const saveScreenApi = (screen, s) => {
  api
    .post(`/_builder/api/${s.appId}/pages/${s.currentPageName}/screen`, screen)
    .then(() => savePage(s))
}

export const renameCurrentScreen = (newname, state) => {
  const oldname = state.currentPreviewItem.props._instanceName
  state.currentPreviewItem.props._instanceName = newname

  api.patch(
    `/_builder/api/${state.appId}/pages/${state.currentPageName}/screen`,
    {
      oldname,
      newname,
    }
  )
  return state
}

export const walkProps = (props, action, cancelToken = null) => {
  cancelToken = cancelToken || { cancelled: false }
  action(props, () => {
    cancelToken.cancelled = true
  })

  if (props._children) {
    for (let child of props._children) {
      if (cancelToken.cancelled) return
      walkProps(child, action, cancelToken)
    }
  }
}

export const regenerateCssForScreen = screen => {
  screen._css = generate_screen_css([screen.props])
}

export const regenerateCssForCurrentScreen = state => {
  if (state.currentPreviewItem) {
    regenerateCssForScreen(state.currentPreviewItem)
  }
  return state
}

export const generateNewIdsForComponent = (c, state, changeName = true) =>
  walkProps(c, p => {
    p._id = uuid()
    if (changeName) p._instanceName = getNewComponentName(p._component, state)
  })

export const getComponentDefinition = (state, name) =>
  name.startsWith("##") ? getBuiltin(name) : state.components[name]

export const findChildComponentType = (node, typeToFind) => {
  // Stop recursion if invalid props
  if (!node || !typeToFind) {
    return null
  }

  // Stop recursion if this element matches
  if (node._component === typeToFind) {
    return node
  }

  // Otherwise check if any children match
  // Stop recursion if no valid children to process
  const children = node._children || (node.props && node.props._children)
  if (!children || !children.length) {
    return null
  }

  // Recurse and check each child component
  for (let child of children) {
    const childResult = findChildComponentType(child, typeToFind)
    if (childResult) {
      return childResult
    }
  }

  // If we reach here then no children were valid
  return null
}
