import { createWebHistory, createRouter } from "vue-router";
import home from "@/components/home.vue";
import login from "@/components/login.vue";
import register from "@/components/register.vue";
import liste from "@/components/liste.vue";


const routes = [
    { path: "/", component: home },
    { path: "/login", component: login },
    { path: "/register", component: register },
    { path: "/liste", component: liste }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;