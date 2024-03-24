<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';

interface TextAreaProps {
    name: string
    label: string
    initial: Ref<string>
    placeholder?: string
}

const { name, initial } = defineProps<TextAreaProps>()
const emit = defineEmits<{ changed: [name: string, value: string] }>()

const value = ref(initial ?? "")

watch(value, () => emit('changed', name, value.value ?? ""))
watch(initial, () => value.value = initial.value)
</script>

<template>
    <textarea :name :aria-label="label" :placeholder="placeholder ?? label" v-model="value">
    </textarea>
</template>

<style>
textarea {
    appearance: none;
    padding: .25rem .5rem;
    border-color: var(--g-1);
    border-style: solid;
    border-radius: .25rem;
    background-color: var(--l-1);
    color: var(--d-1);
    font-size: 1rem;
    width: 100%;
    min-height: 3rem;
    height: 100%;
    max-height: 32rem;
    resize: vertical;
}

textarea::placeholder {
    color: var(--g-0);
}
</style>