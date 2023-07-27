<template>
    <div class="layout-img wrap wrap-tab UserRouter" :class="{ dark: isDark }">
        <title-bar title="我的" :show-back="false" />
        <div p-24px>4444</div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'UserRouter',
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
