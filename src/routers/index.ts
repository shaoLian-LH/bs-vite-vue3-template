import { configs } from './configs'
import { createRouter, createWebHistory } from "vue-router";
import { patchBeforeEach } from './decoration'

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes: configs,
});

patchBeforeEach(router)

export default router;
