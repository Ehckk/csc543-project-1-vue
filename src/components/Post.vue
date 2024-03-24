<script setup lang="ts">
import { fetchFromApi } from "@/api/base";
import LikeButton from "./LikeButton.vue"
import type { PostId, PostPartial, PostResponse } from '@/types';
import utils from '@/utils';

interface PostProps {
    post: PostPartial
}

const { post } = defineProps<PostProps>()

async function handleLiked() {
    const { post_id, has_liked } = post
    console.log(has_liked);
    
    const args = { token: true, values: { post_id } }
    let key: string
    let method: "POST" | "DELETE"
    if (!has_liked) {
        key = "add"
        method = "POST"
    } else {
        key = "remove"
        method = "DELETE"
    } 
    const resData = await fetchFromApi<PostId, PostResponse>({ endpoint: `likes/${key}`, method, ...args })
    if (!resData.ok) return
    post.has_liked = resData.data.has_liked
    post.likes = resData.data.likes
} 

</script>

<template>
    <div className="post">
        <span className="post-author">{{ post.author?.display_name }}</span>
        <p className="post-content">{{ post.content }}</p>
            <div className="post-engagement">
                <div className="likes">
                    <LikeButton :liked="post.has_liked" @liked="handleLiked"/>
                    <span className="like-count">{{ post.likes.length }}</span> 
                </div>
                <p>{{ utils.date.createdDate(post.created) }}</p>
            </div>
        </div>
</template>

<style>
.post {
    margin: .5rem 0;
    padding: 1rem;
    background-color: var(--l-2);
    box-shadow: 0 1px 3px var(--g-0);
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    gap: .25rem;
}

.post:first-of-type {
    margin-top: 1.5rem;
}

.post-partial {
    margin: .5rem 0;
}

.post-content {
    margin: .25rem 0;
    font-size: 1.25rem;
}

.post-engagement {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-interacts {
    display: flex;
    gap: 1rem;
}

.likes, .replies {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.like-count, .reply-count {
    margin-bottom: 0;
}
</style>