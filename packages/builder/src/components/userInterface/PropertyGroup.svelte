<script>
  import { excludeProps } from "./propertyCategories.js"
  import PropertyControl from "./PropertyControl.svelte"
  import { DetailSummary } from "@budibase/bbui"

  export let name = ""
  export let styleCategory = "normal"
  export let properties = []
  export let componentInstance = {}
  export let onStyleChanged = () => {}
  export let open = false

  $: style = componentInstance["_styles"][styleCategory] || {}
</script>

<DetailSummary {name} on:open show={open} thin>
  <div>
    {#each properties as props}
      <PropertyControl
        label={props.label}
        control={props.control}
        key={props.key}
        value={style[props.key]}
        onChange={(key, value) => onStyleChanged(styleCategory, key, value)}
        props={{ ...excludeProps(props, ['control', 'label']) }} />
    {/each}
  </div>
</DetailSummary>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: var(--spacing-s);
  }
</style>
