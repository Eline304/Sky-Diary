<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFavouriteStore } from '@/stores/favourite.ts'
import { useTrashStore } from '@/stores/trashStore.ts'
import WarningMessageBox from './WarningMessageBox.vue'
import { useGesture } from '@/composables/usePhotoGesture.ts'


const favouriteStore = useFavouriteStore()
const trashStore = useTrashStore()

const props = defineProps<{
    src: string
    index: number
    total: number
    photoId: string
}>()

const emit = defineEmits<{
    close: []
    previous: []
    next: []
}>()

const { onTouchStart, onTouchEnd } = useGesture(() => emit('next'), () => emit('previous'))

const confirmationAction = ref<'favourite' | 'delete' | null>(null)

const isInTrash = computed(() =>
    trashStore.isInTrash(props.photoId)
)

const confirmationMessage = computed(() => {
    if (confirmationAction.value === 'favourite') {
        return 'Are you sure you want to remove this photo from favourites?'
    }

    if (confirmationAction.value === 'delete') {
        return 'Are you sure you want to permanently delete this photo?'
    }

    return ''
})

function handleFavourite() {
    if (favouriteStore.isFavourite(props.photoId)) {
        confirmationAction.value = 'favourite'
    } else {
        favouriteStore.toggleFavourite(props.photoId)
    }
}

function handleTrash() {
    if (isInTrash.value) {
        confirmationAction.value = 'delete'
    } else {
        trashStore.toggleTrash(props.photoId)
    }
}

function confirmAction() {
    if (confirmationAction.value === 'favourite') {
        favouriteStore.toggleFavourite(props.photoId)
    } else if (confirmationAction.value === 'delete') {
        trashStore.permanentlyDelete(props.photoId)
        emit('close')
    }

    confirmationAction.value = null
}

function cancelAction() {
    confirmationAction.value = null
}

function restorePhoto() {
    trashStore.toggleTrash(props.photoId)
}
</script>

<template>
    <div class="viewer" @click.self="emit('close')">
        <div class="actions">
            <button @click="handleFavourite">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z"
                        :stroke="favouriteStore.isFavourite(props.photoId) ? '#ff59a6' : '#ffffff'" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <button @click="handleTrash">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <button v-if="isInTrash" title="Restore photo" @click="restorePhoto">
                <svg width="20px" height="20px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.88468 17C7.32466 19.1128 9.75033 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5C8.08172 4.5 4.5 8.08172 4.5 12.5V13.5M12.5 8V12.5L15.5 15.5"
                        stroke="#ffffff" stroke-width="1.2" />
                    <path d="M7 11L4.5 13.5L2 11" stroke="#ffffff" stroke-width="1.2" />
                </svg>
            </button>

            <button class="close" @click="emit('close')">
                &times;
            </button>
        </div>

        <div class="image-left-right" @touchstart="onTouchStart" @touchend="onTouchEnd">
            <button class="left" @click="emit('previous')">
                &lt;
            </button>

            <img :src="src" alt="Selected photo" />

            <button class="right" @click="emit('next')">
                &gt;
            </button>
        </div>

        <p class="photo-counter">
            {{ index + 1 }} / {{ total }}
        </p>

        <WarningMessageBox v-if="confirmationAction" :message="confirmationMessage" @yes="confirmAction"
            @no="cancelAction" />
    </div>
</template>

<style scoped>
.viewer {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.92);

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    padding: 70px 16px 55px;
    box-sizing: border-box;
}

.actions {
    position: absolute;
    top: max(16px, env(safe-area-inset-top));
    right: max(16px, env(safe-area-inset-right));
    left: max(16px, env(safe-area-inset-left));

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    z-index: 2;
}

button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 44px;
    min-height: 44px;
    padding: 10px;

    border: 0;
    border-radius: 8px;
    background: rgba(65, 65, 65, 0.85);
    color: white;

    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    flex-shrink: 0;

    transition: background 0.2s ease;
}

button:hover {
    background: #555;
}

button:focus-visible {
    outline: 2px solid white;
    outline-offset: 3px;
}

button svg {
    display: block;
    flex-shrink: 0;
}

.actions .close {
    font-size: 32px;
    background: transparent;
}

.image-left-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;

    touch-action: pan-y;
}

.image-left-right img {
    display: block;

    width: auto;
    height: auto;

    max-width: 100%;
    max-height: 100%;
    min-width: 0;
    min-height: 0;

    object-fit: contain;
    flex: 0 1 auto;
    margin: auto;
}

.image-left-right .left,
.image-left-right .right {
    width: 44px;
    height: 52px;
    padding: 0;

    background: rgba(65, 65, 65, 0.75);
    font-size: 28px;
}

.image-left-right .left {
    margin-left: 0;
}

.image-left-right .right {
    margin-right: 0;
}

.photo-counter {
    position: absolute;
    bottom: max(12px, env(safe-area-inset-bottom));
    left: 50%;
    transform: translateX(-50%);

    margin: 0;
    padding: 8px 14px;
    border-radius: 20px;

    background: rgba(40, 40, 40, 0.75);
    color: white;
    font-size: 14px;
    white-space: nowrap;
}

@media (max-width: 768px) {
    .viewer {
        padding: 76px 8px 54px;
    }

    .actions {
        top: max(10px, env(safe-area-inset-top));
        right: max(10px, env(safe-area-inset-right));
        left: max(10px, env(safe-area-inset-left));
        gap: 6px;
    }

    button {
        min-width: 42px;
        min-height: 42px;
        padding: 9px;
        border-radius: 8px;
    }

    .actions .close {
        font-size: 30px;
    }

    .image-left-right {
        gap: 6px;
    }

    .image-left-right .left,
    .image-left-right .right {
        width: 36px;
        min-width: 36px;
        height: 44px;
        min-height: 44px;
        font-size: 24px;
    }

    .image-left-right img {
        max-width: calc(100% - 84px);
        max-height: 100%;
    }

    .photo-counter {
        font-size: 13px;
    }
}

@media (max-width: 380px) {
    .viewer {
        padding-right: 5px;
        padding-left: 5px;
    }

    .actions {
        gap: 4px;
    }

    button {
        min-width: 38px;
        min-height: 38px;
        padding: 7px;
    }

    .actions button svg {
        width: 18px;
        height: 18px;
    }

    .image-left-right {
        gap: 4px;
    }

    .image-left-right .left,
    .image-left-right .right {
        width: 30px;
        min-width: 30px;
        height: 40px;
        min-height: 40px;
        font-size: 21px;
    }

    .image-left-right img {
        max-width: calc(100% - 68px);
    }
}

@media (max-height: 500px) {
    .viewer {
        padding-top: 54px;
        padding-bottom: 40px;
    }

    .actions {
        top: max(6px, env(safe-area-inset-top));
    }

    .actions button {
        min-height: 36px;
        min-width: 36px;
        padding: 6px;
    }

    .image-left-right img {
        max-height: 100%;
    }

    .photo-counter {
        bottom: max(4px, env(safe-area-inset-bottom));
        padding: 5px 10px;
    }
}

</style>
