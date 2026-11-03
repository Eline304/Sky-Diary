<script setup lang=ts>
import PhotoGrid from '@/components/PhotoGrid.vue'
import { computed } from 'vue'
import { useFavouriteStore } from '@/stores/favourite';

const favouriteStore = useFavouriteStore()

const favouritePhotoIds = computed(() =>
    favouriteStore.favourites.map(id => String(id))
)

</script>

<template>
    <div>
        <PhotoGrid :photo-ids="favouritePhotoIds" />
    </div>
</template>