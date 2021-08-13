<template>
  <the-header id="main-header" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader.vue";

export default defineComponent({
  components: { TheHeader },
});
</script>

<style lang="scss">
$kando-lightblue: #a7e9fda3;
$kando-defaultborder: 1px solid #8080803b;
$kando-boxshadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
  0 2px 8px rgba(0, 0, 0, 0.05);

body, html {
  margin: 0;
}
 /* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
} 

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#main-header {
  border-bottom: $kando-defaultborder;
  box-shadow: $kando-boxshadow;
}
#drawer {
  border-right: $kando-defaultborder;
  box-shadow: $kando-boxshadow;
}

#main-header {

  #nav {
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
