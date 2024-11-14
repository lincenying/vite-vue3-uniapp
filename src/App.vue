<script setup lang="ts">
import '@tuniao/tn-style/dist/uniapp/index.css'
import './assets/scss/global/global.scss'
import './assets/scss/style.scss'

onLaunch(async () => {
    const userStore = useUserStore()
    const token = ls.get<string>('token') || ''
    if (token) {
        await userStore.getUserInfo()
    }
})
</script>
