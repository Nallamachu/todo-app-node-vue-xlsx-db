<template>
  <v-container class="auth-container">
        <v-card class="pa-6 elevation-8" justify-content="center">
          <div class="mb-4" color="primary">
            <h2 class="mb-0 title">Register Account</h2>
            <p class="muted" justify-content="center">Quick and easy registration</p>
          </div>

          <v-card-text>
            <v-form @submit.prevent="register">
              
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
                class="mt-2 mb-4"
                v-model="form.email"
                label="Email"
                required
                density="compact"
                hide-details
              />
              <v-alert v-if="form.email && !isEmailValid" type="warning" dense>
                Enter a valid email address.
              </v-alert>
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
              <v-text-field
                color="primary"
                class="mt-2 mb-4"
                v-model="confirm"
                label="Confirm Password"
                type="password"
                required
                density="compact"
                hide-details
              />

              <v-alert v-if="confirm && !passwordMatched" type="warning" dense>
                Passwords do not match exactly.
              </v-alert>
              <v-alert v-else-if="confirm && passwordMatched" type="success" dense>
                Passwords match.
              </v-alert>
              <v-card-actions class="justify-space-between">
                <v-btn to="/login" class="primary-btn" variant="elevated" color="secondary">Back to Login</v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  class="primary-btn"
                  :disabled="!form.username.trim() || !form.password.trim() || !passwordMatched"
                >
                  Register
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
import { ref, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ username: '', password: '', email: '' })
const confirm = ref('')
const passwordMatched = ref(false)
const errorMsg = ref('')
const showError = ref(false)
let errorTimer = null

// expose email validation to template
const isEmailValid = emailValid

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailValid = computed(() => emailRegex.test(form.value.email || ''))


const clearError = () => {
  showError.value = false
  errorMsg.value = ''
  if (errorTimer) {
    clearTimeout(errorTimer)
    errorTimer = null
  }
}

const register = async () => {
  clearError()
  if (!emailValid.value) {
    errorMsg.value = 'Please enter a valid email address.'
    showError.value = true
    if (errorTimer) clearTimeout(errorTimer)
    errorTimer = setTimeout(() => clearError(), 3000)
    return
  }

  try {
    await authStore.register(form.value)
    router.push('/login')
  } catch (err) {
    const serverMsg = err?.response?.data?.message || err?.message || 'Registration failed'
    console.error('Registration failed:', serverMsg)
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

watch([confirm, () => form.value.password], ([newConfirm, newPassword]) => {
  // set passwordMatched true only when both fields are non-empty and exactly equal
  passwordMatched.value = newConfirm === newPassword
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
