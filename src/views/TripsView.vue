<script setup lang="ts">
import { useTripStore } from '@/stores/tripStore'
import { useFilters } from '@/composables/useTripFilters'
import TripFilters from '@/components/TripFilters.vue'
import TripList from '@/components/TripList.vue'
import BaseButton from '@/components/Button.vue'
 
const trips = useTripStore().trips
 
const { search, orderBy, filteredTrips} = useFilters(trips)
</script>
 
<template>
    <main class="trips-page">
        <TripFilters v-model:search="search" v-model:order-by="orderBy"/>
 
        <div class="add-trip-button">
            <BaseButton @click="$router.push('/trips/new')">
                Add trip
            </BaseButton>
        </div>
 
        <div>
            <TripList :trips="filteredTrips" />
        </div>
    </main>
</template>
 
<style scoped>
.add-trip-button {
    display: flex;
    margin-left: auto;
    align-self: flex-end;
    margin-bottom: 2em;
}
 
.trips-page {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
 
h1 {
    margin-bottom: 24px;
}
 
@media screen and (max-width: 1600px) {
    .trips-page {
        padding: 20px;
    }    
}
 
@media screen and (max-width: 1200px) {
    .trips-page {
        padding: 16px;
    }
}
 
</style>