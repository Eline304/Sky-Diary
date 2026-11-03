<script setup lang="ts">
import { useTripStore } from '@/stores/tripStore'
import TripTimeline from '@/components/TripTimeline.vue'
import BaseButton from '@/components/Button.vue'

const tripStore = useTripStore()
</script>

<template>
  <main class="trips-page">
    <div class="add-trip-button">
      <BaseButton @click="$router.push('/trips/new')">
        Add trip
      </BaseButton>
    </div>

    <TripTimeline :trips="tripStore.trips" />
  </main>
</template>

<style scoped>
.trips-page {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.add-trip-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2em;
}
</style>