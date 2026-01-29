<template>
  <v-container class="auth-container">
        <v-card class="pa-6 elevation-8" justify-content="center">
          <div class="mb-4" color="primary">
            <h2 class="mb-0 title">Excel Todo</h2>
            <p class="muted" justify-content="center">Manage tasks and export to Excel</p>
          </div>

          <v-card-text>
            <v-form @submit.prevent="login">
              
              <v-text-field
                color="primary"
                class="mt-2 mb-4"
                v-model="form.username"
                label="Username"
                required
                density="compact"
                hide-details
              />
              <v-text-field
                color="primary"
                class="mt-2"
                v-model="form.password"
                label="Password"
                type="password"
                required
                density="compact"
                hide-details
              />
              <v-card-actions class="justify-space-between">
                <v-btn to="/register"  class="primary-btn" variant="elevated" color="secondary">Create Account</v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  class="primary-btn"
                  :disabled="!form.username.trim() || !form.password.trim()"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-form>

            <v-alert v-model="showError" type="error" dense class="mb-4" dismissible>
              {{ errorMsg }}
            </v-alert>

          </v-card-text>
        </v-card>
  </v-container>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ username: '', password: '' })
const errorMsg = ref('')
const showError = ref(false)
let errorTimer = null

const clearError = () => {
  showError.value = false
  errorMsg.value = ''
  if (errorTimer) {
    clearTimeout(errorTimer)
    errorTimer = null
  }
}

const login = async () => {
  clearError()
  try {
    await authStore.login(form.value)
    router.push('/dashboard')
  } catch (err) {
    const serverMsg = err?.response?.data?.message || err?.message || 'Login failed'
    console.error('Login failed:', serverMsg)
    errorMsg.value = serverMsg
    showError.value = true
    if (errorTimer) clearTimeout(errorTimer)
    errorTimer = setTimeout(() => {
      clearError()
    }, 5000)
  }
}

watch(showError, (val) => {
  if (!val) {
    if (errorTimer) {
      clearTimeout(errorTimer)
      errorTimer = null
    }
    errorMsg.value = ''
  }
})

onUnmounted(() => {
  if (errorTimer) clearTimeout(errorTimer)
})
</script>

<style scoped>
.primary-btn {
  color: #fff !important;
}
.primary-btn:hover {
  color: #fff !important;
}
</style>
