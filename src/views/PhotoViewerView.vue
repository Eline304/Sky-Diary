<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    photoIds: (string | number)[]
}>()

const emit = defineEmits<{
    'select-photo': [index: number]
}>()

function getPhotoSrc(photoId: string | number): string {
    return String(photoId)
}

const photos = computed(() =>
    props.photoIds.map((id, index) => ({id, src: getPhotoSrc(id), index }))
)
</script>

<template>
    <div class="photo-grid">
        <button v-for="photo in photos" :key="photo.id" class="photo-item" type="button" :aria-label="`View photo ${photo.index + 1}`" @click="emit('select-photo', photo.index)">
            <img :src="photo.src" alt="Trip photo" loading="lazy"/>
        </button>
    </div>
</template>

<style scoped>
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
}

.photo-item {
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
    border: none;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
}

.photo-item img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    transition: transform 0.2s ease;
}

.photo-item:hover img {
    transform: scale(1.04);
}

.photo-item:focus-visible {
    outline: 3px solid #87dbff;
    outline-offset: 3px;
}
</style>