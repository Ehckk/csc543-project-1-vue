import type { Post } from "./Post"

interface ApiResponse {
    message: string
}

interface Token extends ApiResponse {
    access: string
}

type FormErrors<Data> = {
    [key in keyof Data]: string
}

type ActionData<Data> = FormErrors<Data> | ApiResponse | undefined

interface ApiArgs<Req> {
    values?: Req
    endpoint: string
    method: "GET" | "POST" | "DELETE"
    token?: boolean
}

interface PostResponse extends Post, ApiResponse {}

export type {
    ApiResponse,
    ApiArgs,
    PostResponse,
    FormErrors,
    ActionData,
    Token
}