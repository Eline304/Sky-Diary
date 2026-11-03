import { useTripStore } from '@/stores/tripStore'

export function useTrips() {
    const tripStore = useTripStore()

    return {
        trips: tripStore.trips,
        addTrip: tripStore.addTrip
    }
}