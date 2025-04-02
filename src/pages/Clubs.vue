<template>
    <div class="flex flex-col w-[60%] justify-self-center">
      <div class="flex flex-col text-center mb-5 mt-5">
        <h1 class="fw-bolder text-black">Clubs near you!</h1>
        <p class="lead fw-normal text-muted mb-0 text-black">Clubs find in your area!</p>
      </div>
      <div class="row gx-5">
        <div class="col-lg-6 mb-2" v-for="club in clubs" :key="club.id">
          <div class="position-relative mb-3">
            <img class="img-fluid rounded-3 mb-3" :src="club.photoUrl" alt="Club Image" />
            <a class="h3 fw-bolder text-decoration-none link-dark stretched-link text-black" :href="'#'">{{ club.title }}</a>
          </div>
          <router-link :to="`/clubs/${club.id}`" class="btn btn-primary">View</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // Define the Club interface
  interface Club {
    id: number;
    title: string;
    photoUrl: string;
  }
  
  // State
  const clubs = ref<Club[]>([]);
  
  // Fetch clubs on component mount
  onMounted(() => {
    fetchClubs();
  });
  
  // Method to fetch clubs
  const fetchClubs = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/clubs');
      clubs.value = await response.json();
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };
  </script>