<template>
  <section class="todoapp" :data-id="dataID">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        @change="addTodoItem"
        v-focus
      />
    </header>
    <section class="main">
      <input
        class="toggle-all"
        type="checkbox"
        :id="`${id}ToggleAll`"
        v-model="toggleAllInput"
      />
      <label
        :for="`${id}ToggleAll`"
        v-if="todoList.length > 0"
        @click="switchStatusForAll()"
      >
        Mark all as complete
      </label>
      <router-view
        :todoList="todoList"
        :removeTodoItem="removeTodoItem"
        :editTodoItemByIndex="editTodoItemByIndex"
      />
    </section>
    <footer class="footer" v-if="todoList.length > 0">
      <span class="todo-count">
        <strong>{{ uncompletedItemsCounter }}</strong>
        {{ uncompletedItemsCounter === 1 ? "item" : "items" }} left
      </span>
      <ul class="filters">
        <li>
          <router-link to="/" :class="{ selected: currentURL.path === '/' }">
            All
          </router-link>
        </li>
        <li>
          <router-link
            to="/active"
            :class="{ selected: currentURL.path === '/active' }"
          >
            Active
          </router-link>
        </li>
        <li>
          <router-link
            to="/completed"
            :class="{ selected: currentURL.path === '/completed' }"
          >
            Completed
          </router-link>
        </li>
      </ul>
      <button
        class="clear-completed"
        v-if="uncompletedItemsCounter !== todoList.length"
        @click="removeCompleteItems"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import TodoCreator from "../utils/TodoCreator";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
export default {
  name: "TodoApp",
  props: {
    dataID: String,
  },
  data() {
    return {
      id: this.dataID,
      todoList: getLocalStorage(this.dataID), // Array

      toggleAllInput: false,
      currentURL: this.$router.currentRoute,
    };
  },
  computed: {
    uncompletedItemsCounter() {
      return this.todoList.filter((item) => !item.status).length;
    },
  },
  mounted() {
    this.toggleAllInput = !this.uncompletedItemsCounter;
  },
  methods: {
    addTodoItem(event) {
      const inputValue = event.target.value.trim();
      if (inputValue) {
        const todoItem = new TodoCreator(inputValue);
        this.todoList.push(todoItem);
        event.target.value = "";
      }
    },
    removeTodoItem(index) {
      this.todoList.splice(index, 1);
    },
    removeCompleteItems() {
      this.todoList = this.todoList.filter((item) => !item.status);
    },
    editTodoItemByIndex(index, property) {
      this.todoList[index] = { ...this.todoList[index], ...property };
    },
    switchStatusForAll() {
      this.todoList.forEach((item) => (item.status = !this.toggleAllInput));
      this.$nextTick(() => (this.toggleAllInput = !this.toggleAllInput));
    },
  },
  watch: {
    todoList: {
      deep: true,
      handler(value) {
        setLocalStorage(this.id, value);
        this.toggleAllInput = !this.uncompletedItemsCounter;
      },
    },
  },
};
</script>
