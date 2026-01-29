<template>
  <v-container class="dashboard-container">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4 elevation-6">
          <v-toolbar flat>
            <v-toolbar-title>My Todos</v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="newTodo.title"
              placeholder="Add new todo"
              dense
              clearable
              hide-details
              style="max-width:420px"
            >
              <template #append>
                <v-btn icon color="primary" @click="addTodo"><v-icon>mdi-plus</v-icon></v-btn>
              </template>
            </v-text-field>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="todos"
            class="elevation-1 mt-4"
            :loading="loading"
            item-key="id"
          >
            <template v-slot:item.completed="{ item }">
              <v-chip :color="item.completed ? 'green' : 'grey'" small>
                {{ item.completed ? 'Done' : 'Pending' }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon @click="toggleComplete(item)">
                <v-icon :color="item.completed ? 'green' : 'grey'">{{ item.completed ? 'mdi-check' : 'mdi-checkbox-blank-outline' }}</v-icon>
              </v-btn>
              <v-btn icon @click="deleteTodo(item.id)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const todos = ref([])
const loading = ref(true)
const newTodo = ref({ title: '', description: '' })

const headers = [
  { text: 'Title', value: 'title' },
  { text: 'Description', value: 'description' },
  { text: 'Status', value: 'completed' },
  { text: 'Actions', value: 'actions', sortable: false }
]

onMounted(async () => {
  await loadTodos()
})

const loadTodos = async () => {
  try {
    const response = await axios.get('/todos')
    todos.value = response.data
  } catch (error) {
    console.error('Failed to load todos')
  } finally {
    loading.value = false
  }
}

const addTodo = async () => {
  if (!newTodo.value.title.trim()) return
  
  try {
    const response = await axios.post('/todos', newTodo.value)
    todos.value.push(response.data)
    newTodo.value.title = ''
    newTodo.value.description = ''
  } catch (error) {
    console.error('Failed to add todo')
  }
}

const toggleComplete = async (item) => {
  try {
    const updatedTodo = await axios.put(`/todos/${item.id}`, {
      completed: !item.completed
    })
    const index = todos.value.findIndex(t => t.id === item.id)
    todos.value[index] = updatedTodo.data
  } catch (error) {
    console.error('Failed to update todo')
  }
}

const deleteTodo = async (id) => {
  try {
    await axios.delete(`/todos/${id}`)
    todos.value = todos.value.filter(t => t.id !== id)
  } catch (error) {
    console.error('Failed to delete todo')
  }
}
</script>
