<template>
  <section class="todoapp" :data-id="dataID">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        v-model.trim.lazy="newTodoName"
        v-autofocus
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
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in displayedTodoList"
          :key="todo.id"
          :id="todo.id"
          :name="todo.name"
          :status="todo.status"
          :index=index
          :hidden="todo.hidden"
          
          @remove-item="removeTodoItem"
          @edit-item="editTodoItemByIndex"
        />
      </ul>  
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
import TodoItem from "./TodoItem";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
export default {
  name: "TodoApp",
   components: {
    TodoItem
  },
  props: {
    dataID: String,
  },
  data() {
    return {
      id: this.dataID,
      todoList: [], // Array

      newTodoName: '',
      displayedTodoList: [],
      toggleAllInput: false,
      currentURL: this.$router.currentRoute,
    };
  },
  computed: {
    uncompletedItemsCounter() {
      return this.todoList.filter((item) => !item.status).length;
    },
    filteredTodoList() {
      if(this.currentURL.href === '/active') {
        return this.todoList.map(item => item.status ? {...item, hidden: true} : item)
      } else if (this.currentURL.href === '/completed') {
        return this.todoList.map(item => !item.status ? {...item, hidden: true} : item)
      } else {
       return this.todoList
      }
    }
  },
  created() {
    this.todoList = getLocalStorage(this.dataID)
  },
  mounted() {
    this.toggleAllInput = !this.uncompletedItemsCounter
    this.displayedTodoList = this.filteredTodoList
  },
  methods: {
    addTodoItem() {
      const todoItem = new TodoCreator(this.newTodoName);
      this.todoList.push(todoItem);
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
        this.displayedTodoList = this.filteredTodoList
      }
    },
    newTodoName(name) {
      name && this.addTodoItem()
      this.newTodoName = ''
    },
    currentURL() {
      this.displayedTodoList = this.filteredTodoList
    }
  },
};
</script>
