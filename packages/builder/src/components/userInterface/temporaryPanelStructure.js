import Input from "./PropertyPanelControls/Input.svelte"
import OptionSelect from "./OptionSelect.svelte"
import Checkbox from "../common/Checkbox.svelte"
import TableSelect from "components/userInterface/TableSelect.svelte"
import TableViewSelect from "components/userInterface/TableViewSelect.svelte"
import TableViewFieldSelect from "components/userInterface/TableViewFieldSelect.svelte"
import Event from "components/userInterface/EventsEditor/EventPropertyControl.svelte"
import ScreenSelect from "components/userInterface/ScreenSelect.svelte"
import DetailScreenSelect from "components/userInterface/DetailScreenSelect.svelte"
import { IconSelect } from "components/userInterface/IconSelect"
import Colorpicker from "@budibase/colorpicker"

import { all } from "./propertyCategories.js"
/* 
{ label: "N/A ", value: "N/A" },
{ label: "Flex", value: "flex" },
{ label: "Inline Flex", value: "inline-flex" }, 
*/

export default {
  categories: [
    {
      _component: "@budibase/standard-components/container",
      name: "Container",
      description: "This component contains things within itself",
      icon: "ri-layout-column-line",
      commonProps: {},
      children: [],
      properties: {
        design: { ...all },
        settings: [
          {
            key: "type",
            label: "Type",
            control: OptionSelect,
            options: [
              "article",
              "aside",
              "details",
              "div",
              "figure",
              "figcaption",
              "footer",
              "header",
              "main",
              "mark",
              "nav",
              "paragraph",
              "summary",
            ],
          },
        ],
      },
    },
    {
      name: "Grid",
      _component: "@budibase/standard-components/datagrid",
      description:
        "a datagrid component with functionality to add, remove and edit rows.",
      icon: "ri-grid-line",
      properties: {
        design: { ...all },
        settings: [
          {
            label: "Source",
            key: "datasource",
            control: TableViewSelect,
          },
          {
            label: "Detail URL",
            key: "detailUrl",
            control: DetailScreenSelect,
          },
          {
            label: "Editable",
            key: "editable",
            valueKey: "checked",
            control: Checkbox,
          },
          {
            label: "Theme",
            key: "theme",
            control: OptionSelect,
            options: [
              "alpine",
              "alpine-dark",
              "balham",
              "balham-dark",
              "material",
            ],
            placeholder: "alpine",
          },
          {
            label: "Height",
            key: "height",
            defaultValue: "500",
            control: Input,
          },
          {
            label: "Pagination",
            key: "pagination",
            valueKey: "checked",
            control: Checkbox,
          },
        ],
      },
      children: [],
    },
    {
      name: "Repeater",
      _component: "@budibase/standard-components/list",
      description: "Renders all children once per row, of a given table",
      icon: "ri-list-check-2",
      properties: {
        design: { ...all },
        settings: [
          {
            label: "Data",
            key: "datasource",
            control: TableViewSelect,
          },
        ],
      },
      children: [],
    },
    {
      _component: "@budibase/standard-components/button",
      name: "Button",
      description: "A basic html button that is ready for styling",
      icon: "ri-share-box-line",
      children: [],
      properties: {
        design: {
          ...all,
        },
        settings: [
          { label: "Text", key: "text", control: Input },
          {
            label: "Disabled",
            key: "disabled",
            valueKey: "checked",
            control: Checkbox,
          },
          { label: "On Click", key: "onClick", control: Event },
        ],
      },
    },
    {
      name: "Form",
      icon: "ri-file-edit-line",
      isCategory: true,
      children: [
        {
          _component: "@budibase/standard-components/dataform",
          name: "Form Basic",
          icon: "ri-file-edit-line",
          properties: {
            design: { ...all },
            settings: [],
          },
        },
        {
          _component: "@budibase/standard-components/dataformwide",
          name: "Form Wide",
          icon: "ri-file-edit-line",
          properties: {
            design: { ...all },
            settings: [],
          },
        },
        {
          _component: "@budibase/standard-components/input",
          name: "Textfield",
          description:
            "A textfield component that allows the user to input text.",
          icon: "ri-edit-box-line",
          properties: {
            design: { ...all },
            settings: [
              { label: "Label", key: "label", control: Input },
              {
                label: "Type",
                key: "type",
                control: OptionSelect,
                options: ["text", "password"],
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/datepicker",
          name: "Date Picker",
          description: "A basic date picker component",
          icon: "ri-calendar-line",
          children: [],
          properties: {
            design: { ...all },
            settings: [
              { label: "Placeholder", key: "placeholder", control: Input },
            ],
          },
        },
      ],
    },
    {
      name: "Card",
      icon: "ri-archive-drawer-line",
      isCategory: true,
      children: [
        {
          _component: "@budibase/standard-components/stackedlist",
          name: "Stacked List",
          icon: "ri-archive-drawer-line",
          description:
            "A basic card component that can contain content and actions.",
          children: [],
          properties: {
            design: { ...all },
            settings: [
              {
                label: "Image",
                key: "imageUrl",
                control: Input,
                placeholder: "{{{context.Image}}}",
              },
              {
                label: "Heading",
                key: "heading",
                control: Input,
                placeholder: "{{context.Heading}}",
              },
              {
                label: "Text 1",
                key: "text1",
                control: Input,
                placeholder: "{{context.Text 1}}",
              },
              {
                label: "Text 2",
                key: "text2",
                control: Input,
                placeholder: "{{context.Text 2}}",
              },
              {
                label: "Text 3",
                key: "text3",
                control: Input,
                placeholder: "{{context.Text 3}}",
              },
              {
                label: "Link URL",
                key: "destinationUrl",
                control: ScreenSelect,
                placeholder: "/table/_id",
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/card",
          name: "Vertical",
          description:
            "A basic card component that can contain content and actions.",
          icon: "ri-layout-column-line",
          children: [],
          properties: {
            design: { ...all },
            settings: [
              {
                label: "Image",
                key: "imageUrl",
                control: Input,
                placeholder: "Image",
              },
              {
                label: "Heading",
                key: "heading",
                control: Input,
                placeholder: "Heading",
              },
              {
                label: "Description",
                key: "description",
                control: Input,
                placeholder: "Description",
              },
              {
                label: "Link Text",
                key: "linkText",
                control: Input,
                placeholder: "Link Text",
              },
              {
                label: "Link Url",
                key: "linkUrl",
                control: ScreenSelect,
                placeholder: "Link URL",
              },
              {
                label: "Link Color",
                key: "color",
                control: Input,
                placeholder: "Link Color",
              },
              {
                label: "Hover Color",
                key: "linkHoverColor",
                control: Input,
                placeholder: "Hover Color",
              },
              {
                label: "Image Height",
                key: "imageHeight",
                control: OptionSelect,
                options: ["12rem", "16rem", "20rem", "24rem"],
                placeholder: "Image Height",
              },
              {
                label: "Card Width",
                key: "cardWidth",
                control: OptionSelect,
                options: ["16rem", "20rem", "24rem"],
                placeholder: "Card Width",
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/cardhorizontal",
          name: "Horizontal",
          description:
            "A basic card component that can contain content and actions.",
          icon: "ri-layout-row-line",
          children: [],
          properties: {
            design: { ...all },
            settings: [
              {
                label: "Image",
                key: "imageUrl",
                control: Input,
                placeholder: "Image",
              },
              {
                label: "Heading",
                key: "heading",
                control: Input,
                placeholder: "Heading",
              },
              {
                label: "Description",
                key: "description",
                control: Input,
                placeholder: "Description",
              },
              {
                label: "Subtext",
                key: "subtext",
                control: Input,
                placeholder: "Subtext",
              },
              {
                label: "Link Text",
                key: "linkText",
                control: Input,
                placeholder: "Link Text",
              },
              {
                label: "Link Url",
                key: "linkUrl",
                control: ScreenSelect,
                placeholder: "Link URL",
              },
              {
                label: "Link Color",
                key: "color",
                control: Input,
                placeholder: "Link Color",
              },
              {
                label: "Hover Color",
                key: "linkHoverColor",
                control: Input,
                placeholder: "Hover Color",
              },
              {
                label: "Card Width",
                key: "cardWidth",
                control: OptionSelect,
                options: [
                  "24rem",
                  "28rem",
                  "32rem",
                  "40rem",
                  "48rem",
                  "60rem",
                  "100%",
                ],
                placeholder: "Card Height",
              },
              {
                label: "Image Width",
                key: "imageWidth",
                control: OptionSelect,
                options: ["8rem", "12rem", "16rem"],
                placeholder: "Image Width",
              },
              {
                label: "Image Height",
                key: "imageHeight",
                control: OptionSelect,
                options: ["8rem", "12rem", "16rem", "auto"],
                placeholder: "Image Height",
              },
            ],
          },
        },
      ],
    },
    {
      name: "Chart",
      icon: "ri-bar-chart-2-line",
      isCategory: true,
      children: [
        {
          name: "Donut",
          _component: "@budibase/standard-components/donut",
          description: "Donut chart",
          icon: "ri-pie-chart-fill",
          properties: {
            settings: [
              {
                label: "Data",
                key: "datasource",
                control: TableViewSelect,
              },
              {
                label: "Name Field",
                key: "nameKey",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Value Field",
                key: "valueKey",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Animate Chart",
                key: "isAnimated",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Hover Highlight",
                key: "hasHoverAnimation",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Keep Last Hover",
                key: "hasLastHoverSliceHighlighted",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Colors",
                key: "color",
                control: OptionSelect,
                options: [
                  "britecharts",
                  "blueGreen",
                  "green",
                  "grey",
                  "orange",
                  "pink",
                  "purple",
                  "red",
                  "teal",
                  "yellow",
                ],
              },
              {
                label: "External Radius",
                key: "externalRadius",
                control: Input,
              },
              {
                label: "Internal Radius",
                key: "internalRadius",
                control: Input,
              },
              {
                label: "Radius Offset",
                key: "radiusHoverOffset ",
                control: Input,
              },
              {
                label: "Show Legend",
                key: "useLegend ",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Horizontal Legend",
                key: "horizontalLegend",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Legend Width",
                key: "legendWidth",
                control: Input,
              },
            ],
          },
        },
        {
          name: "Bar",
          _component: "@budibase/standard-components/bar",
          description: "Bar chart",
          icon: "ri-bar-chart-fill",
          properties: {
            settings: [
              {
                label: "Data",
                key: "datasource",
                control: TableViewSelect,
              },
              {
                label: "Name Label",
                key: "nameLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Value Label",
                key: "valueLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Y Axis Label",
                key: "yAxisLabel",
                control: Input,
              },
              {
                label: "X Axis Label",
                key: "xAxisLabel",
                control: Input,
              },
              {
                label: "X Axis Label Offset",
                key: "xAxisLabelOffset",
                control: Input,
              },
              {
                label: "Y Axis Label Offset",
                key: "yAxisLabelOffset",
                control: Input,
              },
              {
                label: "Enable Labels",
                key: "enableLabels",
                control: Checkbox,
                valueKey: "checked",
              },
              {
                label: "Colors",
                key: "color",
                control: OptionSelect,
                options: [
                  { label: "Normal", value: "britecharts" },
                  { label: "Blue Green", value: "blueGreen" },
                  { label: "Green", value: "green" },
                  { label: "Grey", value: "grey" },
                  { label: "Orange", value: "orange" },
                  { label: "Pink", value: "pink" },
                  { label: "Purple", value: "purple" },
                  { label: "Red", value: "red" },
                  { label: "Teal", value: "teal" },
                  { label: "Yellow", value: "yellow" },
                ],
              },
              {
                label: "Gradients",
                key: "gradient",
                control: OptionSelect,
                options: [
                  { value: "", label: "None" },
                  { value: "bluePurple", label: "Blue Purple" },
                  { value: "greenBlue", label: "Green Blue" },
                  { value: "orangePink", label: "Orange Pink" },
                ],
              },
              {
                label: "Highlight Single Bar",
                key: "hasSingleBarHighlight",
                control: Checkbox,
                valueKey: "checked",
              },
              {
                label: "Width",
                key: "width",
                control: Input,
              },
              {
                label: "Height",
                key: "height",
                control: Input,
              },
              {
                label: "Animate",
                key: "isAnimate",
                control: Checkbox,
                valueKey: "checked",
              },
              {
                label: "Horizontal",
                key: "isHorizontal",
                control: Checkbox,
                valueKey: "checked",
              },
              {
                label: "Label Number Format",
                key: "labelsNumberFormat",
                control: Input,
              },
            ],
          },
        },
        {
          name: "Grouped Bar",
          _component: "@budibase/standard-components/groupedbar",
          description: "Groupedbar chart",
          icon: "ri-bar-chart-grouped-fill",
          properties: {
            settings: [
              {
                label: "Data",
                key: "datasource",
                control: TableViewSelect,
              },
              {
                label: "Name Label",
                key: "nameLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Group Label",
                key: "groupLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Value Label",
                key: "valueLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Color",
                key: "color",
                control: OptionSelect,
                options: [
                  "britecharts",
                  "blueGreen",
                  "green",
                  "grey",
                  "orange",
                  "pink",
                  "purple",
                  "red",
                  "teal",
                  "yellow",
                ],
              },
              {
                label: "Height",
                key: "height",
                control: Input,
              },
              {
                label: "Width",
                key: "width",
                control: Input,
              },
              {
                label: "Aspect Ratio",
                key: "aspectRatio",
                control: Input,
              },
              {
                label: "Grid",
                key: "grid",
                control: OptionSelect,
                options: ["vertical", "horizontal", "full"],
              },
              {
                label: "Value Label",
                key: "valueLabel",
                control: Input,
              },
              {
                label: "Y Ticks",
                key: "yTicks",
                control: Input,
              },
              {
                label: "Y Tick Text Offset",
                key: "yTickTextOffset",
                control: Input,
              },
              {
                label: "Is Animated",
                key: "isAnimated",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Is Horizontal",
                key: "isHorizontal",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Tooltip Title",
                key: "tooltipTitle",
                control: Input,
              },
            ],
          },
        },
        {
          name: "Line",
          _component: "@budibase/standard-components/line",
          description: "Line chart",
          icon: "ri-line-chart-line",
          properties: {
            settings: [
              {
                label: "Data",
                key: "datasource",
                control: TableViewSelect,
              },
              {
                label: "Value Label",
                key: "valueLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Topic Label",
                key: "topicLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Date Label",
                key: "dateLabel",
                dependsOn: "datasource",
                control: TableViewFieldSelect,
              },
              {
                label: "Colors",
                key: "color",
                control: OptionSelect,
                options: [
                  "britecharts",
                  "blueGreen",
                  "green",
                  "grey",
                  "orange",
                  "pink",
                  "purple",
                  "red",
                  "teal",
                  "yellow",
                ],
              },
              {
                label: "Gradients",
                key: "lineGradient",
                control: OptionSelect,
                options: [
                  { value: "", label: "None" },
                  { value: "bluePurple", label: "Blue Purple" },
                  { value: "greenBlue", label: "Green Blue" },
                  { value: "orangePink", label: "Orange Pink" },
                ],
              },
              {
                label: "Line Curve",
                key: "lineCurve",
                control: OptionSelect,
                options: [
                  "linear",
                  "basis",
                  "natural",
                  "monotoneX",
                  "monotoneY",
                  "step",
                  "stepAfter",
                  "stepBefore",
                  "cardinal",
                  "catmullRom",
                ],
              },
              {
                label: "X Axis Value Type",
                key: "xAxisValueType",
                control: OptionSelect,
                options: ["date", "number"],
              },
              {
                label: "Grid",
                key: "grid",
                control: OptionSelect,
                options: ["vertical", "horizontal", "full"],
              },
              {
                label: "X Axis Label",
                key: "xAxisLabel",
                control: Input,
              },
              {
                label: "Y Axis Label",
                key: "yAxisLabel",
                control: Input,
              },
              {
                label: "Show All Datapoints",
                key: "shouldShowAllDataPoints",
                valueKey: "checked",
                control: Checkbox,
              },
              {
                label: "Width",
                key: "width",
                control: Input,
              },
              {
                label: "Height",
                key: "height",
                control: Input,
              },
              {
                label: "Is Animated",
                key: "isAnimated",
                control: Checkbox,
                valueKey: "checked",
              },
              {
                label: "Locale",
                key: "locale",
                control: OptionSelect,
                options: ["en-GB", "en-US"],
              },
              {
                label: "X Axis Value Type",
                key: "xAxisValueType",
                control: OptionSelect,
                options: ["date", "numeric"],
              },
              {
                label: "X Axis Format",
                key: "xAxisFormat",
                control: OptionSelect,
                options: [
                  "day-month",
                  "minute-hour",
                  "hour-daymonth",
                  "month-year",
                  "custom",
                ],
              },
              {
                label: "X Axis Custom Format",
                key: "xAxisCustomFormat",
                control: Input,
              },
              {
                label: "Tooltip Title",
                key: "tooltipTitle",
                control: Input,
              },
              {
                label: "X Ticks",
                key: "xTicks",
                control: Input,
              },
              {
                label: "Y Ticks",
                key: "yTicks",
                control: Input,
              },
            ],
          },
        },
      ],
    },
    {
      name: "Elements",
      icon: "ri-paragraph",
      isCategory: true,
      children: [
        {
          _component: "@budibase/standard-components/heading",
          name: "Headline",
          icon: "ri-heading",
          description: "A component for displaying heading text",
          properties: {
            design: { ...all },
            settings: [
              {
                key: "text",
                label: "Text",
                control: Input,
              },
              {
                key: "type",
                label: "Type",
                control: OptionSelect,
                options: ["h1", "h2", "h3", "h4", "h5", "h6"],
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/text",
          name: "Paragraph",
          description: "A component for displaying paragraph text.",
          icon: "ri-paragraph",
          properties: {
            design: { ...all },
            settings: [
              {
                label: "Text",
                key: "text",
                control: Input,
              },
              {
                label: "Type",
                key: "type",
                control: OptionSelect,
                options: [
                  "none",
                  "bold",
                  "strong",
                  "italic",
                  "emphasis",
                  "mark",
                  "small",
                  "del",
                  "ins",
                  "sub",
                  "sup",
                ],
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/image",
          name: "Image",
          description: "A basic component for displaying images",
          icon: "ri-image-line",
          children: [],
          properties: {
            design: { ...all },
            settings: [{ label: "URL", key: "url", control: Input }],
          },
        },
        {
          _component: "@budibase/standard-components/link",
          name: "Link",
          description: "A basic link component for internal and external links",
          icon: "ri-link",
          children: [],
          properties: {
            design: { ...all },
            settings: [
              { label: "Text", key: "text", control: Input },
              { label: "Url", key: "url", control: ScreenSelect },
              {
                label: "New Tab",
                key: "openInNewTab",
                valueKey: "checked",
                control: Checkbox,
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/icon",
          name: "Icon",
          description: "A basic component for displaying icons",
          icon: "ri-sun-fill",
          children: [],
          properties: {
            design: {},
            settings: [
              { label: "Icon", key: "icon", control: IconSelect },
              {
                label: "Size",
                key: "size",
                control: OptionSelect,
                defaultValue: "fa-lg",
                options: [
                  { value: "fa-xs", label: "xs" },
                  { value: "fa-sm", label: "sm" },
                  { value: "fa-lg", label: "lg" },
                  { value: "fa-2x", label: "2x" },
                  { value: "fa-3x", label: "3x" },
                  { value: "fa-5x", label: "5x" },
                  { value: "fa-7x", label: "7x" },
                  { value: "fa-10x", label: "10x" },
                ],
              },
              {
                label: "Color",
                key: "color",
                control: Colorpicker,
                defaultValue: "#000",
              },
            ],
          },
        },
        {
          _component: "@budibase/standard-components/embed",
          icon: "ri-code-line",
          name: "Embed",
          description: "Embed content from 3rd party sources",
          properties: {
            design: {
              ...all,
            },
            settings: [{ label: "Embed", key: "embed", control: Input }],
          },
        },
      ],
    },
    {
      name: "Other",
      icon: "ri-more-2-line",
      isCategory: true,
      children: [
        {
          _component: "##builtin/screenslot",
          name: "Screen Slot",
          description:
            "This component is a placeholder for the rendering of a screen within a page.",
          icon: "ri-crop-2-line",
          properties: { design: { ...all } },
          commonProps: {},
          children: [],
        },
        {
          name: "Nav Bar",
          _component: "@budibase/standard-components/Navigation",
          description:
            "A component for handling the navigation within your app.",
          icon: "ri-navigation-line",
          children: [],
          properties: {
            design: { ...all },
            settings: [{ label: "Logo URL", key: "logoUrl", control: Input }],
          },
        },
        {
          name: "Login",
          _component: "@budibase/standard-components/login",
          description:
            "A component that automatically generates a login screen for your app.",
          icon: "ri-login-box-line",
          children: [],
          showOnPages: ["unauthenticated"],
          properties: {
            design: { ...all },
            settings: [
              {
                label: "Name",
                key: "name",
                control: Input,
              },
              {
                label: "Logo",
                key: "logo",
                control: Input,
              },
              {
                label: "Title",
                key: "title",
                control: Input,
              },
              {
                label: "Button Text",
                key: "buttonText",
                control: Input,
              },
            ],
          },
        },
        {
          name: "Row Detail",
          _component: "@budibase/standard-components/rowdetail",
          description:
            "Loads a row, using an id from the URL, which can be used with {{ context }}, in children",
          icon: "ri-profile-line",
          properties: {
            design: { ...all },
            settings: [{ label: "Table", key: "table", control: TableSelect }],
          },
          children: [],
        },
        {
          name: "New Row",
          _component: "@budibase/standard-components/newrow",
          description:
            "Sets up a new row for creation, which can be used with {{ context }}, in children",
          icon: "ri-profile-line",
          properties: {
            design: { ...all },
            settings: [{ label: "Table", key: "table", control: TableSelect }],
          },
          children: [],
        },
      ],
    },
  ],
}
