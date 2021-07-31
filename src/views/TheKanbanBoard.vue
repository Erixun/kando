<template>
  <main>
    <base-column :title=ColumnTitle.A />
    <base-column :title=ColumnTitle.B />
    <base-column :title=ColumnTitle.C />
    <base-column :title=ColumnTitle.D />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseColumn from "@/components/BaseColumn.vue"
import { ColumnTitle } from "@/components/columnTitle"

export default defineComponent({
  name: "TheKanbanBoard",
  components: { BaseColumn },
  props: {
    data: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    return {props, ColumnTitle};
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
