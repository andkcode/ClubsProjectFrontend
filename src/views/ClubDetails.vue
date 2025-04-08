<template>
  <div class="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white py-12 px-6">
    <div class="max-w-7xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-white">
      <div class="relative w-full lg:w-1/2 h-[32rem]">
        <img :src="club.photoUrl" alt="Club Photo" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute top-4 left-4 bg-black/50 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm">
          {{ club.location || 'Unknown Location' }}
        </div>
        <div class="absolute bottom-4 left-4 flex gap-2">
          <span
            v-for="tag in club.tags || ['Music', 'Art']"
            :key="tag"
            class="bg-white/80 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <div class="p-10 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 mb-2">{{ club.title }}</h1>
          <p class="text-gray-600 italic mb-6 text-sm">“{{ club.slogan || 'A place for everyone.' }}”</p>
          <div class="prose max-w-none text-gray-800 whitespace-pre-wrap">
            {{ club.description }}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
          <div><strong>Created by:</strong> {{ formattedCreatedBy }}</div>
          <div><strong>Members:</strong> {{ club.members || 'N/A' }}</div>
          <div><strong>Created:</strong> {{ formattedCreatedOn }}</div>
          <div><strong>Last updated:</strong> {{ formattedUpdatedOn }}</div>
        </div>

        <div class="flex gap-4 mt-6">
          <button class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Join</button>
          <button class="px-5 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">Edit</button>
          <button class="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
          <button class="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Create Event</button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto mt-12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-bold">Upcoming Events</h2>
        <input
          v-model="search"
          placeholder="Search events..."
          class="px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div v-if="filteredEvents.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition group"
        >
          <img :src="event.photoUrl" alt="Event" class="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ event.title }}</h3>
            <p class="text-gray-500 text-sm mb-2">{{ formatDate(event.date) }}</p>
            <p class="text-gray-700 text-sm">{{ truncate(event.description, 100) }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 italic mt-4">No events found.</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import ClubsService from '../composables/ClubsService';
import EventsService from '../composables/EventsService';

export default {
  data() {
    return {
      club: {},
      events: [],
      search: '',
    };
  },
  created() {
    this.getClubById();
    this.getEventsByClubId();
  },
  computed: {
    filteredEvents() {
      if (!this.search) return this.events;
      return this.events.filter(e =>
        e.title.toLowerCase().includes(this.search.toLowerCase()) ||
        e.description.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    formattedCreatedOn() {
      return this.club.createdOn ? this.formatDate(this.club.createdOn) : '';
    },
    formattedUpdatedOn() {
      return this.club.updatedOn ? this.formatDate(this.club.updatedOn) : '';
    },
    formattedCreatedBy() {
      if (typeof this.club.createdBy === 'object' && this.club.createdBy !== null) {
        return this.club.createdBy.username || 'Unknown';
      }
      if (typeof this.club.createdBy === 'string') {
        const atIndex = this.club.createdBy.indexOf('@');
        return atIndex !== -1 ? this.club.createdBy.slice(0, atIndex) : this.club.createdBy;
      }
      return 'Unknown';
    },
  },
  methods: {
    async getClubById() {
      try {
        const clubId = this.$route.params.id;
        this.club = await ClubsService.getClubById(clubId);
      } catch (err) {
        console.error(err);
      }
    },
    async getEventsByClubId() {
      try {
        const clubId = this.$route.params.id;
        this.events = await EventsService.getEventByClubId(clubId);
      } catch (err) {
        console.error(err);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    truncate(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    },
  },
};
</script>

<style scoped>
.prose p {
  margin: 0;
}
</style>
