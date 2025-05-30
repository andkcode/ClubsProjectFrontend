<template>
  <div class="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white py-12 px-6">
    <div class="max-w-7xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-white">
      <div class="relative w-full lg:w-1/2 h-[32rem]">
        <img :src="club.photoUrl" alt="Club Photo" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 flex flex-row items-center space-x-1 rounded-full text-sm backdrop-blur-sm">
          <i class="pi pi-map-marker" />
          <p>{{ club.countryName }}, {{ club.cityName }}</p>
        </div>
        <div class="absolute bottom-4 left-4 flex gap-2">
          <span
            v-for="tag in cleanedTags || ['Music', 'Art']"
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
          <p class="text-gray-600 italic mb-4 text-sm">“{{ club.slogan || 'A place for everyone.' }}”</p>

          <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6 bg-gray-100 p-4 rounded-xl shadow-inner">
            <div><i class="pi pi-user mr-1" /><strong>Created by:</strong> {{ formattedCreatedBy }}</div>
            <div><i class="pi pi-users mr-1" /><strong>Members:</strong> {{ club.members || 'N/A' }}</div>
            <div><i class="pi pi-calendar-plus mr-1" /><strong>Created:</strong> {{ formattedCreatedOn }}</div>
            <div><i class="pi pi-refresh mr-1" /><strong>Updated:</strong> {{ formattedUpdatedOn }}</div>
          </div>

          <div class="prose max-w-none text-gray-800 whitespace-pre-wrap">
            {{ club.description }}
          </div>
        </div>

        <div class="flex gap-4 mt-6">
          <button class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Join</button>
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ClubsService from '../composables/ClubsService';
import EventsService from '../composables/EventsService';

interface Club {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  photoUrl?: string;
  cityName: {
    type: String,
    default: "Unknown",
  },
  countryName: {
    type: String,
    default: "Unknown",
  },
  createdBy?: string | { username?: string };
  createdOn?: string;
  updatedOn?: string;
  members?: number;
  tags?: (string | null | undefined)[];
}

interface Event {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  date: string;
}

const route = useRoute();
const club = ref<Club>({});
const events = ref<Event[]>([]);
const search = ref('');

const getClubById = async () => {
  try {
    const clubId = route.params.id as string;
    club.value = await ClubsService.getClubById(clubId);
  } catch (err) {
    console.error(err);
  }
};

const getEventsByClubId = async () => {
  try {
    const clubId = route.params.id as string;
    events.value = await EventsService.getEventByClubId(clubId);
  } catch (err) {
    console.error(err);
  }
};

const filteredEvents = computed(() => {
  if (!search.value) return events.value;
  return events.value.filter(e =>
    e.title.toLowerCase().includes(search.value.toLowerCase()) ||
    e.description.toLowerCase().includes(search.value.toLowerCase())
  );
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const formattedCreatedOn = computed(() => {
  return club.value.createdOn ? formatDate(club.value.createdOn) : '';
});

const formattedUpdatedOn = computed(() => {
  return club.value.updatedOn ? formatDate(club.value.updatedOn) : '';
});

const formattedCreatedBy = computed(() => {
  const createdBy = club.value.createdBy;
  if (typeof createdBy === 'object' && createdBy !== null) {
    return createdBy.username || 'Unknown';
  }
  if (typeof createdBy === 'string') {
    const atIndex = createdBy.indexOf('@');
    return atIndex !== -1 ? createdBy.slice(0, atIndex) : createdBy;
  }
  return 'Unknown';
});

function normalizeTags(tags: (string | null | undefined)[]): string[] {
  return Array.from(
    new Set(
      tags
        .filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
        .map(tag => tag.trim().toLowerCase())
    )
  );
}

const cleanedTags = computed(() => {
  return normalizeTags(club.value.tags || []);
});

onMounted(() => {
  getClubById();
  getEventsByClubId();
});
</script>

<style scoped>
.prose p {
  margin: 0;
}
</style>
