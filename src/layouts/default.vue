<template>
  <div class="flex flex-col min-h-screen w-full">
    <Header v-if="!hideHeaderFooter"/>

    <main class="flex-grow w-full relative">
      <router-view />
    </main>

    <Footer v-if="!hideHeaderFooter"/>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import { computed, onBeforeMount } from 'vue'

const route = useRoute();
const hideHeaderFooter = () => {
  return route.meta.hideHeaderFooter;
}

onBeforeMount(() => {
  hideHeaderFooter();
})
</script>

<style scoped>
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-x {
  background: linear-gradient(90deg, rgba(128, 0, 128, 0.3), rgba(255, 20, 147, 0.3), rgba(0, 0, 255, 0.3));
  background-size: 300% 300%;
  animation: gradient-x 10s infinite linear;
  background-attachment: fixed;
  opacity: 0.33;
  z-index: -1;
}
</style>