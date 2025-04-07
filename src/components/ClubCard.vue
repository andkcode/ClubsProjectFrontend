<template>
  <div
    class="flex flex-col w-[35rem] h-[25rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
  >
    <img :src="photo" alt="URL PHOTO LINK" class="w-full h-[17rem]" />
    <div class="overflow-auto h-full p-4 invisible-scrollbar">
      <div class="flex flex-row justify-between space-x-[2rem] items-center">
        <h1
          class="text-xl font-semibold text-black break-words whitespace-pre-wrap"
        >
          {{ title }}
        </h1>
        <p class="text-black text-lg font-bold self-start">
          {{ formattedCreatedBy }}
        </p>
      </div>
      <p class="text-gray-600 text-m mb-2 break-words whitespace-pre-wrap">
        {{ description }}
      </p>
      <div class="flex flex-row justify-between">
        <ButtonView :link="`/clubs/${id}`" />
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
import { computed } from "vue";
import { defineProps } from "vue";
const props = defineProps({
  id: Number,
  photo: String,
  title: String,
  description: String,
  createdOn: String,
  updatedOn: String,
  createdBy: String,
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

<style>
.invisible-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.invisible-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
