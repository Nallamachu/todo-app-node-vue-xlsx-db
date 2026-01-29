<template>
  <v-app>
    <v-app-bar app color="primary" dark elevated>
      <v-toolbar-title class="title">Excel Todo</v-toolbar-title>
      <v-spacer />
      <div v-if="user" class="mr-4 welcome">Welcome, {{ user.username }}</div>
      <v-btn v-if="user" @click="logout" variant="text" class="logout-btn">Logout</v-btn>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const user = ref(null)

onMounted(() => {
  if (!authStore.token) {
    router.push('/login')
  } else {
    user.value = authStore.user
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
