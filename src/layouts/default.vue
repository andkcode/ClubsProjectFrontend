<template>
  <div class="flex flex-col min-h-screen w-full">
  <Header v-if="showHeaderFooter" />

    <main class="flex-grow w-full relative">
      <router-view />
    </main>

    <Footer v-if="showHeaderFooter" />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { computed, onBeforeMount } from 'vue'
import { useAuth } from '../composables/useAuth';
import { watch } from 'vue';

const route = useRoute();
const { isAuthenticated, refreshAuth } = useAuth();

const showHeaderFooter = computed(() => {
  if(!isAuthenticated.value) {
    return false;
  }
  return !route.meta.hideHeaderFooter;
});

watch(route, () => {
  refreshAuth();
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