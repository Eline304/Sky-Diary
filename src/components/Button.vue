
<script setup lang="ts">
defineEmits(['click'])

withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset'
}>(), {
    type: 'button'
})
</script>

<template>
    <button :type="type" @click="$emit('click')">
        <slot />
    </button>
</template>

<style scoped>
button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font: inherit;
    background-color: #87dbff;
    border-style: none;
    color: black;
    margin: 0 auto;
}

button:hover {
    cursor: pointer;
}
</style>

