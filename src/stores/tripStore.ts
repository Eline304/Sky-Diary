import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Trip } from './trip'

export const useTripStore = defineStore('trip', () => {
  const savedTrips = localStorage.getItem('trips')

  const trips = ref<Trip[]>(
    savedTrips
      ? JSON.parse(savedTrips)
      : [
      ]
  )

  watch(
    trips,
    (value) => {
      localStorage.setItem('trips', JSON.stringify(value))
    },
    { deep: true }
  )

  function addTrip(trip: Trip) {
    trips.value.push(trip)
    localStorage.setItem('trips', JSON.stringify(trips.value))
}

  return {
    addTrip,
    trips
  }
})