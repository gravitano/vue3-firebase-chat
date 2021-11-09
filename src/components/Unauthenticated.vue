<script setup lang="ts">
const emit = defineEmits(["signin"]);

const signIn = () => emit("signin");
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1 text-gray-800">
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
</template>

<style scoped>
</style>