
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTripStore } from '@/stores/tripStore'
import TripForm from '@/components/TripForm.vue'
import type { Trip } from '@/stores/trip'
 
const router = useRouter()
const { addTrip } = useTripStore()
 
function submitTrip(tripData: Omit<Trip, 'id'>) {
    
    addTrip({
        id: crypto.randomUUID(),
        ...tripData
    })
 
    router.push('/trips')
}
</script>
 
<template>
    <TripForm @submit="submitTrip" />
</template>
 
