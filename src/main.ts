import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import 'uno.css'

export function createApp() {
    const app = createSSRApp(App)
    const head = createHead()

    app.use(Pinia.createPinia()).use(head)
    return {
        app,
        Pinia,
    }
}
