<script setup lang="ts">
import { DocumentData } from "@firebase/firestore";
import { User } from "firebase/auth";
import { toRefs } from "vue";

interface Props {
  message: DocumentData;
  user: User | null;
}

const props = withDefaults(defineProps<Props>(), {});

const { message } = toRefs(props);

const {
  user: { uid, photoURL, displayName },
  text,
  createdAt,
} = message.value;

const emit = defineEmits(["update:message"]);
</script>

<template>
  <div
    class="flex w-auto gap-4 px-4 py-3 rounded-md"
    :class="[uid === user?.uid ? 'bg-indigo-500' : 'bg-gray-100']"
  >
    <img
      :src="photoURL"
      :alt="displayName"
      class="rounded-full w-10 h-10 max-w-xs self-start"
    />

    <div class="space-y-0.5">
      <h3
        class="font-semibold"
        :class="[uid === user?.uid ? 'text-white' : 'text-gray-900']"
      >
        {{ displayName }}

        &middot;

        <span
          class="text-xs font-normal"
          :class="[uid === user?.uid ? 'text-gray-50' : 'text-gray-600']"
        >
          {{ new Date(createdAt?.seconds).toLocaleTimeString() }}
        </span>
      </h3>
      <p :class="[uid === user?.uid ? 'text-white' : 'text-gray-900']">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>