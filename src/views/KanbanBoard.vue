<template>I am Board</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "KanbanBoard",
  props: {
    data: {
      type: String,
      required: false,
    }
  },
  setup(props) {
    return props;
  },
});
</script>
