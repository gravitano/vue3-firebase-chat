<script setup lang="ts">
import { User } from "@firebase/auth";

interface Props {
  isLogin?: boolean;
  user?: User | null;
}

const props = withDefaults(defineProps<Props>(), {
  isLogin: false,
});

const emit = defineEmits(["logout", "signin"]);

const onSignIn = () => emit("signin");
const onLogout = () => emit("logout");
</script>

<template>
  <div class="py-4 px-4 sm:px-0 bg-indigo-500 text-white sticky top-0">
    <div class="container mx-auto flex justify-between">
      <a class="font-bold">Vue 3 Firebase Chat</a>
      <div v-if="isLogin" class="space-x-4">
        <span class="font-semibold">
          {{ user?.displayName }}
        </span>
        <button @click="onLogout">Sign out</button>
      </div>
      <button v-else @click="onSignIn">Sign in</button>
    </div>
  </div>
</template>

<style scoped>
</style>