<script setup lang="ts">
import CredentialsLayout from "@/layouts/CredentialsLayout.vue";
import RegisterForm from "@/forms/RegisterForm.vue";
import router from "@/router";

function handleSuccess(access: string) {
    localStorage.setItem("access", access)
    router.push({ path: "/", replace: true })
}
</script>

<template>
    <CredentialsLayout>
        <RegisterForm @success="handleSuccess"/>
    </CredentialsLayout>
</template>