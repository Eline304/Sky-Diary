<script setup lang="ts">
import { computed } from 'vue'
import PhotoGrid from '@/components/PhotoGrid.vue'
import { useTrashStore } from '@/stores/trashStore'

const trashStore = useTrashStore()

const trashedPhotoIds = computed(() =>
    trashStore.trash.map(id => String(id))
)
</script>

<template>
    <div>
        <PhotoGrid
            :photo-ids="trashedPhotoIds"
            :show-trash="true"
        />
    </div>
</template>