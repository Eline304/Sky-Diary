import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export interface Photo {
  src: string
  dateTaken: string
}

export const useFavouriteStore = defineStore('favourite', () => {
  const savedFavourites = localStorage.getItem('favourites')

  const favourites = ref<string[]>(savedFavourites ? JSON.parse(savedFavourites) : [])

  watch(
    favourites,
    (value) => {
      localStorage.setItem('favourites', JSON.stringify(value))
    },
    { deep: true }
  )

  function toggleFavourite(id: string) {
    if (isFavourite(id)) {
      favourites.value = favourites.value.filter(favouriteId => favouriteId !== id)
    } else {
      favourites.value.push(id)
    }
  }

  function isFavourite(id: string) {
    return favourites.value.includes(id)
  }

  return {
    favourites,
    toggleFavourite,
    isFavourite
  }
})