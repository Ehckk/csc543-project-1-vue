<script setup lang="ts">
import CredentialsLayout from "@/layouts/CredentialsLayout.vue";
import LoginForm from "@/forms/LoginForm.vue";
import router from "@/router";

function handleSuccess(access: string) {
    localStorage.setItem("access", access)
    router.push({ path: "/", replace: true })
}
</script>

<template>
    <CredentialsLayout>
        <LoginForm @success="handleSuccess"/>
    </CredentialsLayout>
</template>