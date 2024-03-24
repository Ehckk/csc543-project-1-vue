import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TimelineView from '@/views/TimelineView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
  	routes: [
		{
			path: '/',
			redirect: '/posts'
		},
		{
			path: '/posts',
			name: 'home',
			component: TimelineView
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView
		}
	]
})

export default router
