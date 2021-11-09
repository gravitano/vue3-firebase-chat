<script setup lang="ts">
import { User } from "@firebase/auth";
import { DocumentData } from "firebase/firestore";
import { nextTick, ref, toRefs, watch } from "vue";

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
</template>

<style scoped>
</style>