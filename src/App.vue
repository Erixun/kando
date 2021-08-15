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
$kando-beige: beige;
$kando-green: #1d8a59;
:root {
  --kando-green: #{$kando-green};
  --kando-taskborder: 1px solid rgba(0,0,0,0.1);
}
$kando-lightblue: #cdf3ff;
$kando-orange: #fff17e;
$kando-defaultborder: 1px solid #80808057;
$kando-boxshadow05: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
  0 2px 8px rgba(0, 0, 0, 0.05);
$kando-boxshadow10: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.1),
  0 2px 8px rgba(0, 0, 0, 0.1);
$kando-boxshadow15: 0 1px 2px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.15),
  0 2px 8px rgba(0, 0, 0, 0.15);

body,
html {
  margin: 0;
}
/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
  box-shadow: $kando-boxshadow05;

  #nav {
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: var(--kando-green);
      }
    }
  }
}
#drawer {
  border-right: $kando-defaultborder;
  box-shadow: $kando-boxshadow10;
}

.task {
  box-shadow: $kando-boxshadow10;
  border: var(--kando-taskborder);

  input[type="text"],
  textarea {
    background: inherit;
  }
}
.task:hover {
  box-shadow: $kando-boxshadow15;
}
#backlog .task {
  background-color: #fff;
}
#upnext .task {
  background-color: $kando-lightblue;
}
#doing .task {
  background-color: $kando-orange;
}
#done .task {
  background-color: $kando-beige;
}
</style>
