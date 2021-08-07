<template>
  <header>
    <div id="header-logo">
      <h1>KanDo!</h1>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/board">Board</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeader",
});
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 10vw;
  padding-left: 0.5rem;

  h1 {
    font-style: italic;
  }
}
</style>
