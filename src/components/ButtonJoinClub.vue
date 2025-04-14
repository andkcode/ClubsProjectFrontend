<template>
    <router-link :to="link">
        <div class="group">
      <button class="relative px-6 py-2 whitespace-nowrap rounded-lg border border-gray-300 text-white font-medium text-base bg-black shadow-sm hover:shadow-md hover:border-white cursor-pointer transition-all duration-300 ease-in-out group">
        <span class="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
            <i class="pi pi-bolt group-hover:text-yellow-300" />Join Club
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </span>
      </button>
      </div>
    </router-link>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
link: {
type: String,
required: true
}
})
</script>