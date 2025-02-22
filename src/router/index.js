import { createRouter, createWebHashHistory } from "vue-router";
import MemberCreate from "@/views/MemberCreate.vue";

const routes = [
  {
    path: "/member/signup",
    name: "MemberCreate",
    component: MemberCreate,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
