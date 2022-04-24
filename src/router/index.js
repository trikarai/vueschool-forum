import { createRouter, createWebHistory } from 'vue-router';
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
        path: '/forum/:id',
        name: 'Forum',
        component: Forum,
        props: true
    },
    {
        path: '/thread/:id',
        name: 'ThreadShow',
        component: ThreadShow,
        props: true
        // beforeEnter (to, from, next) {
        //   // check if thread exists
        //   const threadExists = findById(sourceData.threads, to.params.id)
        //   // if exists continue
        //   if (threadExists) {
        //     return next()
        //   } else {
        //     next({
        //       name: 'NotFound',
        //       params: { pathMatch: to.path.substring(1).split('/') },
        //       // preserve existing query and hash
        //       query: to.query,
        //       hash: to.hash
        //     })
        //   }
        //   // if doesnt exist redirect to not found
        // }
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
router.beforeEach(() => {
    store.dispatch('unsubscribeAllSnapshots')
})

export default router
