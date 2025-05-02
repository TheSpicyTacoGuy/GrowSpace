<template>
  <div
    class="container-fluid border border-2 rounded-3 shadow-sm p-4"
    id="to-do-list"
  >
    <h2>To-Do List</h2>
    <div class="mb-3">
      <input
        v-model="newTask"
        type="text"
        class="form-control"
        placeholder="Add a new task"
      />
      <button class="btn btn-primary mt-2" @click="addTask">Add</button>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(task, index) in tasks" :key="index">
        <span :class="{ 'text-decoration-line-through': task.completed }">
          {{ task.text }}
          <span v-if="task.priority === 'High'" class="badge bg-danger ms-2">
            High Priority
          </span>
          <span v-else class="badge bg-info ms-2"> Low Priority </span>
        </span>
        <button
          class="btn btn-danger btn-sm float-end ms-2"
          @click="removeTask(index)"
        >
          Delete
        </button>
        <button
          class="btn btn-secondary btn-sm float-end"
          @click="togglePriority(index)"
        >
          {{
            task.priority === "High"
              ? "Mark as Low Priority"
              : "Mark as High Priority"
          }}
        </button>
      </li>
      <li v-if="tasks.length === 0" class="list-group-item">
        No tasks added yet.
      </li>
    </ul>
  </div>
</template>

<script>
import { showToast } from "../js/toast.js";

export default {
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  created() {
    this.loadTasks();
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.unshift({
          text: this.newTask,
          completed: false,
          priority: "Low",
        });
        this.newTask = "";
        this.saveTasks();
        showToast("Task added successfully!", "success");
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      showToast("Task removed successfully!", "info");
    },
    togglePriority(index) {
      const task = this.tasks[index];
      task.priority = task.priority === "High" ? "Low" : "High";
      this.saveTasks();
      showToast(
        `Task marked as ${task.priority} priority!`,
        task.priority === "High" ? "warning" : "info"
      );
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    loadTasks() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
  },
};
</script>
