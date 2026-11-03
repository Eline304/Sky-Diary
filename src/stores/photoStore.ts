import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePhotoStore = defineStore('photos', () => {
  const photos = ref<Record<string, string>>(
    JSON.parse(localStorage.getItem('photos') || '{}')
  )

  const photoDates = ref<Record<string, string>>(
    JSON.parse(localStorage.getItem('photoDates') || '{}')
  )

  watch(
    photos,
    (value) => {
      localStorage.setItem('photos', JSON.stringify(value))
    },
    { deep: true }
  )

  watch(
    photoDates,
    (value) => {
      localStorage.setItem('photoDates', JSON.stringify(value))
    },
    { deep: true }
  )

  function addPhoto(id: string, data: string, date: string) {
    photos.value[id] = data
    photoDates.value[id] = date
  }

  return { photos, photoDates, addPhoto }
})