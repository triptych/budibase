<script>
  import Spinner from "components/common/Spinner.svelte"
  import { fade } from "svelte/transition"
</script>

<div class="ag-overlay-loading-center loading-container">
  <div transition:fade class="loading-overlay">
    <img
      height="30"
      width="30"
      src="/_builder/assets/bb-logo.svg"
      alt="Budibase icon" />
    <span> Loading Your Data </span>
    <Spinner size="12" />
  </div>
</div>

<style>
  .loading-overlay {
    display: flex;
    align-items: center;
    font-family: var(--font-sans);
    font-weight: 500;
  }

  .loading-overlay > * {
    margin-right: var(--spacing-m);
  }
</style>
