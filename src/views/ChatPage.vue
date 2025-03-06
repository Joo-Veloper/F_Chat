<template>
    <v-container class="chat-container">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="elevation-3 rounded-xl chat-card">
                    <v-card-title class="text-center text-h5 font-weight-bold bg-yellow text-dark py-4">
                        TALK
                    </v-card-title>
                    <v-card-text class="chat-box pa-4">
                        <div v-for="(msg, index) in messages" :key="index"
                            :class="['chat-message', msg.senderEmail === senderEmail ? 'sent' : 'received']">
                            <p class="message-sender">{{ getUsername(msg.senderEmail) }}</p>
                            <p class="message-text">{{ msg.message }}</p>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="pa-3 d-flex align-center chat-input-area">
                        <v-text-field v-model="newMessage" variant="solo" density="comfortable" hide-details
                            class="flex-grow-1 chat-input" @keyup.enter="sendMessage"></v-text-field>
                        <v-btn color="primary" @click="sendMessage" elevation="2" class="ml-2 send-btn">
                            전송
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import "@/css/chat.css";
import axios from 'axios';

export default {
    data() {
        return {
            messages: [],
            newMessage: "",
            stompClient: null,
            token: "",
            senderEmail: null,
            roomId: null,
        }
    },
    async created() {
        this.senderEmail = localStorage.getItem("email");
        this.roomId = this.$route.params.roomId;
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/chat/history/${this.roomId}`);
        this.messages = response.data;
        this.connectWebsocket();
    },
    // 현재 라우트에서 다른 라우트 이동 훅 함수
    beforeRouteLeave(to, from, next) {
        this.disconnectWebSocket();
        next();
    },
    //화면을 껐을때
    beforeUnmount() {
        this.disconnectWebSocket();
    },
    methods: {
        getUsername(email) {
            return email.split('@')[0]; // '@' 앞부분만 반환
        },
        connectWebsocket() {
            if (this.stompClient && this.stompClient.connected) return;
            const sockJs = new SockJS(`${process.env.VUE_APP_API_BASE_URL}/connect`)
            this.stompClient = Stomp.over(sockJs);
            this.token = localStorage.getItem("token");
            this.stompClient.connect({
                Authorization: `Bearer ${this.token}`
            },
                () => {
                    this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
                        const parseMessage = JSON.parse(message.body);
                        this.messages.push(parseMessage);
                        this.scrollToBottom();
                    }, { Authorization: `Bearer ${this.token}` })
                }
            )
        },
        sendMessage() {
            if (this.newMessage.trim() === "") return;
            const message = {
                senderEmail: this.senderEmail,
                message: this.newMessage
            }
            this.stompClient.send(`/publish/${this.roomId}`, JSON.stringify(message));
            this.newMessage = ""
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatBox = this.$el.querySelector(".chat-box");
                chatBox.scrollTop = chatBox.scrollHeight;
            })
        },
        async disconnectWebSocket() {
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/chat/room/${this.roomId}/read`);
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.unsubscribe(`/topic/${this.roomId}`);
                this.stompClient.disconnect();
            }
        }
    },
}
</script>
