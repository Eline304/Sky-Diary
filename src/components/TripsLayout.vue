<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTrips } from '@/composables/useTrips'
import TripFilters from '@/components/TripFilters.vue'
import TripList from '@/components/TripList.vue'
import SideBar from '@/components/Sidebar.vue'

const { trips } = useTrips()

const search = ref('')
const orderBy = ref<'date' | 'destination'>('date')

const filteredTrips = computed(() => {
    const result = trips.filter(trip =>
        trip.destination
            .toLowerCase()
            .includes(search.value.trim().toLowerCase())
    )

    if (orderBy.value === 'destination') {
        return result.sort((a, b) =>
            a.destination.localeCompare(b.destination)
        )
    }

    return result.sort((a, b) =>
        b.outbound.date.localeCompare(a.outbound.date)
    )
})
</script>

<template>
    <main class="trips-page">
        <SideBar/>
        <RouterView/>
    </main>
</template>

<style scoped>

.center {
    display: flex;
}

.trips-page {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
}

h1 {
    margin-bottom: 24px;
}


@media screen and (max-width: 768px) {
    .trips-page {
        flex-direction: column;
        padding: 12px;
        min-width: 0;
    }
}


</style>
