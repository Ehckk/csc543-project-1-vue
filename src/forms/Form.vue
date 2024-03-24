<script setup lang="ts">
import { computed } from 'vue';

interface FormProps {
    type: string
    name: string
    title?: string
    message?: string

}

const props = defineProps<FormProps>()
const emit = defineEmits(['submit'])

const id = computed(() => `${props.name}-form`)
const className = computed(() => props.type + "-form") 
</script>

<template>
    <form :name :id :class="className" @submit="emit('submit')">
        <h1 v-if="title" class="form-title">{{ title }}</h1>
        <p v-if="message" class="form-message">{{ message }}</p>
        <div class="form-body">
            <slot name="inputs"></slot>
        </div>
        <div class="form-buttons">
            <slot name="buttons"></slot>
        </div>
        <slot name="links"></slot>
    </form>
</template>

<style>
.form-title {
    margin-bottom: .5rem;
}

.form-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.form-buttons {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.credentials-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    padding: 1rem;
    margin: auto;
    min-width: 20rem;
}

.post-form {
    margin: .5rem 0;
    padding: 1rem;
    background-color: var(--l-2);
    box-shadow: 0 1px 3px var(--g-0);
    border-radius: .5rem;;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-message {
    text-align: center;
    min-height: 1rem;
    line-height: 1;
    font-size: 1rem;
    color: var(--e-0);
}

.post-form .form-buttons {
    justify-content: right;
}
</style>