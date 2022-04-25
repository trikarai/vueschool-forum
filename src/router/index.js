/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router';
import { findById } from '@/helpers'
import store from '@/store'

const Home = () =>
    import(
    /* webpackChunkName: "Home" */ "@/pages/Home"
    );
const Forum = () =>
    import(
    /* webpackChunkName: "Forum" */ "@/pages/Forum"
    );
const Profile = () =>
    import(
    /* webpackChunkName: "Profile " */ "@/pages/Profile"
    );
const Category = () =>
    import(
    /* webpackChunkName: "Category " */ "@/pages/Category"
    );
const ThreadCreate = () =>
    import(
    /* webpackChunkName: "Thread" */ "@/pages/ThreadCreate"
    );
const ThreadEdit = () =>
    import(
    /* webpackChunkName: "Thread" */ "@/pages/ThreadEdit"
    );
const ThreadShow = () =>
    import(
    /* webpackChunkName: "Thread" */ "@/pages/ThreadShow"
    );
const Register = () =>
    import(
    /* webpackChunkName: "Auth" */ "@/pages/Register"
    );
const SignIn = () =>
    import(
    /* webpackChunkName: "Auth" */ "@/pages/SignIn"
    );
const NotFound = () =>
    import(
    /* webpackChunkName: "App" */ "@/pages/NotFound"
    );

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/me',
        name: 'Profile',
        component: Profile,
        meta: { toTop: true, smoothScroll: true },
    },
    {
        path: '/me/edit',
        name: 'ProfileEdit',
        component: Profile,
        props: { edit: true },
        meta: { requiresAuth: true }
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: Category,
        props: true
    },
    {
        path: '/forum/:id',
        name: 'Forum',
        component: Forum,
        props: true
    },
    {
        path: '/thread/:id',
        name: 'ThreadShow',
        component: ThreadShow,
        props: true,
        async beforeEnter(to, from, next) {
            await store.dispatch('fetchThread', { id: to.params.id })
            // check if thread exists
            const threadExists = findById(store.state.threads, to.params.id)
            // if exists continue
            if (threadExists) {
                return next()
            } else {
                next({
                    name: 'NotFound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    // preserve existing query and hash
                    query: to.query,
                    hash: to.hash
                })
            }
            // if doesnt exist redirect to not found
        }
    },
    {
        path: '/forum/:forumId/thread/create',
        name: 'ThreadCreate',
        component: ThreadCreate,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/thread/:id/edit',
        name: 'ThreadEdit',
        component: ThreadEdit,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/logout',
        name: 'SignOut',
        async beforeEnter(to, from) {
            await store.dispatch('signOut')
            return { name: 'Home' }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        const scroll = {}
        if (to.meta.toTop) scroll.top = 0
        if (to.meta.smoothScroll) scroll.behavior = 'smooth'
        return scroll
    }
})
router.beforeEach(async (to, from) => {
    await store.dispatch('initAuthentication')
    console.log(`🚦 navigating to ${to.name} from ${from.name}`)
    store.dispatch('unsubscribeAllSnapshots')
    if (to.meta.requiresAuth && !store.state.authId) {
        return { name: 'Home' }
    }
})

export default router
