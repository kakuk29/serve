import { createWebHistory, createRouter } from "vue-router";
import home from "@/components/home.vue";

const routes = [
    { path: "/", component: home },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;