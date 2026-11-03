
<script setup lang="ts">
defineProps<{
    message: string
}>()

defineEmits<{
    yes: []
    no: []
}>()
</script>

<template>
    <div class="confirmation-position" @click.self="$emit('no')">
        <div
            class="message"
            role="alertdialog"
            aria-modal="true"
        >
            <p>{{ message }}</p>

            <button @click="$emit('yes')">
                Yes
            </button>

            <button @click="$emit('no')">
                No
            </button>
        </div>
    </div>
</template>

<style scoped>
.confirmation-position {
    position: fixed;
    inset: 0;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
}

.message {
    width: 350px;
    max-width: calc(100vw - 40px);
    padding: 24px;
    border-radius: 10px;
    background: white;
    color: black;
    text-align: center;
}

.message p {
    margin-bottom: 24px;
    color: rgb(0, 0, 0);
    line-height: 1.5;
}

.message button {
    margin: 0 6px;
    padding: 12px 20px;
    border: 0;
    border-radius: 6px;
    background: #87dbff;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #818181;
}
</style>
