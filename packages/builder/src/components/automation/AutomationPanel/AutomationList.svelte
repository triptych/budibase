<script>
  import { onMount } from "svelte"
  import { automationStore } from "builderStore"
  import NavItem from "components/common/NavItem.svelte"
  import EditAutomationPopover from "./EditAutomationPopover.svelte"

  $: selectedAutomationId = $automationStore.selectedAutomation?.automation?._id

  onMount(() => {
    automationStore.actions.fetch()
  })
</script>

<div class="automations-list">
  {#each $automationStore.automations as automation, idx}
    <NavItem
      border={idx > 0}
      icon="ri-stackshare-line"
      text={automation.name}
      selected={automation._id === selectedAutomationId}
      on:click={() => automationStore.actions.select(automation)}>
      <EditAutomationPopover {automation} />
    </NavItem>
  {/each}
</div>

<style>
  .automations-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
</style>
