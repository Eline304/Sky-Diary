import { ref } from 'vue'

export function useCamera() {
  const cameraInput = ref<HTMLInputElement | null>(null)

  const message = ref('')
  let denied = false

  function openCamera() {
    denied = false
    message.value =
      'Allow camera access?'
  }

  async function confirmCamera() {
    if (denied) {
      message.value = ''
      cameraInput.value?.click()
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())

      message.value = ''
      cameraInput.value?.click()
    } catch {
      denied = true
      message.value =
        'The camera could not be accessed. Choose a photo from your device instead?'
    }
  }

  function cancelCamera() {
    message.value = ''
  }

  return {
    cameraInput,
    message,
    openCamera,
    confirmCamera,
    cancelCamera
  }
}