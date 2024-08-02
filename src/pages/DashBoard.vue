<script lang='ts' setup>
import HallowPinia from '@/components/HallowPinia.vue'
</script>

<template>
	<div class="dashboard__wrapper">
		<HallowPinia />
	</div>
</template>

<style lang='scss' scoped>
.dashboard__wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
</style>
