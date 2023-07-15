<template>
    <input
        v-model="modelValue"
        type="text"
        :placeholder="placeholder"
        autocomplete="false"
        inline-block
        p="x-32px y-16px"
        w="480px"
        text="center 32px"
        bg="transparent"
        border="~ solid rd gray-200 dark:gray-700"
        outline="none active:none"
    >
</template>

<script setup lang="ts">
const { value, placeholder } = defineProps<{
    value: string
    placeholder: string
}>()

const emit = defineEmits(['update:value'])

const modelValue = ref(value)
watchEffect(() => {
    emit('update:value', modelValue.value)
})
</script>
