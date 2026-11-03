<script setup lang="ts">
defineProps<{
    date: string
    photoIds: string[]
    photos: Record<string, string>
}>()

const emit = defineEmits<{
    select: [id: string]
}>()
</script>

<template>
    <section class="photo-group">
        <h2>{{ date }}</h2>

        <div class="photo-grid">
            <img
                v-for="id in photoIds"
                :key="id"
                :src="photos[id]"
                :alt="`Photo ${id}`"
                @click="emit('select', id)"
            />
        </div>
    </section>
</template>

<style scoped>
.photo-group {
    margin-bottom: 2rem;
}

.photo-group h2 {
    margin-bottom: 1rem;
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
}

.photo-grid img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
}
</style>