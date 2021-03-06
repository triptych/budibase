<script>
  import { fade } from "svelte/transition"
  import { goto, params } from "@sveltech/routify"
  import AgGrid from "@budibase/svelte-ag-grid"

  import api from "builderStore/api"
  import { notifier } from "builderStore/store/notifications"
  import Spinner from "components/common/Spinner.svelte"
  import DeleteRowsButton from "./buttons/DeleteRowsButton.svelte"
  import { getRenderer, editRowRenderer } from "./cells/cellRenderers"
  import TableLoadingOverlay from "./TableLoadingOverlay"
  import TableHeader from "./TableHeader"
  import "@budibase/svelte-ag-grid/dist/index.css"

  export let schema = {}
  export let data = []
  export let tableId
  export let title
  export let allowEditing = false
  export let loading = false
  export let theme = "alpine"

  let columnDefs = []
  let selectedRows = []

  let options = {
    defaultColDef: {
      flex: 1,
      filter: true,
    },
    rowSelection: allowEditing ? "multiple" : false,
    rowMultiSelectWithClick: true,
    suppressRowClickSelection: false,
    paginationAutoPageSize: true,
    pagination: true,
    enableRangeSelection: true,
    popupParent: document.body,
    components: {
      customLoadingOverlay: TableLoadingOverlay,
    },
    loadingOverlayComponent: "customLoadingOverlay",
    animateRows: true,
  }

  $: {
    let result = []
    if (allowEditing) {
      result = [
        {
          pinned: "left",
          headerName: "Edit",
          sortable: false,
          resizable: false,
          suppressMovable: true,
          suppressMenu: true,
          minWidth: 84,
          width: 84,
          cellRenderer: editRowRenderer,
        },
      ]
    }

    Object.keys(schema || {}).forEach((key, idx) => {
      result.push({
        headerCheckboxSelection: false,
        checkboxSelection: idx === 0 && allowEditing,
        headerComponent: TableHeader,
        headerComponentParams: {
          field: schema[key],
          editable: allowEditing,
        },
        headerName: key,
        field: key,
        sortable: true,
        cellRenderer: getRenderer(schema[key], true),
        cellRendererParams: {
          selectRelationship,
        },
        autoHeight: true,
        resizable: true,
        minWidth: 200,
      })
    })

    columnDefs = result
  }

  function selectRelationship(row, fieldName) {
    if (!row?.[fieldName]?.length) {
      return
    }
    $goto(
      `/${$params.application}/data/table/${row.tableId}/relationship/${row._id}/${fieldName}`
    )
  }

  const deleteRows = async () => {
    await api.post(`/api/${tableId}/rows`, {
      rows: selectedRows,
      type: "delete",
    })
    data = data.filter(row => !selectedRows.includes(row))
    notifier.success(`Successfully deleted ${selectedRows.length} rows`)
    selectedRows = []
  }
</script>

<div>
  <div class="table-title">
    <h1>{title}</h1>
    {#if loading}
      <div transition:fade>
        <Spinner size="10" />
      </div>
    {/if}
  </div>
  <div class="popovers">
    <slot />
    {#if selectedRows.length > 0}
      <DeleteRowsButton {selectedRows} {deleteRows} />
    {/if}
  </div>
</div>
<div class="grid-wrapper">
  <AgGrid
    {theme}
    {options}
    {data}
    {columnDefs}
    {loading}
    on:select={({ detail }) => (selectedRows = detail)} />
</div>

<style>
  .table-title {
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .table-title h1 {
    font-size: var(--font-size-m);
    font-weight: 500;
    margin: 0;
  }
  .table-title > div {
    margin-left: var(--spacing-xs);
  }

  .popovers {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-l);
  }
  .popovers :global(button) {
    font-weight: 500;
    margin-top: var(--spacing-l);
  }
  .popovers :global(button svg) {
    margin-right: var(--spacing-xs);
  }

  .grid-wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .grid-wrapper :global(> *) {
    height: auto;
    flex: 1 1 auto;
  }

  :global(.ag-theme-alpine) {
    --ag-border-color: var(--grey-4);
    --ag-header-background-color: var(--grey-1);
    --ag-odd-row-background-color: var(--grey-1);
    --ag-row-border-color: var(--grey-3);
  }

  :global(.ag-menu) {
    border: var(--border-dark) !important;
  }

  :global(.ag-popup-child) {
    border-radius: var(--border-radius-m) !important;
    box-shadow: none !important;
  }

  :global(.ag-header-cell-text) {
    font-family: var(--font-sans);
    font-weight: 600;
    color: var(--ink);
  }

  tbody tr:hover {
    background: var(--grey-1);
  }

  :global(.ag-filter) {
    padding: var(--spacing-s);
    outline: none;
    box-sizing: border-box;
    color: var(--ink);
    border-radius: var(--border-radius-m);
    background: #fff;
    font-family: var(--font-sans) !important;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }

  :global(.ag-menu) {
    border: none;
  }

  :global(.ag-simple-filter-body-wrapper > *) {
    margin-bottom: var(--spacing-m) !important;
  }

  :global(.ag-select) {
    height: inherit !important;
  }

  :global(.ag-menu input) {
    color: var(--ink) !important;
    font-size: var(--font-size-xs);
    border-radius: var(--border-radius-s) !important;
    border: none;
    background-color: var(--grey-2) !important;
    padding: var(--spacing-m);
    margin: 0;
    outline: none;
    font-family: var(--font-sans);
    border: var(--border-transparent) !important;
    transition: 0.2s all;
  }
  :global(.ag-menu input:focus) {
    border: var(--border-blue) !important;
  }

  :global(.ag-picker-field-display) {
    color: var(--ink) !important;
    font-size: var(--font-size-xs) !important;
    border-radius: var(--border-radius-s) !important;
    background-color: var(--grey-2) !important;
    font-family: var(--font-sans);
    border: var(--border-transparent) !important;
  }

  :global(.ag-picker-field-wrapper) {
    background: var(--grey-2) !important;
    border: var(--border-transparent) !important;
    padding-top: var(--spacing-xs);
    padding-bottom: var(--spacing-xs);
  }
</style>
