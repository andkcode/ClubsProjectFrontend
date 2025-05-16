<template>
  <div class="relative group" @click="joinClub" v-if="!isJoined">
    <button
      class="relative flex items-center justify-center rounded-lg px-6 py-2 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-medium shadow-lg hover:shadow-sm transition-all duration-300 overflow-hidden hover:cursor-pointer border-[hsl(var(--muted-foreground))] border-1"
    >
      <!-- Background shine effect -->
      <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
      
      <!-- Content with gap -->
      <div class="flex items-center gap-3 z-10">
        <!-- Icon with animation -->
        <div class="text-yellow-400 group-hover:scale-125 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
        </div>
        
        <!-- Text -->
        <span class="text-base font-semibold group-hover:text-yellow-300 transition-colors duration-300">
          Join Club
        </span>
        
        <!-- Arrow with animation -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </button>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import ClubsService from '../composables/ClubsService'

const props = defineProps({
  id: Number
})

const club = ref(null);
const isJoined = ref(false);

onMounted(async () => {
  try {
    const response = await ClubsService.checkMembership(props.id)
    isJoined.value = response
    console.log("Joined:", response)
  } catch (error) {
    console.error("Fetch error:", error)
  }
})
  
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