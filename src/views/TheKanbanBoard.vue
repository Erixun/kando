<template>
  <main>
    <base-column :data="taskStore.backlog" id="backlog" />
    <base-column :data="taskStore.upnext" id="upnext" />
    <base-column :data="taskStore.doing" id="doing" />
    <base-column :data="taskStore.done" id="done" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseColumn from "@/components/BaseColumn.vue";
import taskStore from "@/store/TaskStore";
import { container } from "tsyringe";
import TaskManager from "@/store/TaskManager";

export default defineComponent({
  name: "TheKanbanBoard",
  components: { BaseColumn },
  props: {
    data: {
      type: String,
      required: false,
    },
  },
  async created() {
    container.resolve(TaskManager).clearStore().fetchTasks();
  },
  setup() {
    return { taskStore };
  },
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  min-height: 90vh;
  justify-content: flex-start;
  gap: 2vw;
  padding: 15px;
  overflow-x: scroll;

  .column {
    min-width: 240px;
    width: 22vw;
    max-width: 330px;
  }
}
</style>
