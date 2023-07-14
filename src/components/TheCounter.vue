<template>
    <div flex items-center justify-center gap-64px>
        <div class="count-btn" @click="counter.dec()">
            -
        </div>
        <span font-mono>{{ counter.count }}</span>
        <div class="count-btn" @click="counter.inc()">
            +
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/counter'

const counter = useCounterStore()
</script>

<style lang="scss" scoped>
.count-btn {
    --uno: h-64px w-64px center rd-full p-0 btn;
}
</style>
