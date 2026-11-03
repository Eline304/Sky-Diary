<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import type { Trip } from '@/stores/trip'
import { usePhotoStore } from '@/stores/photoStore'
import { useTrashStore } from '@/stores/trashStore';

const photoStore = usePhotoStore()
const trashStore = useTrashStore()

const props = defineProps<{
    trip: Trip
}>()

const router = useRouter()

const visiblePhotoIds = computed(() =>
    props.trip.photoIds.filter(id =>
        id in photoStore.photos &&
        !trashStore.inTrash(id)
    )
)

const firstPhoto = computed(() => {
    return visiblePhotoIds.value[0]
})

</script>

<template>
    <article class="trip-card" @click="router.push(`/trips/${trip.id}`)">
        <div class="image-container">
            <img v-if="firstPhoto && photoStore.photos[firstPhoto]" :src="photoStore.photos[firstPhoto]"
                :alt="trip.destination" class="trip-cover" />
        </div>

        <div class="trip-content">
            <h2>{{ trip.destination }}</h2>
            <p class="flight-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1200" aria-hidden="true">
                    <path
                        d="M321,1164h120l269.28-480.06H1020c0,0,180,0,180-83.94c0-84-180-84-180-84H710.28L441,36H321l149.28,480H255.06L120,395.94H0l96.06,204L0,804h120l135.06-120.06h215.22L321,1164z" />
                </svg>
                <span class="flight-details">
                    <span class="flight-date">{{ trip.outbound.date }}</span>
                    <span class="flight-route">{{ trip.outbound.from }} – {{ trip.outbound.to }}</span>
                </span>
            </p>

            <p class="flight-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1200" aria-hidden="true">
                    <g transform="translate(1200, 0) scale(-1, 1)">
                        <path
                            d="M321,1164h120l269.28-480.06H1020c0,0,180,0,180-83.94c0-84-180-84-180-84H710.28L441,36H321l149.28,480H255.06L120,395.94H0l96.06,204L0,804h120l135.06-120.06h215.22L321,1164z" />
                    </g>
                </svg>
                <span class="flight-details">
                    <span class="flight-date">{{ trip.return.date }}</span>
                    <span class="flight-route">{{ trip.return.from }} – {{ trip.return.to }}</span>
                </span>
            </p>

            <p>{{ visiblePhotoIds.length }} photos</p>
        </div>
    </article>
</template>

<style scoped>
.trip-card {
    padding: 0;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 2px 4px 18px #aec5cf;
    min-width: 0;
    box-sizing: border-box;
    overflow: hidden;
}

.image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
}

.trip-content {
    padding: 16px;
}

p,
h2,
svg {
    color: rgb(85, 85, 85);
}

h2 {
    margin-top: 0;
}

.trip-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

p {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
}

.flight-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.flight-info svg {
    flex-shrink: 0;
    fill: currentColor;
}

.flight-details {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
}

.flight-date {
    font-size: 0.85rem;
    color: #999;
}

.flight-route {
    font-weight: 500;
    overflow-wrap: anywhere;
}

@media screen and (max-width: 768px) {
    .trip-card {
        border-radius: 10px;
        box-shadow: 1px 2px 8px #aec5cf;
    }

    .image-container {
        aspect-ratio: 16 / 9;
    }

    .trip-content {
        padding: 10px;
    }

    h2 {
        font-size: 1.1rem;
        margin-bottom: 8px;
        overflow-wrap: anywhere;
    }

    p {
        font-size: 0.8rem;
        line-height: 1.35;
        gap: 6px;
        margin: 6px 0;
        overflow-wrap: anywhere;
    }

    p svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    .flight-info {
        gap: 6px;
    }

    .flight-date {
        font-size: 0.75rem;
    }

    .flight-route {
        font-size: 0.8rem;
    }
}

@media screen and (max-width: 380px) {
    .trip-content {
        padding: 8px;
    }

    h2 {
        font-size: 1rem;
    }

    p {
        font-size: 0.75rem;
    }
}
</style>