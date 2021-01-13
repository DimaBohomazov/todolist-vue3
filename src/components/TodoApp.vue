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
        :id="`${dataID}ToggleAll`"
        v-model="toggleAllInput"
      />
      <label
        :for="`${dataID}ToggleAll`"
        v-if="todoList.length > 0"
        @click="switchStatusForAll()"
      >
        Mark all as complete
      </label>
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in filteredTodoList"
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
import {ref, watch, reactive, computed, nextTick, onMounted} from 'vue'
import {useRouter} from 'vue-router'
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
  setup(props) {
    const {currentRoute} = useRouter()
    // data()
    const todoList = reactive(getLocalStorage(props.dataID))
    const newTodoName = ref('')
    const toggleAllInput = ref(false)
    const currentURL = ref(currentRoute)

    // computed
     const uncompletedItemsCounter = computed(() =>
       todoList.filter((item) => !item.status).length
      )
     const filteredTodoList = computed(() => {
       const href = currentURL.value.href
      if(href === '/active') {
        return todoList.map(item => item.status ? {...item, hidden: true} : item)
      } else if (href === '/completed') {
        return todoList.map(item => !item.status ? {...item, hidden: true} : item)
      } else {
       return todoList
      }
    })
    
    // methods
    const addTodoItem = () => {
      const todoItem = new TodoCreator(newTodoName.value);
      todoList.push(todoItem)
    }
    const removeTodoItem = (index) => {
      todoList.splice(index, 1);
    }
    const removeCompleteItems = () => {
      for(let i = 0; i < todoList.length; i++) {
        if (todoList[i].status) {
          todoList.splice(i, 1);
          i--
        }
      }      
    }
    const editTodoItemByIndex = (index, property) => {
      todoList[index] = { ...todoList[index], ...property };
    }
    const switchStatusForAll = () => {
      todoList.forEach(item => item.status = !toggleAllInput.value);
      nextTick(() => (toggleAllInput.value = !toggleAllInput.value));
    }

    //watch
    watch(todoList, () => {
      setLocalStorage(props.dataID, todoList)
    })
    watch(newTodoName, (value) => {
      value && addTodoItem()
      newTodoName.value = ''
    })
    watch(uncompletedItemsCounter, (value) => {
      toggleAllInput.value = !value
    })

    // lifeCycles
    onMounted(() => {
       toggleAllInput.value = !uncompletedItemsCounter.value
      }
    )

    return { 
      todoList,
      newTodoName,
      toggleAllInput,
      currentURL,

      uncompletedItemsCounter,
      filteredTodoList,

      addTodoItem,
      removeTodoItem,
      removeCompleteItems,
      editTodoItemByIndex,
      switchStatusForAll
    }
  },
};
</script>
