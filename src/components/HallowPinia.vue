<script lang='ts' setup>
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
</script>

<template>
	<div>{{ globalStore.count }}</div>
	<button @click="globalStore.increase">click</button>
</template>

<style lang='less' scoped>
</style>
