<template>
    <div>
        <div my-48px flex justify-center>
            <image h-112px w-112px :src="logo" />
            <div
                text="4xl gray4" m="x-32px y-auto"
                i-carbon-add transform transition-all-500 hover:rotate-135
            />
            <div i-carbon-campsite inline-block text-5xl />
        </div>
        <p my-16px>
            <span cursor-pointer @click="router.push('https://github.com/Ares-Chang/uni-vitesse')">Uni Vitesse</span>
        </p>
        <p>
            <em text-sm italic op75>Opinionated Vite Starter Template</em>
        </p>
    </div>
</template>

<script setup lang="ts">
import logo from '~/assets/logo.png'
</script>
