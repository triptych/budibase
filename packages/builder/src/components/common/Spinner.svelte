<script>
  import { Circle } from "svelte-loading-spinners"

  export let size = "60"
</script>

<div class="spinner-container">
  <Circle {size} color="#000000" unit="px" />
</div>

<style>
  .spinner-container {
    display: block;
  }
</style>
