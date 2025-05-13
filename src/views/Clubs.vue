<template>
  <div class="flex flex-col w-[60%] justify-self-center">
    <div class="flex flex-col text-center mb-5 mt-5">
      <h1 class="fw-bolder text-[hsl(var(--foreground))] text-[3.2em] font-bold">Clubs near you!</h1>
      <p class="lead fw-normal text-muted mb-0 text-[hsl(var(--foreground))] text-[1.3em]">Clubs found in your area!</p>
    </div>
    <div class="row gx-5">
      <div class="col-lg-6 mb-2" v-for="club in clubs" :key="club.id">
        <ClubCard
          :id="club.id"
          :photo="club.photoUrl"
          :title="club.title"
          :description="club.description"
          :createdOn="club.createdOn"
          :updatedOn="club.updatedOn"
          :createdBy="club.createdBy"
          :cityName="club.cityName"
          :countryName="club.countryName"
          :category="club.category"
          :events="club.events"
          :members="club.members"
          :type="club.type"
          :tags="club.tags"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ClubCard from '../components/ClubCard.vue';
import ClubsService from '../composables/ClubsService';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { isAuthenticated, refreshAuth, logout } = useAuth();

const clubs = ref([]);

const getAllClubs = async () => {
  try {
    const response = await ClubsService.getAllClubs();
    clubs.value = response;
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
    getAllClubs();
  }
</script>
