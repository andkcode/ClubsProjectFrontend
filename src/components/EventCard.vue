<template>
  <div
    class="flex flex-col w-[34rem] h-[27rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
  >
    <img :src="photo" alt="URL PHOTO LINK" class="w-full h-[17rem]" />
    <div class="overflow-auto h-full p-4 invisible-scrollbar">
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-900 whitespace-normal">
          {{ title }}
        </h1>
        <div class="flex flex-row space-x-2 self-start">
          <p class="text-gray-600 text-m">{{ formattedStartTime }}</p>
          <p class="text-black text-m text-end font-bold">/</p>
          <p class="text-gray-600 text-m">{{ formattedEndTime }}</p>
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
