<script>
  import { createEventDispatcher } from "svelte";

  // components
  import NHScroller from "../h-scroller/h-scroller.svelte";
  import Elephant from "../elephant.svelte";

  export let boards = [];
  export let active = undefined;

  const dispatch = createEventDispatcher();

  let data = {
    active: null,
    activeIndex: 0
  };

  $: if (boards.length && active) {
    boards.forEach((b, index) => {
      if (b.id == active) {
        data.activeIndex = index; // all
      }
    });
  }

  const methods = {
    asArray() {
      return;
    },
    setActive(id) {}
  };
</script>

<style lang="scss">

</style>

<NHScroller activeIndex={data.activeIndex} className="n-board-tabs">
  {#each boards as board}
    <button
      class="tab board-{board.id}
      {board.id == active ? 'active' : 'inactive'}"
      on:click={() => {
        dispatch('tabTap', board);
      }}>
      {#if board.label == 'All'}
        <Elephant size={18} />
      {:else}{board.label}{/if}
    </button>
  {/each}
  <button
    class="btn btn-clear btn-icon add-board zmdi zmdi-plus"
    on:click={() => {
      dispatch('create');
    }} />
  <slot />
  <slot name="right" />
</NHScroller>
