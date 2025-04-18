<template>
      <div class="group" @click="joinClub">
        <button
          class="relative flex items-center cursor-pointer gap-3 px-6 py-2 whitespace-nowrap rounded-xl border border-gray-300 bg-black text-white text-base font-semibold shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:border-white focus:outline-none"
        >
          <span class="flex items-center gap-2 group-hover:text-yellow-300 transition-colors duration-300">
            <i class="pi pi-bolt hover:text-yellow-400" />
            Join Club
          </span>
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          <span
            class="absolute inset-0 rounded-xl ring-2 group-hover:ring-offset-2 group-hover:ring-2 group-hover:ring-yellow-300 transition-all duration-300 pointer-events-none"
          ></span>
        </button>
      </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import ClubsService from '../composables/ClubsService' //

const props = defineProps({
  id: Number
})

const club = ref(null);
  
const joinClub = async () => {
  try {
    const response = await ClubsService.joinClub(props.id)
    club.value = response
    console.log("Joined club:", response)
  } catch (error) {
    console.error("Fetch error:", error)
  }
}
</script>