<template>
  <main>
    <base-drawer id="left">
      <fa-icon icon="inbox" />
      <base-column :id="backlog" />
    </base-drawer>

    <section id="main-columns">
      <base-column :id="upnext" />
      <base-column :id="doing" />
    </section>

    <base-drawer id="right">
      <fa-icon icon="check" />
      <base-column :id="done" />
    </base-drawer>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BaseColumn from "@/components/BaseColumn.vue";
import BaseDrawer from "@/components/BaseDrawer.vue";
import { container } from "tsyringe";
import TaskManager from "@/store/TaskManager";
import { ColKey } from "@/store/constant/ColKey";

export default defineComponent({
  name: "TheKanbanBoard",
  components: { BaseColumn, BaseDrawer },
  async created() {
    container.resolve(TaskManager).setup();
  },
  setup() {
    onMounted(() => {
      const closeDrawers = () => {
        if (window.innerWidth < 580) {
          const drawers = document.getElementsByClassName("drawer");

          Array.from(drawers).forEach((d) => {
            if (!d.classList.contains("closed")) {
              d.classList.toggle("closed");
            }
          });
        }
      };
      window.onresize = closeDrawers;
      window.onload = closeDrawers;
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
    gap: 5px;
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
  .drawer:not(.hidden),
  .drawer.closed:hover {
    background-color: $kando-grey;
    border: 1px solid #80808040;
    padding: 0 5px;
    position: relative;
    transition: 1000ms;
    width: 20%;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .fa-inbox,
    .fa-check {
      height: 11vh;
      align-self: center;
      padding-top: 4vh;
    }

    .column {
      margin-top: unset;
    }
  }

  .drawer-btn {
    cursor: pointer;
    position: absolute;
    font-weight: bold;
    letter-spacing: -2px;
    top: $kando-space-above;
    right: 5px;
    transition: 100ms;
    border: none;
    padding: 5px;
    border-radius: 5px;
    background: inherit;
    font-size: 1.3rem;
  }
  .drawer-btn:hover {
    background-color: #e8e8e8;
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

.drawer.closed:not(:hover) {
  min-width: 35px;
  width: 35px;
  transition: 500ms;

  header {
    opacity: 0;
    transition: opacity 300ms linear;
  }
}

.drawer.closed {
  .fa-compress-alt {
    display: none;
  }
  .fa-expand-alt {
    display: unset;
  }
}
.drawer:not(.closed) {
  .fa-compress-alt {
    display: unset;
  }
  .fa-expand-alt {
    display: none;
  }
}
.drawer.closed:not(:hover) > .column {
  overflow: hidden;

  input[type="text"] {
    color: transparent;
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
#main-columns {
  padding: $kando-space-above 30px 0;
  display: flex;
  column-gap: 8%;
  overflow: auto;
  width: 800px;

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

@media (max-width: 580px) and (orientation: portrait) {
  .drawer:not(.hidden) {
    min-width: 40vw;

    .column {
      opacity: 1;
      transition: opacity 200ms linear;
    }
  }

  .drawer.closed:not(:hover) > .column {
    opacity: 0;
    transition-duration: 200ms;
  }

  #main-columns {
    display: grid;
    grid-auto-rows: max-content;
    padding: $kando-space-above 5px 0;

    .column:first-child {
      order: 1;
    }
    .column:first-child,
    .column:last-child {
      margin: 0 auto;

      .tasks {
        padding-bottom: 5vh;
      }
    }
  }
}
</style>
