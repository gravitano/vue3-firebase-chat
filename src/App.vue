<script setup lang="ts">
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, useAuth, useChat } from "./firebase";

const { signIn, isLogin, user, logout } = useAuth();
const { messages, sendMessage } = useChat();

const chat = ref("");
const sendChat = async () => {
  await sendMessage(chat.value);
  chat.value = "";
};
</script>

<template>
  <div v-if="isLogin">
    {{ user?.displayName }}
    <button @click="logout">Sign out</button>
  </div>
  <button v-else @click="signIn">Sign in</button>

  <!-- <pre> {{ messages }} </pre> -->
  <div
    v-for="({ text, user: { photoURL, displayName } }, index) in messages"
    :key="index"
  >
    {{ displayName }}
    <img :src="photoURL" :alt="photoURL" />
    {{ text }}
  </div>

  <form @submit.prevent="sendChat">
    <textarea v-model="chat" placeholder="Type something"></textarea>

    <button type="submit">Send</button>
  </form>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
