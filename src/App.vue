<template>
  <TodoApp 
    dataID="firstTodo"
  />
</template>

<script>
import TodoApp from "./components/TodoApp.vue";
import './assets/styles/base.css'
import './assets/styles/index.css'
export default {
  name: "App",
  components: {
    TodoApp,
  },
};

</script>
