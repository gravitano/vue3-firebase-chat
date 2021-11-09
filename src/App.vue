<script setup lang="ts">
import { collection, getDocs } from "firebase/firestore";
import { nextTick, onMounted, ref, watch } from "vue";
import { db, useAuth, useChat } from "./firebase";

const { signIn, isLogin, user, logout } = useAuth();
const { messages, sendMessage } = useChat();

const scrollBox = ref<HTMLDivElement | null>(null);
const chat = ref("");
const sendChat = async () => {
  await sendMessage(chat.value);
  chat.value = "";
};

watch(
  messages,
  () => {
    nextTick(() => {
      scrollBox.value?.scrollIntoView({ behavior: "smooth" });
    });
  },
  { deep: true }
);
</script>

<template>
  <div class="py-4 px-4 sm:px-0 bg-indigo-500 text-white sticky top-0">
    <div class="container mx-auto flex justify-between">
      <a class="font-bold">Vue 3 Firebase Chat</a>
      <div v-if="isLogin" class="space-x-4">
        <span class="font-semibold">
          {{ user?.displayName }}
        </span>
        <button @click="logout">Sign out</button>
      </div>
      <button v-else @click="signIn">Sign in</button>
    </div>
  </div>

  <div class="container mx-auto py-4 px-4 sm:px-0">
    <div v-if="isLogin" class="h-[calc(100vh-100px)] flex flex-col">
      <h1 class="text-2xl font-bold mb-5 text-gray-900">Let's Chat!</h1>
      <hr class="mb-5" />

      <div
        class="overflow-y-auto mb-1 py-4 px-2 rounded-md flex-grow space-y-4"
      >
        <div
          v-for="(
            { text, user: { uid, photoURL, displayName }, createdAt }, index
          ) in messages"
          :key="index"
          class="flex w-auto gap-4 px-4 py-3 rounded-md"
          :class="[uid === user?.uid ? 'bg-gray-100' : 'bg-indigo-500']"
        >
          <img
            :src="photoURL"
            :alt="displayName"
            class="rounded-full w-10 h-10 max-w-xs self-start"
          />

          <div class="space-y-0.5">
            <h3
              class="font-semibold"
              :class="[uid === user?.uid ? 'text-gray-900' : 'text-white']"
            >
              {{ displayName }}

              &middot;

              <span
                class="text-xs font-normal"
                :class="[uid === user?.uid ? 'text-gray-600' : 'text-gray-50']"
              >
                {{ new Date(createdAt?.seconds).toLocaleTimeString() }}
              </span>
            </h3>
            <p :class="[uid === user?.uid ? 'text-gray-900' : 'text-white']">
              {{ text }}
            </p>
          </div>
        </div>
        <div ref="scrollBox"></div>
      </div>

      <form @submit.prevent="sendChat" class="flex flex-col gap-4">
        <textarea
          v-model="chat"
          placeholder="Type something"
          class="
            border
            w-full
            rounded-md
            px-4
            py-3
            transition
            duration-300
            focus:outline-none focus:border-indigo-500
          "
          @keydown.enter.prevent="sendChat"
        ></textarea>

        <button
          type="submit"
          class="
            px-4
            py-3
            bg-indigo-500
            hover:bg-indigo-600
            transition
            duration-300
            rounded-md
            text-white
            w-full
            disabled:bg-gray-300 disabled:cursor-not-allowed
          "
          :disabled="!chat"
        >
          Send
        </button>
      </form>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold mb-1 text-gray-900">
        Welcome to Vue 3 Firebase Chat!
      </h1>
      <p class="text-gray-700 mb-5">Please login to start chat</p>

      <button
        type="submit"
        class="
          px-4
          py-3
          bg-indigo-500
          hover:bg-indigo-600
          transition
          duration-300
          rounded-md
          text-white
          w-full
          disabled:bg-gray-300 disabled:cursor-not-allowed
        "
        @click="signIn"
      >
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<style>
</style>
