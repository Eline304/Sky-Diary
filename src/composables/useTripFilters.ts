import { ref, computed } from 'vue'
import type { Trip } from '@/stores/trip.ts'

export function useFilters(trips: Trip[]) {
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

    return {
        search,
        orderBy,
        filteredTrips
    }
}