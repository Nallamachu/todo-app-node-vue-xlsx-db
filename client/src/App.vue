<template>
  <v-app>
    <v-app-bar app color="primary" dark elevated>
      <v-toolbar-title class="title">Excel Todo</v-toolbar-title>
      <v-spacer />
      <div v-if="isLoggedIn" class="mr-4 welcome">Welcome, {{ username }}</div>
      <v-btn v-if="isLoggedIn" @click="logout" variant="text" class="logout-btn">Logout</v-btn>
    </v-app-bar>

    <v-main class="main-bg">
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer padless>
      <v-col class="text-center" cols="12">Built with Vuetify • Simple XLS todo demo</v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const isLoggedIn = computed(() => !!authStore.token && !!authStore.user)
const username = computed(() => (authStore.user ? authStore.user.username : ''))

onMounted(() => {
  if (!authStore.token) {
    router.push('/login')
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
