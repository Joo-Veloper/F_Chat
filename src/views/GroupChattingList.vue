<template>
    <v-container class="chat-container">
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="chat-card">
                    <v-card-title class="d-flex justify-space-between align-center text-h5 font-weight-bold">
                        채팅방 목록
                        <v-btn class="chat-create-btn" @click="showCreatedRoomModal = true">
                            채팅방 생성
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="custom-table">
                            <thead>
                                <tr>
                                    <th>방번호</th>
                                    <th>방제목</th>
                                    <th class="text-center">채팅</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="chat in chatRoomList" :key="chat.roomId" class="table-row">
                                    <td>{{ chat.roomId }}</td>
                                    <td>{{ chat.roomName }}</td>
                                    <td class="text-center">
                                        <v-btn class="chat-button" @click="joinChatRoom(chat.roomId)">
                                            참여하기
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="showCreatedRoomModal" max-width="400px">
            <v-card class="modal-card">
                <v-card-title class="text-h6 font-weight-bold">
                    채팅방 생성
                </v-card-title>
                <v-card-text>
                    <v-text-field label="방제목" v-model="newRoomTitle" outlined dense />
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn color="grey" @click="showCreatedRoomModal = false">
                        취소
                    </v-btn>
                    <v-btn class="chat-button" @click="createChatRoom">
                        생성
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import "@/css/GroupChatList.css";
export default {
    data() {
        return {
            chatRoomList: [],
            showCreatedRoomModal: false,
            newRoomTitle: "",
        }
    },
    async created() {
        this.loadChatRoom();
    },
    methods: {
        async joinChatRoom(roomId) {
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/chat/room/group/${roomId}/join`);
            this.$router.push(`/chatpage/${roomId}`);
        },
        async createChatRoom() {
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/chat/room/group/create?roomName=${this.newRoomTitle}`, null);
            this.showCreatedRoomModal = false;
            this.loadChatRoom();
        },
        async loadChatRoom() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/chat/room/group/list`)
            this.chatRoomList = response.data;
        }
    }
}
</script>