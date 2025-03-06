<template>
    <v-container class="login-container">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="login-card">
                    <v-card-title class="text-h5 text-center font-weight-bold">로그인</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field label="이메일" v-model="email" type="email" required outlined dense
                                prepend-inner-icon="mdi-email"></v-text-field>

                            <v-text-field label="비밀번호" v-model="pw" type="password" required outlined dense
                                prepend-inner-icon="mdi-lock"></v-text-field>

                            <v-btn type="submit" class="login-button" block>로그인</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '@/css/LoginPage.css'

export default {
    data() {
        return {
            email: "",
            pw: "",
        }
    },
    methods: {
        async doLogin() {
            const loginData = {
                email: this.email,
                pw: this.pw
            }
            const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/login`, loginData);
            const token = response.data.token;
            const role = jwtDecode(token).role;
            const email = jwtDecode(token).sub;
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
            localStorage.setItem("email", email)
            window.location.href = "/";
        }
    }

}

</script>
