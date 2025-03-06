<template>
    <v-container class="chat-container">
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="chat-card">
                    <v-card-title class="text-center text-h5 font-weight-bold">
                        회원 목록
                    </v-card-title>
                    <v-card-text>
                        <v-table class="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>이름</th>
                                    <th>Email</th>
                                    <th class="text-center">채팅</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in memberList" :key="member.id" class="table-row">
                                    <td>{{ member.id }}</td>
                                    <td>{{ member.name }}</td>
                                    <td>{{ member.email }}</td>
                                    <td class="text-center">
                                        <v-btn class="chat-button" @click="startChat(member.id)">
                                            채팅하기
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
import '@/css/MemberList.css';

export default {
    data() {
        return {
            memberList: []
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`)
        this.memberList = response.data;
    },
    methods: {
        async startChat(otherMemberId) {
            const loggedInUserId = localStorage.getItem("userId");

            if (parseInt(loggedInUserId) === otherMemberId) {
                alert("본인과는 채팅할 수 없습니다.");
                return;
            }

            try {
                const response = await axios.post(
                    `${process.env.VUE_APP_API_BASE_URL}/chat/room/private/create?otherMemberId=${otherMemberId}`
                );
                const roomId = response.data;
                this.$router.push(`/chatpage/${roomId}`);
            } catch (error) {
                console.error("채팅방 생성 오류:", error);
                alert("본인과 채팅은 불가능합니다..");
            }
        }
    }
}
</script>
