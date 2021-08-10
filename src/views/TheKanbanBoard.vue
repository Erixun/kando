<template>
  <main>
    <base-column :id="backlog" />
    <base-column :id="upnext" />
    <base-column :id="doing" />
    <base-column :id="done" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseColumn from "@/components/BaseColumn.vue";
import { container } from "tsyringe";
import TaskManager from "@/store/TaskManager";
import { ColKey } from "@/store/constant/ColKey";

export default defineComponent({
  name: "TheKanbanBoard",
  components: { BaseColumn },
  async created() {
    container.resolve(TaskManager).setup();
  },
  setup() {
    return {
      backlog: ColKey.Backlog,
      upnext: ColKey.UpNext,
      doing: ColKey.Doing,
      done: ColKey.Done,
    };
  },
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  min-height: 90vh;
  max-width: 1400px;
  gap: 2vw;
  padding: 15px;
  overflow: auto;

  .column {
    min-width: 240px;
    width: 22vw;
    max-width: 330px;
    margin: 0 auto;
  }
}
</style>
