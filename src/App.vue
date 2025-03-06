<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <router-view />
      <v-container v-if="$route.path === '/'" fluid class="hero-section">
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="display-2 font-weight-bold">Welcome to TalkHaven</h1>
            <p class="subtitle-1 mt-3">실시간 채팅이 가능한 자유로운 소통 공간</p>
            <v-btn color="primary" class="mt-5" large :to="{ path: '/member/signup' }">회원가입</v-btn>
            <v-btn color="secondary" class="mt-5 ml-3" large @click="handleLogin">로그인</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="$route.path === '/'" class="mt-10">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>1:1 채팅</v-card-title>
              <v-card-text>친구들과 1:1로 대화해보세요!</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>그룹 채팅</v-card-title>
              <v-card-text>다양한 사람들과 함께 소통하세요!</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>실시간 알림</v-card-title>
              <v-card-text>새로운 메시지를 놓치지 마세요!</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  methods: {
    handleLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        alert("이미 로그인되어 있습니다.");
      } else {
        this.$router.push('/login');
      }
    }
  }
}

</script>

<style></style>