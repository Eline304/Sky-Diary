<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePhotoUpload } from '@/composables/usePhotoUpload'
import BaseButton from '@/components/Button.vue'

const props = defineProps<{
    trip?: any
}>()

const emit = defineEmits<{
    submit: [tripData: {
        destination: string
        outbound: {
            flightNumber: string
            from: string
            to: string
            date: string
            aircraft: string
        }
        return: {
            flightNumber: string
            from: string
            to: string
            date: string
            aircraft: string
        }
        photoIds: string[]
    }]
}>()

const outwardDate = ref('')
const outwardFrom = ref('')
const outwardTo = ref('')
const outwardFlightNumber = ref('')
const outwardPlaneType = ref('')

const returnDate = ref('')
const returnFrom = ref('')
const returnTo = ref('')
const returnFlightNumber = ref('')
const returnPlaneType = ref('')

const photoIds = ref<string[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const { handleFiles } = usePhotoUpload()


watch(
    () => props.trip,
    (trip) => {
        if (!trip) return

        outwardDate.value = trip.outbound.date
        outwardFrom.value = trip.outbound.from
        outwardTo.value = trip.outbound.to
        outwardFlightNumber.value = trip.outbound.flightNumber
        outwardPlaneType.value = trip.outbound.aircraft

        returnDate.value = trip.return.date
        returnFrom.value = trip.return.from
        returnTo.value = trip.return.to
        returnFlightNumber.value = trip.return.flightNumber
        returnPlaneType.value = trip.return.aircraft

        photoIds.value = [...trip.photoIds]
    },
    { immediate: true }
)



function submitTrip() {
    emit('submit', {
        destination: outwardTo.value,
        outbound: {
            flightNumber: outwardFlightNumber.value,
            from: outwardFrom.value,
            to: outwardTo.value,
            date: outwardDate.value,
            aircraft: outwardPlaneType.value
        },
        return: {
            flightNumber: returnFlightNumber.value,
            from: returnFrom.value,
            to: returnTo.value,
            date: returnDate.value,
            aircraft: returnPlaneType.value
        },
        photoIds: [...photoIds.value]
    })
}

</script>

<template>
    <main>
        <form @submit.prevent="submitTrip">
            <h1>{{ trip ? 'Edit trip' : 'Add trip' }}</h1>
            <div class="inputs">
                <div class="outward">
                    <h4>Outward flight</h4>
                    <label>Date:</label>
                    <input v-model="outwardDate" type="date" required />

                    <label>From:</label>
                    <input v-model="outwardFrom" type="text" required />

                    <label>To:</label>
                    <input v-model="outwardTo" type="text" required />

                    <label>Flight number:</label>
                    <input v-model="outwardFlightNumber" type="text" required />

                    <label>Aircraft type:</label>
                    <input v-model="outwardPlaneType" type="text" required />
                </div>

                <div class="return">
                    <h4>Return flight</h4>
                    <label>Date:</label>
                    <input v-model="returnDate" type="date" required />

                    <label>From:</label>
                    <input v-model="returnFrom" type="text" required />

                    <label>To:</label>
                    <input v-model="returnTo" type="text" required />

                    <label>Flight number:</label>
                    <input v-model="returnFlightNumber" type="text" required />

                    <label>Aircraft type:</label>
                    <input v-model="returnPlaneType" type="text" required />
                </div>
            </div>

            <h4>Add pictures</h4>

            <BaseButton type="button" @click="fileInput?.click()">
                + Add pictures
            </BaseButton>

            <input ref="fileInput" type="file" accept="image/*" multiple hidden
                @change="handleFiles($event, id => photoIds.push(id))" />

            <BaseButton type="submit">
                {{ trip ? 'Save changes' : 'Add trip' }}
            </BaseButton>
        </form>
    </main>
</template>

<style scoped>

main {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgb(243, 243, 243);
    padding: 40px;
    border: none;
    border-radius: 16px;
    box-sizing: border-box;
    min-width: 0;
}

form h1 {
    margin: 0 0 16px;
    width: 100%;
    box-sizing: border-box;
}

.inputs {
    display: flex;
    gap: 60px;
    min-width: 0;
}

.outward,
.return {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    min-width: 0;
    flex: 1;
}

input,
button {
    padding: 8px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    max-width: 100%;
}

.submit-button {
    background-color: #87dbff;
}

@media screen and (max-width: 768px) {
    main {
        width: 100%;
        padding: 0;
    }

    form {
        width: 100%;
        padding: 20px 14px;
        border-radius: 12px;
        gap: 12px;
        margin: 20px;
    }

    form h1 {
        margin: 0 0 12px;
        font-size: 1.5rem;
    }

    .inputs {
        flex-direction: column;
        gap: 24px;
        width: 100%;
    }

    .outward,
    .return {
        width: 100%;
    }

    input {
        width: 100%;
        min-width: 0;
        font-size: 16px;
    }

    form h4 {
        margin: 4px 0;
    }
}

@media screen and (max-width: 380px) {
    form {
        padding: 16px 10px;
    }
}

</style>
