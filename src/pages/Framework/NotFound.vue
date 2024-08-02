<script lang="ts" setup>
import { ElResult, ElButton } from 'element-plus'
</script>

<template>
  <ElResult
    icon="warning"
    title="404"
    sub-title="访问的页面不存在"
  >
    <template #extra>
      <router-link to="/">
        <ElButton type="primary">
          返回到首页
        </ElButton>
      </router-link>
    </template>
  </ElResult>
</template>
