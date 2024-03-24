<script setup lang="ts">
import type { PostPartial } from "@/types";
import { reactive, ref } from "vue";
import { fetchFromApi } from "@/api/base";
import HomeLayout from "@/layouts/HomeLayout.vue";
import Post from "@/components/Post.vue"
import PostForm from "@/forms/PostForm.vue"

async function fetchPosts() {
    const resData = await fetchFromApi<PostPartial[], PostPartial[]>({
        endpoint: "posts",
        method: "GET",
        token: true
    })
    if (!resData.ok) return [] as PostPartial[]
    return resData.data
}

const posts = ref(await fetchPosts())
const data = ref(new Map<string, string>)

async function handleSuccess() {    
    await handleUpdate()
    data.value.clear()
}

async function handleUpdate() {
    posts.value = await fetchPosts()
}
</script>

<template>
    <HomeLayout>
        <div className="timeline">
            <header className="timeline-header">
                <h1>Posts 🍽</h1>
            </header>
            <PostForm :data @success="handleSuccess"/>
            <template v-for="post in posts" :key="post.post_id">
                <Post :post="reactive(post)"/>
            </template>
        </div>
    </HomeLayout>
</template>

<style>
.timeline-header {
    position: sticky;
    background-color: var(--l-2);
    padding: .5rem;
    border-radius: .5rem;
    top: 0;
    box-shadow: 0 1px 3px var(--g-0);
}
</style>