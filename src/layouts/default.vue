<script setup lang="ts">
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import Clubs from '../pages/Clubs.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen w-full">
    <Header />

    <main class="flex-grow w-full bg-white">
      <Clubs />
    </main>

    <Footer />
  </div>
</template>
