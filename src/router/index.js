import { createRouter, createWebHistory } from 'vue-router';
import sourceData from '@/data/data.json'
import { findById } from '@/helpers'

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
const NotFound = () =>
    import(
    /* webpackChunkName: "App" */ "@/pages/NotFound"
    );

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: '/me',
        name: 'Profile',
        component: Profile,
        meta: { toTop: true, smoothScroll: true }
    },
    {
        path: '/me/edit',
        name: 'ProfileEdit',
        component: Profile,
        props: { edit: true }
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: Category,
        props: true
    },
    {
        path: "/forum/:id",
        name: "Forum",
        component: Forum,
        props: true
    },
    {
        path: "/thread/:id",
        name: "ThreadShow",
        component: ThreadShow,
        props: true,
        beforeEnter(to, from, next) {
            const threadExists = findById(sourceData.threads, to.params.id)
            if (threadExists) {
                return next()
            } else {
                next({
                    name: 'NotFound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    query: to.query,
                    hash: to.hash
                })

            }
        }
    },
    {
        path: '/forum/:forumId/thread/create',
        name: 'ThreadCreate',
        component: ThreadCreate,
        props: true
    },
    {
        path: '/thread/:id/edit',
        name: 'ThreadEdit',
        component: ThreadEdit,
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        props: true
    }
]


export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        const scroll = {}
        if (to.meta.toTop) scroll.top = 0
        if (to.meta.smoothScroll) scroll.behavior = 'smooth'
        return scroll
    }
})
