<template>
    <div class="layout-img wrap wrap-tab BoxRouter" :class="{ dark: isDark }">
        <title-bar title="盒柜" :show-back="false" />
        <div p-24px>2222</div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BoxRouter',
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
