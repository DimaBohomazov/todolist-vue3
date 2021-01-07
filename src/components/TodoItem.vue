<template>
  <li :data-id='id'>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>{{name}}</label>
      <button 
        class="destroy"
        @click="removeTodoItem(index)"
      ></button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    id: Number,
    name: String,
    status: Boolean,
    index: Number,

    removeTodoItem: Function
  },
  methods: {
   
  }
}
</script>