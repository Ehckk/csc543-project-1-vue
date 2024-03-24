<script setup lang="ts">
import { computed, ref, watch, type InputTypeHTMLAttribute } from 'vue'

interface InputProps {
    type: InputTypeHTMLAttribute
    name: string
    label: string
    placeholder?: string
    data: Map<string, string>
    errors: Map<string, string>
}

const { name, data, errors } = defineProps<InputProps>()
const emit = defineEmits<{ changed: [name: string, value: string] }>()


const value = computed(() => {
    console.log(data)
    return data.get(name)
})
const error = computed(() => errors.get(name)) 

watch(value, () => emit('changed', name, value.value ?? ""))
</script>

<template>
    <div class="form-field">
        <input :type :name :aria-label="label" :placeholder="placeholder ?? label" v-model="value"/>
        <p class="form-error">{{ error }}</p>
    </div>
</template>

<style>
input {
    appearance: none;
    margin: .25rem;
    padding: .25rem .5rem;
    border-color: var(--g-1);
    border-style: solid;
    border-radius: .25rem;
    background-color: var(--l-1);
    color: var(--d-1);
    font-size: 1rem;
}

input::placeholder {
    color: var(--g-0);
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: .25rem
}

.form-error {
    text-align: center;
    min-height: 1rem;
    line-height: 1;
    font-size: 1rem;
    color: var(--e-0);
}
</style>