<template>
  <ul class="todo-list">
    <TodoItem />
  </ul>
</template>

<script>
import TodoItem from './TodoItem.vue'
export default {
  name: 'TodoList',
  components: {
    TodoItem
 }   
}
</script>