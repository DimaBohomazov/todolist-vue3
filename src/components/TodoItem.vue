<template>
  <li
    :class="{
      'completed': status,
      'editing': editable
    }" 
    :data-id='id'>
    <div class="view">
      <input 
        class="toggle" 
        type="checkbox"
        :checked="status"
        @click="editTodoItemByIndex(index, {status: !status})"
      />
      <label
        @dblclick="setEditable"
      >
        {{name}}
      </label>
      <button 
        class="destroy"
        @click="removeTodoItem(index)"
      ></button>
    </div>
    <input
      v-if="editable"
      class="edit"
      :value="name"
      @keypress.enter="editTodoHandler"
      @blur="editTodoHandler"
      v-focus
    />
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

    removeTodoItem: Function,
    editTodoItemByIndex: Function,
  },
  data() {
    return {
      editable: false
    }
  },
  methods: {
   setEditable() {
     this.editable = true
   },
   editTodoHandler(event) {
     const inputValue = event.target.value.trim()
     if (inputValue) {
       this.editable = false
       this.editTodoItemByIndex(this.index, {name: inputValue})
     } else {
       this.removeTodoItem(this.index)
     }
   }
  }
}
</script>