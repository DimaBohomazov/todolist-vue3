<template >
  <li v-if="!hidden"
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
        @click="toggleStatus"
      />
      <label
        @dblclick="setEditable(true)"
      >
        {{name}}
      </label>
      <button 
        class="destroy"
        @click="removeItem"
      ></button>
    </div>
    <input
      v-if="editable"
      class="edit"
      @keypress.enter="editTodoHandler"
      @keydown.esc="consoleChanges"
      @blur="editTodoHandler"
      v-model.trim="internalName"
      v-autofocus
    />
  </li>
</template>

<script>

import {ref, toRefs} from 'vue'
export default {
  name: 'TodoItem',
  props: {
    id: Number,
    name: String,
    status: Boolean,
    index: Number,
    hidden: Boolean
  },
  setup(props, {emit}) {
    // props
    const { name, status, index } = toRefs(props)

    // data()
    const internalName = ref(name.value)
    const editable = ref(false)

    // methods
    const setEditable = (value) => {
      editable.value = value
    }
    const consoleChanges = () => {
      setEditable(false)
      internalName.value = name.value
    }
    const editTodoHandler = () => {
      if (editable.value){
        setEditable(false)
        if(internalName.value) {
          emit('edit-item', index.value, {name: internalName.value})
        } else {
          removeItem()
        }
      }
    }
    const removeItem = () => {
     emit('remove-item', index.value)
   }
   const toggleStatus = () => {
     emit('edit-item', index.value, {status: !status.value})
   }

   return {
    editable,
    internalName,
    setEditable,
    consoleChanges, 
    editTodoHandler,
    removeItem,
    toggleStatus
   }
  }
}
</script>