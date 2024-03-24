<script setup lang="ts">
import { fetchFromApi } from "@/api/base";
import Form from "./Form.vue"
import Button from "@/components/Button.vue";
import type { CreatePost } from "@/types";
import { reactive, ref, toRef } from "vue";
import TextArea from "@/components/TextArea.vue";

const emit = defineEmits(['success'])

const message = ref("")
const data = reactive(new Map)
const errors = reactive(new Map())

function handleChange(name: string, value: string) {
    data.set(name, value)
}

async function handleSubmit() {
    errors.clear()
    const result = await fetchFromApi<CreatePost>({
        values: Object.fromEntries(data),
        endpoint: "posts/new",
        method: "POST",
        token: true
    })
    if (!result.ok) {
        message.value = result.data.message
        for (const [key, value] of Object.entries(result.data)) {
            if (key === "message") continue
            errors.set(key, value)
        }
        return
    } 
    data.clear()
    emit('success')
}
</script>

<template>
    <Form type="post" name="post" :message>
        <template #inputs>
            <TextArea
                type="text" name="content" label="Content" placeholder="What's cooking?" 
                :initial="toRef(data.get('content') ?? '')" :errors
                @changed="handleChange"
            >
            </TextArea>
        </template>
        <template #buttons>
            <Button size="large" @clicked="handleSubmit">Cook</Button>
        </template>
    </Form>
</template>