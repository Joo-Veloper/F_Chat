<template>
    <v-app-bar app dark>
        <v-container>
            <v-row align="center">
                <v-col class="d-flex justify-start">
                    <v-btn @click="navigateTo('/member/list')">
                        회원목록
                    </v-btn>
                    <v-btn @click="navigateTo('/groupchatting/list')">
                        채팅방목록
                    </v-btn>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="{ path: '/' }">TalkHaven</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{ path: '/my/chat/page' }">
                        MyChatPage
                    </v-btn>
                    <v-btn v-if="!isLogin" :to="{ path: '/member/signup' }">
                        회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{ path: '/login' }">
                        로그인
                    </v-btn>
                    <v-btn v-if="isLogin" @click="doLogout">
                        로그아웃
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            isLogin: false,
        }
    },

    created() {
        const token = localStorage.getItem("token");
        if (token) {
            this.isLogin = true;
        }
    },

    methods: {
        doLogout() {
            localStorage.clear();
            alert("로그아웃 되었습니다.");
            this.$router.push("/");
            window.location.reload();
        },
        navigateTo(path) {
            if (!this.isLogin) {
                alert("로그인이 필요합니다.");
            } else {
                this.$router.push(path);
            }
        }
    }
}
</script>