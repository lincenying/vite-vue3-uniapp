<script setup lang="ts">
onLaunch(async () => {
    const userStore = useUserStore()
    const token = ls.get<string>('token') || ''
    if (token)
        await userStore.getUserInfo()
})
</script>

<style lang="scss">
@import '@tuniao/tn-style/dist/uniapp/index.css';
@import './assets/scss/style.scss';
</style>
