import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
	const count = ref<number>(0)
	const increase = () => {
		count.value += 1
	}

	return { count, increase }
})
