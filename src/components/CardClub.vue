<template>
    <div class="max-w-[30rem] max-h-[25rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img :src="photo" alt="Photo" class="w-full h-[17rem]" />
      <div class="p-4">
        <h1 class="text-xl font-semibold text-gray-900">{{ title }}</h1>
        <p class="text-gray-600 text-m mb-2">{{ description }}</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"><router-link :to="`/clubs/{id}`">View</router-link></button>
      </div>
    </div>
  </template>
  
<script setup>
import { defineProps } from 'vue';
defineProps({
  id: Number,
  photo: String,
  title: String,
  description: String
})
</script>
  