<template>
  <div
    class="relative flex flex-col w-[38rem] h-[32rem] bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 group"
  >
    <div class="relative h-[16rem] w-full">
    <img
      :src="photo"
        alt="Club cover"
        class="w-full h-full object-cover"
      />
      <button
        @click="toggleFavorite"
        class="absolute top-3 right-3 bg-white/80 hover:bg-white text-yellow-500 rounded-full p-2 shadow-md transition"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span v-if="isFavorite">★</span>
        <span v-else>☆</span>
      </button>
      <div
        class="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm"
      >
        {{ formattedLocation }}
      </div>
    </div>

    <div class="flex flex-col justify-between h-full p-4 pt-3 space-y-2">
      <div class="flex justify-between items-start">
        <h1 class="text-2xl font-extrabold text-gray-900 leading-snug break-words max-w-[65%]">
          {{ title }}
        </h1>
        <div class="flex items-center space-x-2 max-w-[35%]">
          <img
            v-if="createdByAvatar"
            :src="createdByAvatar"
            alt="Creator avatar"
            class="w-8 h-8 rounded-full border border-gray-300"
            :title="`Created by: ${formattedCreatedBy}`"
          />
          <span class="text-sm text-gray-500 truncate font-medium">
            {{ formattedCreatedBy }}
          </span>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer hover:bg-indigo-200 transition"
        >
          #{{ tag }}
        </span>
      </div>

      <div class="flex-1 overflow-auto invisible-scrollbar text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
          {{ description }}
      </div>

      <div class="grid grid-cols-2 gap-4 mt-1 text-xs text-gray-600">
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">📅 Events:</span>
          <span>{{ events }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">👥 Members:</span>
          <span>{{ members }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">🏷️ Category:</span>
          <span>{{ category }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">🧩 Roles:</span>
          <span>{{ roles.join(', ') }}</span>
        </div>
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
