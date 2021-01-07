<template>
  <section class="todoapp" :data-id="dataID">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        @keypress.enter="addTodoItem"
        @blur="addTodoItem"
      />
    </header>
    <section class="main">
      <input :id="`${id}ToggleAll`" class="toggle-all" type="checkbox" />
      <label 
        :for="`${id}ToggleAll`"
        v-if="todoList.length > 0"
      >
        Mark all as complete
      </label>
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in todoList"
          :key="todo.id"
          :id="todo.id"
          :name="todo.name"
          :status="todo.status"
          :index=index

          :removeTodoItem="removeTodoItem"
         />
      </ul>
    </section>
    <footer class="footer" 
      v-if="todoList.length > 0" >
      <span class="todo-count">
        <strong>{{uncompletedItemsCounter}}</strong> 
        {{uncompletedItemsCounter === 1 ? 'item' : 'items'}} left
      </span>
      <ul class="filters">
        <li>
          <a href="#/" class="selected">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  name: "TodoApp",
  components: {
    TodoItem,
  },
  props: {
    dataID: String,
  },
  data() {
    return {
      id: this.dataID,
      todoList: [],
    };
  },
  methods: {
    ToDoCreator(name, status = false, id = Number(new Date())) {
      this.id = id;
      this.name = name;
      this.status = status;
    },
    addTodoItem(event) {
      const inputValue = event.target.value.trim();
      if (inputValue) {
        const todoItem = new this.ToDoCreator(inputValue);
        this.todoList.push(todoItem);
        event.target.value = "";
      }
    },
    removeTodoItem(index) {
      this.todoList.splice(index, 1)
      console.log('remove', index)
    },
  },
  computed: {
    uncompletedItemsCounter() {
      return this.todoList.filter(item => !item.status).length
    } 
  },
  watch: {
    todoList(value) {
      console.log('TL', value)
    },
    id() {
      console.log(this)
    }
  }
};
</script>
