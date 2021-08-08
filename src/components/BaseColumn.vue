<template>
  <article class="column">
    <header @click="addNewCard(columnId)">
      <h4>
        {{ headerText }}
      </h4>
      <div class="btn-wrapper">
        <button>+</button>
      </div>
    </header>
    <section class="tasks">
      <ul
        class="task-list"
        dropzone="true"
        :id="columnId"
        @drop.prevent="onDrop(columnId)"
        @dragover.prevent
        @dragenter.prevent="putPlaceHolder()"
      >
        <li
          v-for="(task, i) in columnTasks"
          :key="task.task_id"
          :id="task.task_id"
          :index="i"
          draggable="true"
          @dragstart="onDrag($event, task)"
          @dragenter="move(task.task_id)"
          @dragend="reset(task.task_id)"
        >
          <article class="task">
            <input
              type="text"
              :id="`input${task.task_id}`"
              v-model="task.name"
              placeholder="New task"
            />
          </article>
        </li>
      </ul>
    </section>
  </article>
</template>

<script lang="ts">
import ITask from "@/store/interface/ITask";
import TaskManager from "@/store/TaskManager";
import { container } from "tsyringe";
import { computed, defineComponent, onUpdated } from "vue";
import { ColumnTitle } from "./columnTitle";
import { taskStore } from "@/store/TaskStore";

export default defineComponent({
  name: "BaseColumn",
  props: {
    data: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const handleNewTask = () => {
      const newCardInput = document.getElementById(
        "inputnew"
      ) as HTMLInputElement;
      if (newCardInput) {
        const taskManager = container.resolve(TaskManager);
        if (newCardInput.value == "") {
          taskManager.deleteTask(props.id, "new");
        } else {
          const newCard = document.getElementById("new");
          const task = taskManager.find("new", props.id);

          if (newCard) {
            const newId = Math.random().toString().substr(2, 8);
            newCard.id = newId;
            if (task) task.task_id = newId;
          }
        }
      }
    };

    onUpdated(() => {
      const newInput = document.getElementById("inputnew");
      const newCard = document.getElementById("new");
      if (newCard) newCard.draggable = false;
      if (newInput) {
        newInput.addEventListener("focusout", () => handleNewTask());
        newInput.focus();
      }
    });

    const addNewCard = (columnId: string) => {
      const taskManager = container.resolve(TaskManager);
      taskManager.addTask(columnId);
    };

    const putPlaceHolder = (el?: HTMLElement, before = true) => {
      let placeHolder;
      if (!el)
        placeHolder = document.querySelector<HTMLElement>(".placeholder");
      else {
        removePlaceHolder();
        placeHolder = document.createElement("li");
      }

      if (placeHolder) {
        if (el) {
          placeHolder.style.height = `${el.offsetHeight - 8}px`;
          placeHolder.className = "placeholder";
          before
            ? el.parentElement?.insertBefore(placeHolder, el.nextSibling)
            : el.parentElement?.insertBefore(placeHolder, el);
        } else {
          const column = document.getElementById(props.id);
          const parent = placeHolder.parentElement;
          if (column && parent && parent.id != column.id)
            column.appendChild(placeHolder);
        }
      }
    };

    const getPosition = (placeHolder: HTMLElement) => {
      const nodes: HTMLElement[] = Array.prototype.slice.call(
        placeHolder.parentNode?.children
      );
      const filtered = nodes.filter((el) => el.className != "dragged");
      const position = filtered.indexOf(placeHolder);
      return position;
    };

    const removePlaceHolder = () => {
      const placeHolder = document.querySelector(".placeholder");
      if (placeHolder) placeHolder.remove();
    };

    const onDrag = (event: DragEvent, task: ITask) => {
      const el = document.getElementById(`${task.task_id}`);
      if (!el) return;

      el.classList.add("dragged");

      setTimeout(() => {
        putPlaceHolder(el);
        el.hidden = true;
      }, 0);

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
      }

      localStorage.setItem("taskID", task.task_id);
    };

    const reset = (id: string) => {
      removePlaceHolder();
      const el = document.getElementById(id) ?? false;
      if (el) el.hidden = false;
    };

    const onDrop = (columnId: string) => {
      const taskID = localStorage.getItem("taskID");
      if (!taskID) return;

      const taskManager = container.resolve(TaskManager);
      const task = taskManager.find(taskID);
      if (!task) return;

      const placeHolder = document.querySelector(".placeholder") as HTMLElement;
      const pos = getPosition(placeHolder);

      taskManager.moveTask(task, columnId, pos);

      const draggedElement = document.querySelector(".dragged");
      if (draggedElement) draggedElement.classList.remove("dragged");

      localStorage.removeItem("taskID");
    };

    const move = (id?: string) => {
      if (!id) {
        putPlaceHolder();
        return;
      }
      const el = document.getElementById(id);

      if (el) {
        const hasPreviousPlaceHolder =
          (el.previousSibling as HTMLElement).className == "placeholder";
        putPlaceHolder(el, hasPreviousPlaceHolder);
      }
    };

    return {
      headerText: computed(() => ColumnTitle[props.id]),
      columnTasks: computed(() => taskStore[props.id].tasks),
      columnId: props.id,
      addNewCard,
      putPlaceHolder,
      onDrag,
      move,
      onDrop,
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
}
header {
  position: relative;
  cursor: pointer;
}
header > h4 {
  font-weight: bold;
  margin: 0;
  padding: 5px;
}

header:hover button {
  opacity: unset;
}

.btn-wrapper {
  position: absolute;
  top: -2px;
  height: 100%;
  right: 6px;

  button {
    cursor: pointer;
    opacity: 0;
    border: none;
    background: transparent;
    color: #42b983;
    font-size: 1.5rem;
    font-weight: bold;
    transition-duration: 200ms;
  }
}

.tasks {
  padding: 10px 10px;
  flex: max-content;

  .task-list {
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-rows: min-content;

    .task {
      cursor: pointer;
      text-align: left;
      min-height: 1rem;
      padding: 5px;
      border-radius: 2px;
      box-shadow: 0 0 1px 1px lightgray;
      transition-duration: 100ms;

      input {
        cursor: pointer;
        border: none;
        font-size: 0.9rem;
        width: 100%;
      }
      input:focus {
        outline: none;
      }
    }
    .task:hover {
      box-shadow: 0 1px 2px 2px lightgray;
    }
  }
  .hide {
    display: none;
  }
  .task-list li {
    transition-duration: 100ms;
    padding: 4px 0;
  }
}
</style>
<style lang="scss">
.placeholder {
  border-radius: 2px;
  background-color: #d3d3d3cc;
  opacity: 0.5;
  border-width: 2px 0;
  border-style: solid;
  border-color: white;
  transition-duration: 100ms;
}
</style>
