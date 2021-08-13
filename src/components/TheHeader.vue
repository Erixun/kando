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
  grid-template-columns: 1fr 4fr;
  grid-gap: 10vw;
  padding: 5px;

  h1 {
    font-style: italic;
    padding-left: 50px;
    margin: 0;
  }
  #nav {
    padding: 5px;
    justify-self: left;
    align-self: center;
  }
}
</style>
