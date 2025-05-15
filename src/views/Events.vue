<template>
    <div class="flex flex-col w-[60%] justify-self-center">
      <div class="flex flex-col text-center mb-5 mt-5">
        <h1 class="fw-bolder text-[hsl(var(--foreground))] text-[3.2em] font-bold">Events near you!</h1>
        <p class="lead fw-normal text-muted mb-0 text-[hsl(var(--foreground))] text-[1.3em]">Events find in your area!</p>
      </div>
      <div class="row gx-5">
        <div class="col-lg-6 mb-2" v-for="event in events" :key="event.id">
          <CardEvent :id="event.id" :photo="event.photoUrl" :title="event.title" :description="event.description" :startTime="event.startTime" :endTime="event.endTime" :type="event.type" :createdOn="event.createdOn" :updatedOn="event.updatedOn" :cityName="event.cityName" :location="event.location" />
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import CardEvent from '../components/EventCard.vue';
import EventsService from '../composables/EventsService';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { ref } from 'vue';

const router = useRouter();
const { isAuthenticated, refreshAuth, logout } = useAuth();

const events = ref([]);

const getAllEvents = async () => {
  try {
    const response = await EventsService.getAllEvents();
    events.value = response;
  } catch (error: any) {
    console.error(error);
    if (error.response?.status === 401) {
      logout(router);
    }
  }
};

  refreshAuth();

  if (!isAuthenticated.value) {
    router.push('/login');
  } else {
    getAllEvents();
  }
  
  </script>