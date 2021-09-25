<template>
  <button :id="drawerBtnId" class="drawer-btn" v-touch:release="toggleClosed" aria-label="drawer-button">
    <fa-icon :id="compressId" icon="compress-alt"></fa-icon>
    <fa-icon :id="expandId" icon="expand-alt"></fa-icon>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "DrawerButton",
  props: {
    drawerId: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleClosed() {
      const drawer = document.getElementById(this.targetId);
      drawer
        ? drawer.classList.toggle("closed")
        : () => {
            throw Error("element with id drawer not found");
          };

      if (window.innerWidth < 580) {
        //hide other drawer when one is open
        const drawers = document.getElementsByClassName("drawer");
        if (!drawer?.classList.contains("closed")) {
          const closed = Array.from(drawers).find((d) =>
            d.classList.contains("closed")
          );
          closed?.classList.add("hidden");
        } else {
          const hidden = Array.from(drawers).find((d) =>
            d.classList.contains("hidden")
          );
          hidden?.classList.remove("hidden");
        }
      }
    },
  },
  setup(props) {
    return {
      targetId: props.drawerId,
      drawerBtnId: computed(() => `${props.drawerId}-drawer-btn`),
      compressId: computed(() => `${props.drawerId}-compress`),
      expandId: computed(() => `${props.drawerId}-expand`),
    };
  },
});
</script>
