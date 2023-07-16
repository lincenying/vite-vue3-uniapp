<template>
    <div class="app layout-img" :class="{ dark: isDark }">
        <view class="status_bar" :style="`height: ${statusHeight}px; width: 100%;`" />
        <slot />
    </div>
</template>
