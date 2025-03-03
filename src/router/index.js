import { createRouter, createWebHashHistory } from "vue-router";
import MemberCreate from "@/views/MemberCreate.vue";
import LoginPage from "@/views/LoginPage.vue";
import MemberList from "@/views/MemberList.vue";
import ChatPage from "@/views/ChatPage.vue";
import GroupChattingList from "@/views/GroupChattingList.vue";

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
  },
  {
    path: "/chatpage/:roomId",
    name: "ChatPage",
    component: ChatPage,
  },
  {
    path: "/groupchatting/list",
    name: "GroupChattingList",
    component: GroupChattingList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
