<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'

const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          'Service worker geregistreerd:',
          registration.scope
        )
      })
      .catch((error) => {
        console.error(
          'Service worker registreren mislukt:',
          error
        )
      })
  }
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<template>
  <Header />

  <div v-if="!isOnline" class="offline-message" role="status">
    You are offline
  </div>

  <div v-else class="online-message" role="status">
    Online
  </div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.offline-message {
  color: #b91c1c;
  padding: 12px 32px;
  text-align: end;
  font-weight: 500;
}

.online-message {
  color: #166534;
  padding: 8px 32px;
  text-align: end;
  font-size: 14px;
}
</style>
