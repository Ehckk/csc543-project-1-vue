<script setup lange="ts">
import router from "@/router"
import Navbar from '@/components/Navbar.vue';

const token = localStorage.getItem("access")
if (!token) {
    router.push({ path: "/login", replace: true })
}
</script>

<template>
    <div class="home">
        <Navbar/>
        <main class="content">
            <slot></slot>
        </main>
    </div>
</template>

<style>
.home {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.content {
    height: 100%;
    position: relative;
    margin: 0 auto;
    overflow-y: auto;
    min-width: clamp(32rem, 50%, 40rem);
    /* background-color: var(--l-0); */
}
</style>