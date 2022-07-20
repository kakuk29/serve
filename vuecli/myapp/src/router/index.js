import { createWebHistory, createRouter } from "vue-router";
import moncompo01 from "@/components/monCompo01.vue";
import moncompo02 from "@/components/monCompo02.vue";
import home from "@/components/home.vue";

const routes = [
    { path: "/", component: home },
    { path: "/monCompo01",name: "monCompo01" ,component: moncompo01 },
    { path: "/monCompo02", name: "monCompo02", component: moncompo02 },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;