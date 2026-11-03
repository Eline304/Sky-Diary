
<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePhotoStore } from '@/stores/photoStore'
import PhotoViewer from './PhotoViewer.vue'
import { useTrashStore } from '@/stores/trashStore'

const props = withDefaults(
    defineProps<{
        photoIds: string[]
        showTrash?: boolean
    }>(),
    {
        showTrash: false
    }
)

const photoStore = usePhotoStore()
const trashStore = useTrashStore()

const selected = ref<string | null>(null)

const visiblePhotoIds = computed(() =>
    props.photoIds.filter(id => {
        const photoExists = id in photoStore.photos
        const inTrash = trashStore.inTrash(id)

        if (!photoExists) return false

        return props.showTrash ? inTrash : !inTrash
    })
)

const photosGroupedByDay = computed(() => {
    const groups: Record<string, string[]> = {}

    for (const id of visiblePhotoIds.value) {
        const date = photoStore.photoDates[id] ?? 'Unknown'

        if (!groups[date]) {
            groups[date] = []
        }

        groups[date].push(id)
    }

    return Object.entries(groups).sort(([a], [b]) => {
        if (a === 'Unknown') return 1
        if (b === 'Unknown') return -1
        return b.localeCompare(a)
    })
})

const selectedGroup = computed(() =>
    photosGroupedByDay.value.find(([, ids]) =>
        ids.includes(selected.value ?? '')
    )
)

const selectedPhotoIds = computed(() =>
    selectedGroup.value?.[1] ?? []
)

const selectedIndex = computed(() =>
    selectedPhotoIds.value.indexOf(selected.value ?? '')
)

const src = computed(() =>
    selected.value
        ? photoStore.photos[selected.value] ?? ''
        : ''
)

function move(step: number) {
    const ids = selectedPhotoIds.value

    if (ids.length === 0 || selectedIndex.value < 0) return

    const nextIndex =
        (selectedIndex.value + step + ids.length) % ids.length

    selected.value = ids[nextIndex]
}
</script>

<template>
    <div class="photo-groups">
        <section
            v-for="[date, ids] in photosGroupedByDay"
            :key="date"
            class="photo-group"
        >
            <h4>{{ date }}</h4>

            <div class="photo-grid">
                <img
                    v-for="id in ids"
                    :key="id"
                    :src="photoStore.photos[id]"
                    :alt="`Photo ${id}`"
                    @click="selected = id"
                />
            </div>
        </section>
    </div>

    <PhotoViewer
        v-if="selected !== null"
        :src="src"
        :index="selectedIndex"
        :total="selectedPhotoIds.length"
        :photo-id="selected"
        @close="selected = null"
        @previous="move(-1)"
        @next="move(1)"
    />
</template>

<style scoped>
.photo-groups {
    width: 100%;
    min-width: 0;
}

.photo-group {
    margin-bottom: 2rem;
}

.photo-group h4 {
    margin: 0 0 1rem;
    color: rgb(120, 120, 120);
    font-size: 1rem;
    font-weight: 600;
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
}

.photo-grid img {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 2px;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

@media (hover: hover) {
    .photo-grid img:hover {
        opacity: 0.85;
    }
}

@media (max-width: 1024px) {
    .photo-grid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 8px;
    }

    .photo-group {
        margin-bottom: 1.5rem;
    }
}

@media (max-width: 768px) {
    .photo-group {
        margin-bottom: 1rem;
    }

    .photo-group h4 {
        margin-bottom: 6px;
        font-size: 0.9rem;
        line-height: 1.3;
    }

    .photo-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 4px;
    }

    .photo-grid img {
        border-radius: 1px;
    }
}

@media (max-width: 380px) {
    .photo-group {
        margin-bottom: 0.75rem;
    }

    .photo-group h4 {
        margin-bottom: 5px;
        font-size: 0.85rem;
    }

    .photo-grid {
        gap: 3px;
    }

    .photo-grid img {
        border-radius: 2px;
    }
}

</style>
