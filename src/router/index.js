import { createRouter, createWebHashHistory } from "vue-router";
import MemberCreate from "@/views/MemberCreate.vue";
import LoginPage from "@/views/LoginPage.vue";
import MemberList from "@/views/MemberList.vue";
import ChatPage from "@/views/ChatPage.vue";
import GroupChattingList from "@/views/GroupChattingList.vue";
import MyChatPage from "@/views/MyChatPage.vue";

const routes = [
  {
    path: "/member/signup",
    name: "MemberCreate",
    component: MemberCreate,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/member/list",
    name: "MemberList",
    component: MemberList,
    meta: { requiresAuth: true },
  },
  {
    path: "/chatpage/:roomId",
    name: "ChatPage",
    component: ChatPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/groupchatting/list",
    name: "GroupChattingList",
    component: GroupChattingList,
    meta: { requiresAuth: true },
  },
  {
    path: "/my/chat/page",
    name: "MyChatPage",
    component: MyChatPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isLogin) {
    alert("로그인이 필요합니다.");
    next("/login");
  } else {
    next();
  }
});

export default router;
