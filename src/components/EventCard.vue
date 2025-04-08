<template>
  <div
    class="relative flex flex-col w-[36rem] h-[30rem] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"
  >
    <!-- Фото -->
    <div class="relative w-full h-[16rem]">
      <img :src="photo" alt="Event cover" class="w-full h-full object-cover" />
      
      <!-- Дата -->
      <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 px-3 py-1 rounded-full shadow-sm">
        📅 {{ formattedStartDate }}
      </div>
      
      <!-- Популярный бейдж -->
      <div v-if="likes > 100" class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
        🔥 Популярный
      </div>
    </div>

    <!-- Контент -->
    <div class="flex flex-col justify-between h-full p-4 pt-3">
      <!-- Заголовок + Время -->
      <div class="flex justify-between items-start mb-2">
        <h1 class="text-xl font-bold text-gray-900 leading-snug break-words max-w-[65%]">
          {{ title }}
        </h1>
        <div class="text-right text-sm text-gray-500 space-y-1">
          <p>{{ formattedStartTime }}</p>
          <p>—</p>
          <p>{{ formattedEndTime }}</p>
        </div>
      </div>
      <p class="text-gray-600 text-m mb-2 font-medium">{{ type }}</p>
      <p class="text-gray-600 text-m mb-2">{{ description }}</p>
      <div class="flex flex-row justify-between mt-2">
        <ButtonView :link="`/events/${id}`"/>
        <div class="flex flex-row space-x-2 items-end">
          <p class="text-gray-600 text-m text-end">{{ formattedCreatedOn }}</p>
          <p class="text-black text-m text-end font-bold">/</p>
          <p class="text-gray-600 text-m text-end">{{ formattedUpdatedOn }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonView from "./ButtonView.vue";
import { defineProps } from "vue";
import { computed } from "vue";
const props = defineProps({
  id: Number,
  photo: String,
  title: String,
  description: String,
  startTime: String,
  endTime: String,
  type: String,
  createdOn: String,
  updatedOn: String,
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
    : "",
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
    : "",
);

const formattedStartTime = computed(() =>
  props.startTime
    ? new Date(props.startTime)
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", "")
    : "",
);

const formattedEndTime = computed(() =>
  props.endTime
    ? new Date(props.endTime)
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", "")
    : "",
);
</script>

<style>
.invisible-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.invisible-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
