<template>
  <div :id="drawerId" @dragenter="onDragEnter()" class="drawer">
    <slot></slot>
    <button :id="drawerBtnId" class="drawer-btn" @click="toggleClosed()">
      <fa-icon :id="compressId" icon="compress-alt"></fa-icon>
      <fa-icon :id="expandId" icon="expand-alt"></fa-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "BaseDrawer",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleClosed() {
      const drawer = document.getElementById(this.drawerId);
      drawer
        ? drawer.classList.toggle("closed")
        : () => {
            throw Error("element with id drawer not found");
          };
      setTimeout(() => {
        drawer?.firstElementChild?.classList.toggle("hidden");
      }, 200);

    if(window.innerWidth < 580) { //hide other drawer when one is open
      const drawers = document.getElementsByClassName("drawer")
      if(!drawer?.classList.contains("closed")) {
        const closed = Array.from(drawers).find(d => d.classList.contains("closed"))
        closed?.classList.add("hidden");
      } else {
        const hidden = Array.from(drawers).find(d => d.classList.contains("hidden"))
        hidden?.classList.remove("hidden")
      }
    }

    },
    onDragEnter() {
      const drawer = document.getElementById(this.drawerId);

      if (drawer?.classList?.contains("closed")) {
        this.toggleClosed();
      }
    },
  },
  setup(props) {
    return {
      drawerId: computed(() => `drawer-${props.id}`),
      drawerBtnId: computed(() => `drawer-${props.id}-btn`),
      compressId: computed(() => `${props.id}-compress`),
      expandId: computed(() => `${props.id}-expand`),
    };
  },
});
</script>
