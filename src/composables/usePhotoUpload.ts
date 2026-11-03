
import { usePhotoStore } from '@/stores/photoStore'
import { getPhotoDate } from '@/composables/usePhotoDate'

export function usePhotoUpload() {
  const photoStore = usePhotoStore()

  async function handleFiles(event: Event, addPhoto: (id: string) => void) {
    const input = event.target as HTMLInputElement
    const files = Array.from(input.files ?? [])
      .filter(file => file.type.startsWith('image/'))

    for (const file of files) {
      const date = await getPhotoDate(file)
      const reader = new FileReader()

      await new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const id = crypto.randomUUID()
            photoStore.addPhoto(id, reader.result, date)
            addPhoto(id)
          }
          resolve()
        }

        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })
    }

    input.value = ''
  }

  return { handleFiles }
}
