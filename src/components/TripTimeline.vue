<script setup lang="ts">
import type { Trip } from '@/stores/trip'
import { computed } from 'vue'
import { usePhotoStore } from '@/stores/photoStore'
import { useTrashStore } from '@/stores/trashStore'

defineProps<{
    trips: Trip[]
}>()

const photoStore = usePhotoStore()
const trashStore = useTrashStore()

function firstPhoto(trip: Trip) {
    return trip.photoIds.find(id =>
        id in photoStore.photos &&
        !trashStore.inTrash(id)
    )
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    })
}
</script>

<template>
    <div class="list-container">
        <ul class="trip-list">
            <li v-for="trip in [...trips].sort(
                (a, b) => new Date(b.outbound.date).getTime() - new Date(a.outbound.date).getTime()
            )" :key="trip.id">
                <time class="trip-date" :datetime="trip.outbound.date">
                    {{ formatDate(trip.outbound.date) }}
                </time>

                <RouterLink :to="`/trips/${trip.id}`" class="trip-link">
                    <div class="image-container">
                        <img v-if="firstPhoto(trip)" :src="photoStore.photos[firstPhoto(trip)!]" :alt="trip.destination"
                            class="trip-cover" />
                    </div>

                    <span>{{ trip.destination }}</span>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.list-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.trip-list {
    --size: 200px;

    list-style: none;
    margin: 0;
    padding: 5em 24px 0 120px;
    width: 100%;
    max-width: 700px;
    box-sizing: border-box;
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 2em;
}

.trip-list::before {
    content: '';
    position: absolute;
    top: 5em;
    bottom: 0;
    left: 100px;
    width: 2px;
    background: #ddd;
}

.trip-list li {
    position: relative;
}

.trip-list li::before {
    content: '';
    position: absolute;
    top: calc(var(--size) / 2);
    left: -19px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #87dbff;
    transform: translate(-50%, -50%);
}

.trip-date {
    position: absolute;
    top: calc(var(--size) / 2);
    right: calc(100% + 30px);
    transform: translateY(-50%);
    white-space: nowrap;
    font-size: 0.9rem;
    color: rgb(85, 85, 85);
}

.trip-link {
    display: flex;
    align-items: center;
    gap: 20px;
    text-decoration: none;
    color: inherit;
}

.image-container {
    width: var(--size);
    height: var(--size);
    flex-shrink: 0;
}

.trip-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 200px;
    display: block;
}

@media (max-width: 600px) {
    .trip-list {
        --size: 120px;
    }
}
</style>