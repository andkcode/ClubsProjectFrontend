<template>
    <div class="flex flex-col w-[60%] justify-self-center">
      <div class="flex flex-col text-center mb-5 mt-5">
        <h1 class="fw-bolder text-black text-[3.2em] font-bold">Events near you!</h1>
        <p class="lead fw-normal text-muted mb-0 text-black text-[1.3em]">Events find in your area!</p>
      </div>
      <div class="row gx-5">
        <div class="col-lg-6 mb-2" v-for="event in events" :key="event.id">
          <CardEvent :id="event.id" :photo="event.photoUrl" :title="event.title" :description="event.description" :startTime="event.startTime" :endTime="event.endTime" :type="event.type" :createdOn="event.createdOn" :updatedOn="event.updatedOn" />
        </div>
      </div>
    </div>
  </template>
  
<script>
import CardEvent from '../components/CardEvent.vue';
import EventsService from '../composables/EventsService';

export default {
  name: 'Events',
  components: { CardEvent },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async getAllEvents() {
      try {
        const response = await EventsService.getAllEvents();
        this.events = response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getAllEvents();
  },
};

  </script>