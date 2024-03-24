<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

type ButtonSize = "small" | "large"

const ButtonSizeClassName: Record<ButtonSize, string> = {
    small: "btn-small",
    large: "btn-large"
} as const

const props = defineProps<{
    type?: ButtonHTMLAttributes["type"]
    size: ButtonSize
    click?: () => void
}>()
const emit = defineEmits(['clicked'])

const className = ButtonSizeClassName[props.size]
</script>

<template>
    <button :type="type ?? 'button'" :class="className" @click="emit('clicked')">
        <slot></slot>
    </button>
</template>

<style>
.btn-small, .btn-large {
    cursor: pointer;
    appearance: none;
    outline: none;
    border-color: var(--b-0);
    border-style: solid;
    border-width: 2px;
    border-radius: .5rem;
    background-color: var(--b-1);
    color: var(--l-2)
}

.btn-small {
    padding: 0.5rem 1rem;
}

.btn-large {
    padding: 0.5rem 1.5rem;
    font-size: 1.125rem;
}
</style>