<script setup lang="ts">
import { computed } from 'vue'

interface LikeButtonProps {
    liked: boolean
}

const props = defineProps<LikeButtonProps>()
const emit = defineEmits(['liked'])

const className = computed(() => {
    const list = ["like-button"]
    if (props.liked) {
        list.push("liked")
    }
    return list.join(" ")
})
</script>

<template>
    <button :class="className" @click="emit('liked')">
    </button>
</template>

<style>
.like-button {
    padding: 5px 6px 4px;
    border: none;
    box-shadow: 0 1px 3px vaR(--d-0);
    display: inline-block;
    color: var(--g-0);
    background-color: var(--l-1);
    border-radius: 50%;
}

.like-button::before {
    font-family: fontawesome;
    content:'\f004';
    font-style:normal;
}

.like-button.liked::before {
    color: var(--e-0);
}
</style>