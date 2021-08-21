<template>
  <div :id="drawerId" @dragenter="onDragEnter()" class="drawer">
    <slot></slot>
    <button :id="drawerBtnId" class="drawer-btn" @click="toggleClosed()">
      <fa-icon :id="compressId" icon="compress-alt"></fa-icon>
      <fa-icon :id="expandId" icon="expand-alt" class="hide"></fa-icon>
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
        drawer?.firstElementChild?.classList.toggle("hide");
        document.getElementById(this.compressId)?.classList.toggle("hide");
        document.getElementById(this.expandId)?.classList.toggle("hide");
      }, 200);
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
