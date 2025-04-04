<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img :src="photo" alt="Photo" class="w-full h-auto" />
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ description }}</p>
        <button><router-link :to="`/clubs/`" class="btn btn-primary">View</router-link></button>
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
  