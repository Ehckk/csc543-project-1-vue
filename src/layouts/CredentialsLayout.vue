<script setup lange="ts">
import router from "@/router"

const token = localStorage.getItem("access")
if (token) {
    router.push({ path: "/", replace: true })
}
</script>

<template>
    <div class="credentials">
        <slot></slot>
    </div>
</template>

<style>
.credentials {
    margin-bottom: 2rem;
    padding: .5rem;
    box-shadow: 0 1px 3px var(--g-0);
    border-radius: .5rem;
    background-color: var(--l-2);
}
</style>