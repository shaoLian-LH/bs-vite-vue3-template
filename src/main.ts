import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import appRouter from "./routers";
import './reset.css'

createApp(App)
	.use(createPinia())
	.use(appRouter)
	.mount('#app')
