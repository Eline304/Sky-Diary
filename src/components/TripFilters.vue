<script setup lang="ts">
defineProps<{
    search: string
    orderBy: 'date' | 'destination'
}>()

const emit = defineEmits<{
    'update:search': [value: string]
    'update:orderBy': [value: 'date' | 'destination']
}>()
</script>

<template>
    <div class="trip-filters">
        <input :value="search" type="search" placeholder="Search destination..."
            @input="emit('update:search', ($event.target as HTMLInputElement).value)" />

        <select :value="orderBy"
            @change="emit('update:orderBy', ($event.target as HTMLSelectElement).value as 'date' | 'destination')">
            <option value="">Order by</option>
            <option value="date">Newest first</option>
            <option value="destination">Destination A-Z</option>
        </select>
    </div>
</template>

<style scoped>
.trip-filters {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    justify-content: flex-end;
}

input,
select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font: inherit;
}

select:hover {
    cursor: pointer;
}

select {
    background-color: #87dbff;
    border-style: none;
    color: black;
}

input {
    width: 100%;
}

</style>
