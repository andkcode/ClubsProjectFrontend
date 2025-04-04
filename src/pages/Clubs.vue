<template>
    <div class="flex flex-col w-[60%] justify-self-center">
      <div class="flex flex-col text-center mb-5 mt-5">
        <h1 class="fw-bolder text-black text-[3.2em] font-bold">Clubs near you!</h1>
        <p class="lead fw-normal text-muted mb-0 text-black text-[1.3em]">Clubs find in your area!</p>
      </div>
      <div class="row gx-5">
        <div class="col-lg-6 mb-2" v-for="club in clubs" :key="club.id">
          <CardClub :id="club.id" :photo="club.photoUrl" :title="club.title" :description="club.content" />
        </div>
      </div>
    </div>
  </template>
  
<script>
import CardClub from '../components/CardClub.vue';
import ClubsService from '../composables/ClubsService';

export default {
  name: 'Clubs',
  components: { CardClub },
  data() {
    return {
      clubs: [],
    };
  },
  methods: {
    async getAllClubs() {
      try {
        const response = await ClubsService.getAllClubs();
        console.log(response);
        this.clubs = response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getAllClubs();
  },
};

  </script>