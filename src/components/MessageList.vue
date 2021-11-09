<script setup lang="ts">
import { User } from "@firebase/auth";
import { DocumentData } from "firebase/firestore";
import { nextTick, ref, toRefs, watch } from "vue";
import MessageItem from "./MessageItem.vue";

interface Props {
  user: User | null;
  messages: DocumentData[];
}

const props = withDefaults(defineProps<Props>(), {
  messages: () => [],
});

const { messages } = toRefs(props);

const emit = defineEmits(["update:messages"]);

const scrollBox = ref<HTMLDivElement | null>(null);

watch(
  messages,
  () => {
    nextTick(() => {
      scrollBox.value?.scrollIntoView({ behavior: "smooth" });
    });
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="overflow-y-auto mb-1 py-4 px-2 rounded-md flex-grow space-y-4">
    <MessageItem
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :user="user"
    />
    <div ref="scrollBox"></div>
  </div>
</template>

<style scoped>
</style>