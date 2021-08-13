<template>
  <main>
    <div id="drawer">
      <base-column :id="backlog" />
      <button id="drawer-btn" @click="toggleClosed()"><span>|-></span></button>
    </div>
    <section id="main-columns">
      <base-column :id="upnext" />
      <base-column :id="doing" />
      <base-column :id="done" />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseColumn from "@/components/BaseColumn.vue";
import { container } from "tsyringe";
import TaskManager from "@/store/TaskManager";
import { ColKey } from "@/store/constant/ColKey";

export default defineComponent({
  name: "TheKanbanBoard",
  components: { BaseColumn },
  async created() {
    container.resolve(TaskManager).setup();
  },
  methods: {
    toggleClosed() {
      const drawer = document.getElementById("drawer");
      drawer
        ? drawer.classList.toggle("closed")
        : () => {
            throw Error("element with id drawer not found");
          };
      setTimeout(() => {
        drawer?.firstElementChild?.classList.toggle("hide");
      }, 200);
    },
  },
  setup() {
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
$kando-space-above: 5vh;
$kando-grey: #d8d8d8;
$kando-lightgrey: #f7f7f7;
$kando-boxshadow-fade: 0px 0px 7px 8px;

main {
  display: flex;
  max-width: 1400px;
  overflow: hidden;
  flex: min-content;

  header {
    display: flex;
    gap: 5px;
  }

  #drawer,
  #drawer.closed:hover {
    background-color: $kando-grey;
    padding: $kando-space-above 5px 0 5px;
    position: relative;
    transition: 1000ms;
    width: 20%;
    min-width: 160px;
    display: flex;
    overflow: auto;

    .column {
      margin-top: unset;
    }
  }
  #drawer-btn {
    cursor: pointer;
    position: absolute;
    font-weight: bold;
    letter-spacing: -2px;
    top: $kando-space-above;
    margin-top: 2px;
    right: 5px;
    transition: 100ms;
    border: none;
    padding: 4px 9px;
    border-radius: 5px;
    transform: rotateY(180deg);
    background: inherit;
  }
  #drawer-btn:hover {
    background-color: #e8e8e8;
  }

  .column {
    min-width: 220px;
    width: 22vw;
    max-width: 300px;
  }
}

#drawer.closed:not(:hover) {
  min-width: 35px;
  width: 35px;
  transition: 200ms;

  #drawer-btn {
    transform: unset;
  }
}
#drawer.closed > #drawer-btn {
  transform: unset;
}
#drawer.closed:not(:hover) > .column.hide {
  display: none;
}

#drawer > .column {
  min-width: 100%;
  width: 22vw;
  max-width: 100%;
  max-height: 100%;
}
#drawer > .column > header {
  background-color: $kando-grey;
}

#main-columns {
  padding: $kando-space-above 50px 0 15px;
  display: flex;
  gap: 1.5vw;
  overflow: auto;
  margin: 0 auto;
  
  header {
    background-color: #fff;
    box-shadow: $kando-boxshadow-fade white;
  }
}

#drawer header {
  box-shadow: $kando-boxshadow-fade $kando-grey;
}

.placeholder {
  border-radius: 2px;
  background-color: #d3d3d3cc;
  opacity: 0.5;
  border-width: 2px 0;
  border-style: solid;
  border-color: white;
  transition-duration: 100ms;
}
#drawer .placeholder {
  background-color: darkgray;
  border-color: $kando-grey;
}
</style>
