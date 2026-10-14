// File: src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import showroomRoutes from "./showroom/presentation/showroom-routes.js";

/**
 * @summary Application router configuration with semantic routes and bounded-context child routes.
 * @author John Doe
 */
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
    { path: '/vehicle', name: 'vehicle', children: showroomRoutes },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to) => {
    const baseTitle = 'Astara Showroom Management';
    document.title = to.meta?.title ? `${baseTitle} - ${to.meta.title}` : baseTitle;
    return true;
});

export default router;