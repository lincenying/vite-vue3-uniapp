<template>
    <div
        class="app" :class="{
            dark: isDark,
        }"
    >
        <main
            p="x-32px y-80px"
            font-sans text="center"
            color="gray-700 dark:gray-200"
        >
            <slot />
            <TheFooter />
            <div mx-auto mt-32px text-center text-sm opacity-50>
                [Home Layout]
            </div>
        </main>
    </div>
</template>
