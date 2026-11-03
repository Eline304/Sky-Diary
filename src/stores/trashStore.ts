
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { usePhotoStore } from '@/stores/photoStore'

export const useTrashStore = defineStore('trash', () => {
    const savedTrash = localStorage.getItem('trash')

    const trash = ref<string[]>(
        savedTrash ? JSON.parse(savedTrash) : []
    )

    watch(
        trash,
        (value) => {
            localStorage.setItem('trash', JSON.stringify(value))
        },
        { deep: true }
    )

    function toggleTrash(id: string) {
        if (inTrash(id)) {
            trash.value = trash.value.filter(
                trashId => trashId !== id
            )
        } else {
            trash.value.push(id)
        }
    }

    function inTrash(id: string) {
        return trash.value.includes(id)
    }


    function permanentlyDelete(id: string) {
        const photoStore = usePhotoStore()

        trash.value = trash.value.filter(
            trashId => trashId !== id
        )

        delete photoStore.photos[id]
        delete photoStore.photoDates[id]
    }

    return {
        trash,
        toggleTrash,
        inTrash,
        permanentlyDelete,
        isInTrash: inTrash
    }



})
