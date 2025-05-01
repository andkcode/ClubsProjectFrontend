<template>
  <MainView />
</template>

<script setup lang="ts">
import MainView from '@/layouts/default.vue';
import { useAuth } from './composables/useAuth';

const { refreshAuth } = useAuth();
refreshAuth();
</script>

