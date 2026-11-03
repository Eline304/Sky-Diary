<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTripStore } from '@/stores/tripStore'
import { usePhotoUpload } from '@/composables/usePhotoUpload'
import PhotoGrid from '@/components/PhotoGrid.vue'
import PhotoViewer from '@/components/PhotoViewer.vue'
import FlightInfo from '@/components/FlightInfo.vue'
import BaseButton from '@/components/Button.vue'
import { useTrashStore } from '@/stores/trashStore'
import TripForm from '@/components/TripForm.vue'
import WarningMessageBox from '@/components/WarningMessageBox.vue'
import { useCamera } from '@/composables/useCamera.ts'
 
const route = useRoute()
const trips = useTripStore().trips
const trashStore = useTrashStore()
const isEditing = ref(false)
const selectedPhotoIndex = ref<number | null>(null)
const trip = computed(() =>
    trips.find(trip => trip.id === String(route.params.id))
)
const photosNotInTrashIds = computed(() => {
    if (!trip.value) return []
 
    return trip.value.photoIds.filter(
        id => !trashStore.isInTrash(id)
    )
})
 
const selectedPhotoId = computed(() => {
    if (selectedPhotoIndex.value === null) return null
 
    return photosNotInTrashIds.value[selectedPhotoIndex.value] ?? null
})
 
function edit() {
    isEditing.value = true
}
 
function saveTrip(data: any) {
    if (!trip.value) return
 
    Object.assign(trip.value, data)
    isEditing.value = false
}
 
function openPhoto(index: number) {
    selectedPhotoIndex.value = index
}
 
function closePhoto() {
    selectedPhotoIndex.value = null
}
 
function previousPhoto() {
    const total = photosNotInTrashIds.value.length
 
    if (selectedPhotoIndex.value === null || total === 0) return
 
    selectedPhotoIndex.value =
        (selectedPhotoIndex.value - 1 + total) % total
}
 
function nextPhoto() {
    const total = photosNotInTrashIds.value.length
 
    if (selectedPhotoIndex.value === null || total === 0) return
 
    selectedPhotoIndex.value =
        (selectedPhotoIndex.value + 1) % total
}
 
const fileInput = ref<HTMLInputElement | null>(null)
const { handleFiles } = usePhotoUpload()
 
function getPhotoSrc(photoId: string | number): string {
    return String(photoId)
}
 
const { cameraInput,message: cameraMessage, openCamera, confirmCamera, cancelCamera } = useCamera()
 
</script>
 
<template>
    <main v-if="trip" class="trip-detail">
 
        <TripForm v-if="isEditing" :trip="trip" @submit="saveTrip" />
 
        <template v-else>
            <h2>{{ trip.destination }}</h2>
 
            <FlightInfo class="flight-info" :outbound="trip.outbound" :return-flight="trip.return" />
 
            <div class="buttons">
                <BaseButton class="camera-button" @click="openCamera">
                    Open camera
                </BaseButton>
 
                <BaseButton @click="edit">
                    Edit trip
                </BaseButton>
 
                <BaseButton @click="fileInput?.click()">
                    Add pictures
                </BaseButton>
 
                <input ref="fileInput" type="file" accept="image/*" multiple hidden
                    @change="handleFiles($event, id => trip!.photoIds.push(id))" />
 
                <input ref="cameraInput" type="file" accept="image/*" capture="environment" hidden
                    @change="handleFiles($event, id => trip!.photoIds.push(id))" />
            </div>
 
            <PhotoGrid :photo-ids="photosNotInTrashIds" @select-photo="openPhoto" />
        </template>
 
        <PhotoViewer v-if="
            selectedPhotoIndex !== null &&
            selectedPhotoId !== null
        " :src="getPhotoSrc(selectedPhotoId)" :photo-id="String(selectedPhotoId)" :index="selectedPhotoIndex"
            :total="photosNotInTrashIds.length" @close="closePhoto" @previous="previousPhoto" @next="nextPhoto" />
 
        <WarningMessageBox v-if="cameraMessage" :message="cameraMessage" @yes="confirmCamera"
            @no="cancelCamera" />
 
    </main>
 
    <main v-else class="trip-not-found">
        <p>Trip not found.</p>
    </main>
</template>
 
<style scoped>
 
.trip-detail {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem 24px;
    box-sizing: border-box;
    color: rgb(85, 85, 85);
}
 
h2 {
    margin: 0;
    text-align: center;
}
 
.flight-info {
    align-self: center;
    max-width: 100%;
}
 
.buttons {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    margin-left: auto;
    margin-bottom: 2em;
}
 
.trip-not-found {
    padding: 2rem;
    text-align: center;
}
 
.camera-button {
  display: none;
}
 
@media (max-width: 1200px) {
  .camera-button {
    display: block; 
  }
}
 
</style>