<template>
  <div
    class="modal fade"
    id="task-modal"
    aria-modal="true"
    tabindex="-1"
    aria-labelledby="task-label"
    role="dialog"
  >
    <div class="modal-dialog">
      <!-- modal-fullscreen-sm-down" -->
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="task-label">
            Edit Task: {{ task.name }}
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingTask"
              placeholder="Task name"
              v-model="task.name"
            />
            <label for="floatingTask">Task to do</label>
          </div>
          <div class="row g-2 mb-3">
            <div class="col-xs">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingAt"
                  placeholder="At time"
                  v-model="task.at"
                />
                <label for="floatingAt">At time</label>
              </div>
            </div>
            <div class="col-xs">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingUntil"
                  placeholder="Until"
                  v-model="task.until"
                />
                <label for="floatingUntil">Until</label>
              </div>
            </div>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingDate"
              placeholder="Date"
              v-model="task.do_date"
            />
            <label for="floatingDate">At date</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TaskModal",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const closeModal = () => {
      const modal = document.getElementById("task-modal");
      modal?.classList.remove("show");
      setTimeout(() => {
        modal!.style.display = "none";
      }, 100);
    };
    // const discardChanges = () => {}
    // const saveChanges = () => {}

    // const initialState = {}
    return {
      closeModal,
      task: computed(() => props.data),
    };
  },
});
</script>

<style lang="scss">
.modal-title {
  margin-top: 0;
}
.row > * {
  flex: 1 0 45%;
}
.form-floating {
  .form-control {
    box-sizing: border-box;
    height: 62px;
  }
  label {
    opacity: 0.65;
  }
}
</style>
