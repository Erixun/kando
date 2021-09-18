<template>
  <main>
    <section class="drawer" id="left">
      <fa-icon icon="inbox" />
      <base-column :id="backlog">
        <drawer-button drawerId="left" />
      </base-column>
    </section>

    <section class="mid-section">
      <base-column :id="upnext" />
      <base-column :id="doing" />
      <!-- <footer class="mist"></footer> -->
    </section>

    <section class="drawer" id="right">
      <fa-icon icon="check" />
      <base-column :id="done">
        <drawer-button drawerId="right" />
      </base-column>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BaseColumn from "@/components/BaseColumn.vue";
import { container } from "tsyringe";
import TaskManager from "@/store/TaskManager";
import { ColKey } from "@/store/constant/ColKey";
import DrawerButton from "@/components/DrawerButton.vue";

export default defineComponent({
  name: "TheKanbanBoard",
  components: { BaseColumn, DrawerButton },
  async created() {
    container.resolve(TaskManager).setup();
  },
  setup() {
    onMounted(() => {
      const handleDrawers = () => {
        const drawerElements = document.getElementsByClassName("drawer");
        if (window.innerWidth < 580) {
          Array.from(drawerElements).forEach((d) => {
            const classList = d.classList;
            // close drawerElements
            if (!classList.contains("closed")) {
              classList.toggle("closed");
            }
            // prevent hover effect
            if (!classList.contains("no-hover")) {
              classList.toggle("no-hover");
            }
          });
        } else {
          const drawers = Array.from(drawerElements);
          // allow hover effect
          drawers.forEach((d) => {
            d.classList.remove("no-hover");
          });
          // unhide hidden drawerElement
          const hidden = drawers.find((d) => d.classList.contains("hidden"));
          hidden?.classList.remove("hidden");
        }
      };
      handleDrawers();
      window.onresize = handleDrawers;
    });

    return {
      backlog: ColKey.Backlog,
      upnext: ColKey.UpNext,
      doing: ColKey.Doing,
      done: ColKey.Done,
    };
  },
});
</script>

<style lang="scss">
$kando-space-above: var(--kando-space-above);
$kando-grey: #d8d8d8;
$kando-lightgrey: #f7f7f7;
$kando-boxshadow-fade: 0px 0px 7px 8px;

// general styling
main {
  display: flex;
  max-width: 1400px;
  overflow: hidden;
  flex: min-content;
  align-self: center;
  justify-content: center;
  width: 100vw;

  header {
    display: flex;
    position: relative;
    white-space: nowrap;
  }

  .placeholder {
    border-radius: 2px;
    opacity: 0.5;
    border-width: 2px 0;
    border-style: solid;
    transition-duration: 100ms;
  }

  .hidden {
    display: none;
    width: 0;
    transition-duration: 200ms;
  }

  // drawer styling
  .drawer {
    box-shadow: var(--kando-boxshadow10);
    background-color: $kando-grey;
    padding: 0 5px;
    border: var(--kando-defaultborder);
    border-top: 0;
  }

  .drawer:not(.hidden),
  .drawer.closed:not(.no-hover):hover {
    position: relative;
    transition: 300ms;
    width: 20%;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .fa-inbox,
    .fa-check {
      height: 11vh;
      align-self: center;
      padding-top: 2vh;
    }

    .column {
      margin-top: unset;
      flex-grow: 1;
    }
  }

  .drawer-btn {
    margin-left: auto;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: -2px;
    transition: 100ms;
    border: none;
    padding: 5px;
    border-radius: 5px;
    background: inherit;
    font-size: 1.3rem;
  }

  .drawer-btn > svg {
    transform: rotateZ(45deg);
    margin: 0 3px;
  }

  .column {
    min-width: 220px;
    width: 40%;
  }
}

.drawer.closed:not(:hover),
.drawer.closed.no-hover {
  min-width: 35px;
  width: 35px;
  transition: 300ms;

  header > .add-space {
    opacity: 0;
    width: 0;
    min-width: 0;
    transition: var(--kando-instant-transition);
    .add-btn {
      display: none;
    }
  }
}

.drawer.closed {
  .fa-compress-alt {
    display: none;
  }
  .fa-expand-alt {
    display: flex;
  }
}
.drawer:not(.closed) {
  .fa-compress-alt {
    display: flex;
  }
  .fa-expand-alt {
    display: none;
  }
}
.drawer.closed:not(:hover) > .column {
  overflow: hidden;

  input[type="text"] {
    color: transparent;
    width: 0;
    transition: var(--kando-instant-transition);
  }
}

.drawer > .column {
  min-width: 100%;
  width: 22vw;
  max-width: 100%;
  max-height: 100%;
}
.drawer > .column > header {
  background-color: $kando-grey;
  opacity: 1;
  transition: opacity 300ms linear;
  box-shadow: $kando-boxshadow-fade $kando-grey;
}
.drawer .placeholder {
  background-color: darkgray;
  border-color: $kando-grey;
}

// main columns styling
.mid-section {
  padding: $kando-space-above 30px 0;
  display: flex;
  column-gap: 8%;
  overflow: auto;
  width: 800px;
  background-color: white;
  box-shadow: var(--kando-boxshadow10);
  z-index: 2617;

  header {
    background-color: #fff;
    box-shadow: $kando-boxshadow-fade white;
  }
  .column:first-child {
    margin-left: auto;
  }
  .column:last-child {
    margin-right: auto;
  }
  .column .placeholder {
    background-color: #d3d3d3cc;
    border-color: white;
  }
}
@media (hover: hover) {
  .drawer-btn:hover {
    background-color: #e8e8e8;
  }
}
@media (max-width: 580px) {
  .drawer:not(.hidden) {
    min-width: 40vw;

    .column {
      opacity: 1;
      transition: opacity 200ms linear;
    }
  }

  .drawer.closed:not(:hover) .tasks,
  .drawer.closed.no-hover .tasks {
    opacity: 0;
    transition-duration: 200ms;
  }

  .mid-section {
    display: flex;
    flex-direction: column;
    padding: $kando-space-above 5px 0;

    .column {
      min-width: unset;
      width: 90%;
      margin: 0 auto;
      box-shadow: 0px 0px 6px 6px white;

      .tasks {
        padding-bottom: 5vh;
      }
    }
    .column:first-child {
      order: 1;
      flex: 1 0 50%;
    }
  }
}
</style>
