<template>
    <div class="app layout-gray" :class="{ dark: isDark }">
        <view class="status_bar" :style="`height: ${statusHeight}px; width: 100%;`" />
        <slot />
    </div>
</template>
