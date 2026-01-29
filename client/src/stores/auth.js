import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(null)

  axios.defaults.baseURL = '/api'

  const setAuthHeader = () => {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }
  }

  const login = async (credentials) => {
    const response = await axios.post('/auth/login', credentials)
    token.value = response.data.token
    user.value = response.data.user
    localStorage.setItem('token', token.value)
    setAuthHeader()
  }

  const register = async (credentials) => {
    const response = await axios.post('/auth/register', credentials)
    token.value = response.data.token
    user.value = response.data.user
    localStorage.setItem('token', token.value)
    setAuthHeader()
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  setAuthHeader()

  return { token, user, login, register, logout }
})
