<template>
    <div class="flex flex-col w-[32rem] h-[26rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img :src="photo" alt="URL PHOTO LINK" class="w-full h-[17rem]" />
      <div class="p-4">
        <div class="flex flex-row justify-between">
        <h1 class="text-xl font-semibold text-gray-900">{{ title }}</h1>
        <div class="flex flex-row space-x-2">
        <p class="text-gray-600 text-m">{{ formattedStartTime }}</p>
        <p class="text-black text-m text-end font-bold">/</p>
        <p class="text-gray-600 text-m">{{ formattedEndTime }}</p>
        </div>
      </div>
        <p class="text-gray-600 text-m">{{ description }}</p>
        <p class="text-gray-600 text-m">{{ type }}</p>
        <div class="flex flex-row justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"><router-link :to="`/clubs/{id}`">View</router-link></button>
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
import { defineProps } from 'vue';
import { computed } from 'vue';
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
})

const formattedCreatedOn = computed(() =>
  props.createdOn ? new Date(props.createdOn).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '') : ''
)

const formattedUpdatedOn = computed(() =>
  props.updatedOn ? new Date(props.updatedOn).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',','') : ''
)

const formattedStartTime = computed(() =>
  props.startTime ? new Date(props.startTime).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '') : ''
)

const formattedEndTime = computed(() =>
  props.endTime ? new Date(props.endTime).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '') : ''
)

</script>
  