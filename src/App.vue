<script setup lang="ts">
import { Ref } from "vue";
import { useAuth, useChat } from "./firebase";
import Navbar from "./components/Navbar.vue";
import Unauthenticated from "./components/Unauthenticated.vue";
import MessageList from "./components/MessageList.vue";
import MessageForm from "./components/MessageForm.vue";

const { signIn, isLogin, user, logout } = useAuth();
const { messages, sendMessage } = useChat();

const sendChat = async (text: Ref<string>) => {
  await sendMessage(text.value);
  text.value = "";
};
</script>

<template>
  <Navbar :user="user" :is-login="isLogin" @logout="logout" @signin="signIn" />

  <div class="container mx-auto py-4 px-4 sm:px-0">
    <div v-if="isLogin" class="h-[calc(100vh-100px)] flex flex-col">
      <h1 class="text-2xl font-bold mb-1 text-gray-800">Let's Chat!</h1>
      <p class="text-gray-700 mb-5">Start sending message to everyone</p>

      <hr class="mb-5" />

      <MessageList :messages="messages" :user="user" />

      <MessageForm @submit="sendChat" />
    </div>
    <Unauthenticated v-else @signin="signIn" />
  </div>
</template>

<style>
</style>
