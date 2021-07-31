<template>
  <main>
    <article class="column" id="backlog">Backlog</article>
    <article class="column" id="upnext">Up Next</article>
    <article class="column" id="doing">Doing</article>
    <article class="column" id="done">Done</article>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheKanbanBoard",
  props: {
    data: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    return props;
  },
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  min-height: 90vh;
  justify-content: start;
  gap: 2vw;
  padding: 15px;
  overflow-x: scroll;

  .column {
    border: 1px solid gray;
    min-width: 240px;
    width: 22vw;
    max-width: 330px;
  }
}
</style>
