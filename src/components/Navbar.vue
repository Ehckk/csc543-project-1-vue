<script setup lang="ts">
import router from "@/router";
import Button from "./Button.vue"

function logout() {
    localStorage.clear()
    router.push({ path: "/login", replace: true })
}
</script>

<template>
    <div className="header-top">
        <h2 className="header-title">My Awesome Social Media App</h2>
        <Button type="button" size="small" @clicked="logout">
            Log Out
        </Button>
    </div>
</template>

<style>
.header-top {
    padding: .5rem;;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--l-2);
    box-shadow: 0 1px 3px var(--d-1);
}
</style>