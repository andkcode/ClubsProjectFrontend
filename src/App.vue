<template>
  <MainView />
  <Toaster richColors position="top-right" closeButton />
</template>

<script setup lang="ts">
import MainView from '@/layouts/default.vue';
import { useAuth } from './composables/useAuth';
import { Toaster } from 'vue-sonner';

const { refreshAuth } = useAuth();
refreshAuth();
</script>

