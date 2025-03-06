<template>
    <v-container class="chat-container">
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="chat-card">
                    <v-card-title class="text-center text-h5 font-weight-bold">
                        내 채팅 목록
                    </v-card-title>
                    <v-card-text>
                        <v-table class="custom-table">
                            <thead>
                                <tr>
                                    <th>채팅방 이름</th>
                                    <th>읽지 않은 메시지</th>
                                    <th class="text-center">액션</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="chat in chatList" :key="chat.roomId" class="table-row">
                                    <td>{{ chat.roomName }}</td>
                                    <td>
                                        <v-chip v-if="chat.unReadCount > 0" class="unread-chip">
                                            {{ chat.unReadCount }}
                                        </v-chip>
                                        <span v-else>-</span>
                                    </td>
                                    <td class="text-center">
                                        <v-btn class="chat-button" @click="enterChatRoom(chat.roomId)">
                                            입장하기
                                        </v-btn>
                                        <v-btn class="leave-button" :disabled="chat.isGroupChat === 'N'"
                                            @click="leaveChatRoom(chat.roomId)">
                                            나가기
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import axios from 'axios';
import '@/css/MyChatPage.css'

export default {
    data() {
        return {
            chatList: []
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/chat/my/rooms`)
        this.chatList = response.data;
    },
    methods: {
        enterChatRoom(roomId) {
            this.$router.push(`/chatpage/${roomId}`)
        },
        async leaveChatRoom(roomId) {
            await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/chat/room/group/${roomId}/leave`)
            this.chatList = this.chatList.filter(chat => chat.roomId !== roomId);
        }
    }
}
</script>