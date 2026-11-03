<script setup lang="ts">
import TripCard from './TripCard.vue'
import type { Trip } from '@/stores/trip'

defineProps<{
    trips: Trip[]
}>()
</script>

<template>
    <div class="trip-list">
        <p v-if="trips.length === 0">
            No trips found.
        </p>

        <TripCard v-for="trip in trips" :key="trip.id" :trip="trip" />
    </div>
</template>

<style scoped>
.trip-list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    width: 100%;
    gap: 16px;
    border-radius: 16px;
}

@media screen and (max-width: 600px) {
    .trips-page {
        padding: 20px;
    }

    .trip-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));

    }
}



</style>
