<template>
<ul class="todo-list" @click="getThis">
  <TodoItem
    v-for="(todo, index) in todoList"
    :key="todo.id"
    :id="todo.id"
    :name="todo.name"
    :status="todo.status"
    :index=index

    :removeTodoItem="removeTodoItem"
    :editTodoItemByIndex="editTodoItemByIndex"
    />
</ul>  
</template>

<script>
import TodoItem from "../../components/TodoItem";
export default {
  name: "AllTodo",
  components: {
    TodoItem
  },
  props: {
    todoList: Array,
    removeTodoItem: Function,
    editTodoItemByIndex: Function,
  }
}
</script>