<template>
  <div class="flex flex-col w-[35rem] h-[27rem] bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
    <!-- Картинка -->
    <img
      :src="photo"
      alt="Club photo"
      class="w-full h-[16rem] object-cover"
    />

    <!-- Контент -->
    <div class="flex flex-col justify-between h-full p-4 pt-3">
      <!-- Верх: заголовок + автор -->
      <div class="flex justify-between items-start mb-2">
        <h1 class="text-xl font-bold text-gray-900 leading-snug break-words max-w-[60%]">
          {{ title }}
        </h1>
        <p class="text-sm text-gray-500 text-right font-medium truncate max-w-[40%]">
          👤 {{ formattedCreatedBy }}
        </p>
      </div>

      <!-- Теги -->
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Описание -->
      <div class="flex-1 overflow-auto invisible-scrollbar mb-3">
        <p class="text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
          {{ description }}
        </p>
      </div>

      <!-- Низ: кнопка + даты -->
      <div class="flex justify-between items-end">
        <ButtonView :link="`/clubs/${id}`" />
        <div class="text-xs text-gray-500 text-right space-x-1">
          <span>{{ formattedCreatedOn }}</span>
          <span>/</span>
          <span>{{ formattedUpdatedOn }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonView from "./ButtonView.vue";
import { computed } from "vue";

const props = defineProps({
  id: Number,
  photo: String,
  title: String,
  description: String,
  createdOn: String,
  updatedOn: String,
  createdBy: [String, Object],
  tags: {
    type: Array,
    default: () => ["Sample", "Tech", "Music"], // заглушки
  },
});

const formattedCreatedOn = computed(() =>
  props.createdOn
    ? new Date(props.createdOn)
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", "")
    : ""
);

const formattedUpdatedOn = computed(() =>
  props.updatedOn
    ? new Date(props.updatedOn)
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", "")
    : ""
);

const formattedCreatedBy = computed(() => {
  if (typeof props.createdBy === "object" && props.createdBy !== null) {
    return props.createdBy.username || "";
  }
  if (typeof props.createdBy === "string") {
    const atIndex = props.createdBy.indexOf("@");
    return atIndex !== -1 ? props.createdBy.slice(0, atIndex) : props.createdBy;
  }
  return "";
});
</script>

<style scoped>
.invisible-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.invisible-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>
