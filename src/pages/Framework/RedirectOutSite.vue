<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { ElResult, ElButton } from 'element-plus';
import { useRoute } from "vue-router";

const targetLink = ref("");
const subTitle = computed(() => {
	return `您即将离开本站，并前往：${targetLink.value}。请注意链接是否安全。`;
});

onMounted(() => {
	const route = useRoute();
	targetLink.value = (route.query.target || "").toString();
});

// 重定向到站外
const redirectTo = () => {
	window.open(targetLink.value, "_blank", "noopener,noreferrer");
	window.close();
};
</script>


<template>
  <div class="redirect-out-side">
    <ElResult
      icon="warning"
      title="即将跳转到站外"
      :sub-title="subTitle"
    >
      <template #extra>
        <router-link to="/">
          <ElButton
            type="primary"
            size="medium"
            @click="redirectTo"
          >
            确认前往
          </ElButton>
        </router-link>
      </template>
    </ElResult>
  </div>
</template>

<style lang="scss">
.redirect-out-side {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
