<template>
  <div class="min-h-screen w-full bg-gray-50 py-10 px-6">
    <div class="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
      <!-- Club Image -->
      <img
        :src="club.photoUrl"
        alt="Club photo"
        class="lg:w-1/2 w-full object-cover h-[30rem] lg:h-auto"
      />

      <!-- Club Info -->
      <div class="p-8 flex-1 flex flex-col justify-between">
        <!-- Title & Location -->
        <div>
          <h1 class="text-5xl font-bold text-gray-900 mb-3">{{ club.title }}</h1>
          <p class="text-gray-600 mb-4"><i class="pi pi-map-marker"></i> Location of club</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in club.tags || ['Music', 'Tech', 'Gaming']"
              :key="tag"
              class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-700 text-base whitespace-pre-wrap">{{ club.description }}</p>
        </div>

        <!-- Meta info -->
        <div class="mt-6 border-t space-y-1 pt-4 flex flex-col text-sm text-gray-500">
          <p class="space-x-2"><i class="pi pi-user" />Created by: <span class="font-semibold text-gray-700">{{ formattedCreatedBy }}</span></p>
          <p class="space-x-2"><i class="pi pi-calendar" />Created: <span class="font-semibold text-gray-500">{{ formattedCreatedOn }}</span></p>
          <p class="space-x-2"><i class="pi pi-pencil" />Updated: <span class="font-semibold text-gray-500">{{ formattedUpdatedOn }}</span></p>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex gap-3">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Join</button>
          <button class="px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition">Edit</button>
          <button class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">Delete</button>
          <button class="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">Сreate Event</button>
        </div>
      </div>
    </div>

    <!-- Events -->
    <div class="max-w-7xl mx-auto mt-10">
      <h2 class="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in club.events || [demoEvent, demoEvent2]"
          :key="event.id"
          class="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
        >
          <img :src="event.photoUrl" alt="Event" class="w-full h-40 object-cover rounded-lg mb-3" />
          <h3 class="text-lg font-semibold">{{ event.title }}</h3>
          <p class="text-gray-600 text-sm">{{ event.description }}</p>
          <p class="text-xs text-gray-500 mt-2">🕒 {{ formatDate(event.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import ClubsService from "../composables/ClubsService";

export default {
  data() {
    return {
      club: {},
      demoEvent: {
        id: 1,
        title: "Hackathon 2024",
        description: "A cool event for all club members",
        photoUrl: "https://source.unsplash.com/random/400x200?tech",
        date: new Date(),
      },
      demoEvent2: {
        id: 2,
        title: "Gaming Night",
        description: "Join us for a chill gaming session",
        photoUrl: "https://source.unsplash.com/random/400x200?game",
        date: new Date(),
      },
    };
  },
  created() {
    this.getClubById();
  },
  methods: {
    async getClubById() {
      try {
        const clubId = this.$route.params.id;
        const response = await ClubsService.getClubById(clubId);
        this.club = response;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  computed: {
    formattedCreatedOn() {
      return this.club.createdOn
        ? this.formatDate(this.club.createdOn)
        : "";
    },
    formattedUpdatedOn() {
      return this.club.updatedOn
        ? this.formatDate(this.club.updatedOn)
        : "";
    },
    formattedCreatedBy() {
      if (typeof this.club.createdBy === "object" && this.club.createdBy !== null) {
        return this.club.createdBy.username || "";
      }
      if (typeof this.club.createdBy === "string") {
        const atIndex = this.club.createdBy.indexOf("@");
        return atIndex !== -1 ? this.club.createdBy.slice(0, atIndex) : this.club.createdBy;
      }
      return "";
    },
  },
};
</script>

<style scoped>
/* Optional custom scrollbar styling */
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
