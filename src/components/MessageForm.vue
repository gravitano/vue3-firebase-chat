<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const chat = ref("");

const onSubmit = () => emit("submit", chat);
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
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
      @keydown.enter.prevent="onSubmit"
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
</template>

<style scoped>
</style>