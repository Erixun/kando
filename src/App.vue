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
:root {
  --kando-green: #188755;
  --kando-beige: beige;
  --kando-taskborder: 1px solid rgba(0, 0, 0, 0.1);
  --kando-lightblue: #cdf3ff;
  --kando-orange: #fff17e;
  --kando-space-above: 15vh;
  --kando-defaultborder: 1px solid #80808057;
  --kando-boxshadow05: 0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 4px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.05);
  --kando-boxshadow10: 0 1px 2px rgba(0, 0, 0, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1);
  --kando-boxshadow15: 0 1px 2px rgba(0, 0, 0, 0.15),
    0 1px 4px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.15);
}

body,
html {
  margin: 0;
  height: 100vh;
  display: flex;
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
  background-color: #c4c4c4;
  display: flex;
  flex-direction: column;
}

#main-header {
  border-bottom: var(--kando-defaultborder);
  box-shadow: var(--kando-boxshadow05);
  background-color: white;
  z-index: 1123;

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
  border-right: var(--kando-defaultborder);
  box-shadow: var(--kando-boxshadow10);
}

.task {
  box-shadow: var(--kando-boxshadow10);
  border: var(--kando-taskborder);

  input[type="text"],
  textarea {
    font-family: "Inter";
    background: inherit;
  }
}
.task:hover {
  box-shadow: var(--kando-boxshadow15);
}
#backlog .task {
  background-color: #fff;
}
#upnext .task {
  background-color: var(--kando-lightblue);
}
#doing .task {
  background-color: var(--kando-orange);
}
#done .task {
  background-color: var(--kando-beige);
}
</style>
