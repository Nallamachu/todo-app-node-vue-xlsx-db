<template>
  <v-dialog v-model="show" max-width="600px">
    <v-card>
      <v-card-title>Add Todo</v-card-title>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="save">
          <v-text-field v-model="form.title" label="Title" required dense />
          <v-text-field v-model="form.description" label="Description" dense />
          <v-text-field v-model="form.target_date" type="date" label="Target Date" dense />
          <v-alert v-if="error" type="error" dense class="mt-2">{{ error }}</v-alert>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" :loading="loading" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const show = ref(false)
const loading = ref(false)
const error = ref('')
const formRef = ref(null)
const form = ref({ title: '', description: '', target_date: '' })

const open = () => {
  error.value = ''
  form.value = { title: '', description: '', target_date: '' }
  show.value = true
}

const close = () => {
  show.value = false
}

const save = async () => {
  error.value = ''
  if (!form.value.title || !form.value.title.trim()) {
    error.value = 'Title is required'
    return
  }
  loading.value = true
  try {
    const res = await axios.post('/todos', form.value)
    // emit created todo
    emitSaved(res.data)
    close()
  } catch (err) {
    error.value = err?.response?.data?.error || err?.message || 'Failed to save'
  } finally {
    loading.value = false
  }
}

const emit = defineEmits(['saved'])
const emitSaved = (todo) => emit('saved', todo)

defineExpose({ open, close })
</script>

<style scoped>
.v-card-title { font-weight: 600; }
</style>
