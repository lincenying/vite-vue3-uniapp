<template>
    <div flex="~ gap-4" mt-5 text-xl justify-center>
        <div title="Home" @click="useRouter.replace('/index')">
            <div i-carbon-campsite icon-btn />
        </div>

        <div icon-btn title="Toogle dark mode" @click="toggleDark()">
            <div i-carbon-sun dark:i-carbon-moon />
        </div>

        <div icon-btn title="GitHub" @click="useRouter.push('https://github.com/Ares-Chang/uni-vitesse')">
            <div i-carbon-logo-github />
        </div>
    </div>
</template>
