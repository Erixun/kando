<template>
  <article class="column" id="backlog">{{headerText}}</article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "BaseColumn",
  props: {
    // data: {
    //   type: Object,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    
    return {headerText: props.title}
  },
})
</script>
