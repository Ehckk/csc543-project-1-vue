<script setup lang="ts">
    import { fetchFromApi } from "@/api/base";
    import Form from "./Form.vue"
    import Button from "@/components/Button.vue";
    import Input from "@/components/Input.vue";
    import type { Registration, Token } from "@/types";
    import { reactive, ref, toRef } from "vue";

    const emit = defineEmits<{ success: [access: string] }>()

    const message = ref("")
    const data = reactive(new Map())
    const errors = reactive(new Map())

    function handleChange(name: string, value: string) {
        data.set(name, value)
    }

    async function handleSubmit() {
        errors.clear()
        const result = await fetchFromApi<Registration, Token>({
            values: Object.fromEntries(data),
            endpoint: "register",
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
    <Form type="credentials" title="Register" name="register" :message @submit="handleSubmit">
        <template #inputs>
            <Input 
                type="text" name="username" label="Username" :errors
                :initial="toRef(data.get('username') ?? '')"
                @changed="handleChange"
            />
            <Input 
                type="text" name="display_name" label="Display Name" :errors
                :initial="toRef(data.get('display_name') ?? '')"
                @changed="handleChange"
            />
            <Input 
                type="password" name="password" label="Password" :errors
                :initial="toRef(data.get('password') ?? '')"
                @changed="handleChange"
            />
            <Input 
                type="confirm" name="confirm" label="Confirm Password" :errors
                :initial="toRef(data.get('confirm') ?? '')"
                @changed="handleChange"
            />
        </template>
        <template #buttons>
            <Button type="submit" size="large">
                Sign Up
            </Button>
        </template>
        <template #links>
            <p>Already have an account? <RouterLink to="/register">Sign In</RouterLink></p>
        </template>
    </Form>
</template>