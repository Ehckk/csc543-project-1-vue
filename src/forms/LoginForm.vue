<script setup lang="ts">
import { fetchFromApi } from "@/api/base";
import Form from "./Form.vue"
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import type { Credentials, Token } from "@/types";
import { reactive, ref, toRef } from "vue";

const emit = defineEmits<{ success: [access: string] }>()

const message = ref("")
const data = reactive(new Map())
const errors = reactive(new Map())

function handleChange(name: string, value: string) {
    console.log(name, value);
    data.set(name, value)
}

async function handleSubmit() {
    errors.clear()
    const result = await fetchFromApi<Credentials, Token>({
        values: Object.fromEntries(data),
        endpoint: "login",
        method: "POST"
    })
    if (!result.ok) {
        message.value = result.data.message
        for (const [key, value] of Object.entries(result.data)) {
            if (key === "message") continue
            errors.set(key, value)
        }
        return
    } 
    emit('success', result.data.access)
}
</script>

<template>
    <Form type="credentials" title="Log in" name="login" :message>
        <template #inputs>
            <Input 
                type="text" name="username" label="Username" :data :errors 
                :initial="toRef(data.get('username') ?? '')"
                @changed="handleChange"
            />
            <Input 
                type="password" name="password" label="Password" :data :errors 
                :initial="toRef(data.get('password') ?? '')"
                @changed="handleChange"
            />
        </template>
        <template #buttons>
            <Button size="large" @clicked="handleSubmit">
                Log In
            </Button>
        </template>
        <template #links>
            <p>Don't have an account? <RouterLink to="/register">Create one</RouterLink></p>
        </template>
    </Form>
</template>