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
      @keypress.enter="setEditable(false)"
      @blur="setEditable(false)"
      v-model.trim="internalName"
      v-autofocus
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
    hidden: Boolean
  },
  data() {
    return {
      internalName: this.name,
      editable: false
    }
  },
  methods: {
   setEditable(value) {
     this.editable = value
   },
   editTodoHandler() {
     if(this.internalName) {
       this.$emit('edit-item', this.index, {name: this.internalName})
     } else {
       this.removeItem()
     }
   },
   toggleStatus() {
     this.$emit('edit-item', this.index, {status: !this.status})
   },
   removeItem() {
     this.$emit('remove-item', this.index)
   }
  },
  watch: {
    editable(value) {
      if(!value) {
        this.editTodoHandler()
      }
    }
  }
}
</script>