<script>
  import { getColorSchema, getChartGradient, notNull } from "./utils"
  import britecharts from "britecharts"
  import { onMount } from "svelte"

  import { select } from "d3-selection"
  import shortid from "shortid"

  const _id = shortid.generate()

  export let _bb
  export let table

  let store = _bb.store

  const chart = britecharts.heatmap()
  const chartClass = `heatmap-container-${_id}`
  const legendClass = `legend-container-${_id}`

  let chartElement = null
  let chartContainer = null

  export let data = []
  export let color = "britecharts"
  export let height = 200
  export let width = 200
  export let margin = { top: 0, right: 0, bottom: 0, left: 0 }
  export let useLegend = true
  export let yAxisLabels = null
  export let boxSize = null

  onMount(async () => {
    if (chart) {
      if (table) {
        await fetchData()
      }
      chartContainer = select(`.${chartClass}`)
      bindChartUIProps()
      chartContainer.datum(data).call(chart)
    }
  })

  async function fetchData() {
    const FETCH_ROWS_URL = `/api/views/all_${table}`
    const response = await _bb.api.get(FETCH_ROWS_URL)
    if (response.status === 200) {
      const json = await response.json()
      store.update(state => {
        state[table] = json
        return state
      })
    } else {
      throw new Error("Failed to fetch rows.", response)
    }
  }

  function bindChartUIProps() {
    if (notNull(color)) {
      chart.colorSchema(colorSchema)
    }
    if (notNull(height)) {
      chart.height(height)
    }
    if (notNull(width)) {
      chart.width(width)
    }
    if (notNull(boxSize)) {
      chart.boxSize(boxSize)
    }
    if (notNull(yAxisLabels)) {
      chart.yAxisLabels(yAxisLabels)
    }
  }

  $: _data = table ? $store[table] : data

  $: colorSchema = getColorSchema(color)
</script>

<div bind:this={chartElement} class={chartClass} />
{#if useLegend}
  <div class={legendClass} />
{/if}
