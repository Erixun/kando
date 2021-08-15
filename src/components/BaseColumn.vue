<template>
  <article class="column">
    <header @click="addNewCard(columnId)">
      <h4>
        {{ headerText }}
      </h4>
      <div class="btn-wrapper">
        <button class="add-btn">+</button>
      </div>
    </header>
    <section
      class="tasks"
      dropzone="true"
      @drop.prevent="onDrop(columnId)"
      @dragover.prevent
      @dragenter.prevent="putPlaceHolder()"
    >
      <ul :id="columnId" class="task-list">
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
import ColString from "@/store/types/ColString";
import { ColKey, ColumnTitle } from "@/store/constant";

export default defineComponent({
  name: "BaseColumn",
  props: {
    id: {
      type: String,
      required: true,
      validator: (value: string) => {
        switch (value) {
          case ColKey.Backlog:
          case ColKey.UpNext:
          case ColKey.Doing:
          case ColKey.Done:
            return true;
          default:
            return false;
        }
      },
    },
  },
  setup(props) {
    const taskManager = container.resolve(TaskManager);

    const handleNewTask = () => {
      const newCardInput = document.getElementById(
        "inputnew"
      ) as HTMLInputElement;

      if (newCardInput) {
        newCardInput.removeEventListener("focusout", focusOutEvtListener);
        const columnId = props.id;

        if (newCardInput.value == String()) {
          taskManager.deleteTask(columnId, "new");
        } else {
          const newCard = document.getElementById("new");
          const task = taskManager.find("new", columnId as ColString);
          taskManager.deleteTask(columnId, "new");

          if (newCard && task) {
            const newId = taskManager.nextId();
            newCard.id = newId;
            task.task_id = newId;
            taskManager.persist(task);
          }
        }
      }
    };

    const focusOutEvtListener = () => handleNewTask();

    onUpdated(() => {
      const newInput = document.getElementById("inputnew");
      const newCard = document.getElementById("new");
      if (newCard) newCard.draggable = false;
      if (newInput) {
        newInput.addEventListener("focusout", focusOutEvtListener);
        newInput.focus();
      }
      //get the order (id's) of tasks in this column
      const orderedIds = Array.prototype.slice
        .call(document.getElementById(props.id)?.children)
        .map((el) => el.id)
        .filter((id) => !["", "new"].includes(id)); //filter out the placeholder & empty task

      taskManager.updateOrder(props.id as ColString, orderedIds);
    });

    const addNewCard = (columnId: string) => {
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
      headerText: ColumnTitle[props.id],
      columnTasks: computed(
        //() => taskManager.distributeTasks(props.id as ColString)
        // () => Array.from(taskManager.taskStore[All].tasks.values()).filter(task => task.column == props.id)
        () => taskManager.taskStore[props.id as ColString].tasks
      ),
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
  overflow: auto;
}
header {
  position: relative;
  cursor: pointer;
  position: sticky;
  top: 0;
}
header > h4 {
  text-align: left;
  font-weight: bold;
  margin: 0;
  padding: 5px;
  margin-left: 2px;
  overflow: hidden;
}

header:hover .add-btn {
  opacity: unset;
}

.add-btn {
  cursor: pointer;
  opacity: 0;
  border: none;
  background: transparent;
  color: var(--kando-green);
  font-size: 1.5rem;
  font-weight: bold;
  transition-duration: 200ms;
  position: absolute;
  top: -4px;
}

.tasks {
  flex: max-content;

  .task-list {
    list-style: none;
    margin: 0;
    padding: 5px;
    display: grid;
    grid-auto-rows: min-content;

    .task {
      cursor: pointer;
      text-align: left;
      min-height: 1rem;
      padding: 5px;
      border-radius: 2px;

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
