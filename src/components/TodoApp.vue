<template>
  <section class="todoapp" v-bind:data-id="dataID">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <TodoList/>
      </section>
      <footer class="footer">
        <span class="todo-count"></span>
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
import TodoList from './TodoList.vue'
export default {
  name: 'TodoApp',
  components: {
    TodoList
  },
  props: {
    dataID: String
  },
  data() {
    return {
      id: 'firstTodo',
      todoList: []
    }
  }
}
console.log(this)
</script>
