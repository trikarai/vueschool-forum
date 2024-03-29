import { createApp } from 'vue'
import App from './App.vue'

import store from '@/store'
import router from '@/router'
import firebase from 'firebase'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutsideDirective from "@/plugins/ClickOutsideDirective"
import PageScrollDirective from "@/plugins/PageScrollDirective"
import Vue3Pagination from '@/plugins/Vue3Pagination'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)

forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.use(Vue3Pagination)

const requireComponent = require.context("./components", true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig
    const baseComponentName = baseComponentConfig.name || (
        fileName
            .replace(/^.+\//, '')
            .replace(/\.\w+$/, '')
    )
    forumApp.component(baseComponentName, baseComponentConfig)
})

forumApp.mount('#app')
