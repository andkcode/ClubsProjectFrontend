<template>
  <div
    class="relative flex flex-col w-[36rem] h-[29.5rem] bg-[hsl(var(--background))] border border-[hsl(var(--muted-foreground))] text-[hsl(var(--foreground))] rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:cursor-pointer"
    @click="navigateToEvent"
  >
    <!-- Photo -->
    <div class="relative w-full h-[16rem]">
      <img :src="photo" :alt="`Event: ${title}`" class="w-full h-full object-cover" loading="lazy" />

      <button
        @click.stop="toggleFavorite"
        :class="['absolute top-3 right-3 hover:bg-white cursor-pointer text-yellow-500 rounded-full w-[2rem] h-[2rem] shadow-md transition', isFavorite ? 'pi pi-star-fill bg-white' : 'pi pi-star bg-white/80']"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        role="button"
        :aria-pressed="isFavorite.toString()"
      >
      </button>

      <!-- Date -->
      <button 
        class="absolute outline top-3 left-3 flex items-center justify-center space-x-1 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 w-[7rem] h-[2rem] rounded-full shadow-sm hover:cursor-pointer" 
        @click.stop="addToCalendar"
      >
        <i class="pi pi-calendar" />
        <p> {{ formattedStartDate }}</p>
      </button>

      <!-- Location -->
      <div
        class="absolute flex flex-row bottom-3 left-3 bg-black/50 items-center space-x-1 text-white text-xs py-1 px-2 rounded-full backdrop-blur-sm cursor-pointer hover:underline"
        @click.stop="openMaps"
        :title="`${cityName}, ${location}`"
      >
        <i class="pi pi-map-marker" />
        <p>{{ cityName }}, {{ location }}</p>
      </div>

      <!-- Popular Badge -->
      <div v-if="likes > 100" class="absolute top-3 right-12 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
        🔥 Popular
      </div>
    </div>

    <div class="flex flex-col h-full p-4 pt-3">
      <!-- Title + Organizer -->
      <div class="flex justify-between items-start">
        <h1 class="text-xl font-extrabold text-[hsl(var(--foreground))] leading-snug break-words max-w-[65%]">
          {{ title }}
        </h1>
        <div class="flex items-center gap-2 max-w-[35%]">
          <img
            :src="organizer.avatar"
            alt="Organizer"
            class="w-9 h-9 rounded-full border border-gray-300 shrink-0"
            :title="`Organizer: ${organizer.name}`"
          />
          <div class="flex flex-col overflow-hidden">
            <span class="text-sm text-[hsl(var(--foreground))] font-semibold truncate">
              {{ organizer.name }}
            </span>
            <span class="text-xs flex flex-col text-[hsl(var(--foreground))] truncate">
              {{ formattedCreatedOn }}
            </span>
          </div>
        </div>
      </div>

      <!-- Time display -->
      <div class="flex flex-col items-start text-[1.0rem] text-[hsl(var(--muted-foreground))] mb-1">
        <div class="flex-row flex space-x-1">
          <p>{{ formattedStartTime }}</p>
          <p>-</p>
          <p>{{ formattedEndTime }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-2 text-[0.9rem] text-[hsl(var(--foreground))]">
        <div class="flex space-x-1">
          <i class="pi pi-users text-[1.0rem]"/>
          <span class="font-semibold text-[hsl(var(--foreground))]">Joined:</span>
          <span>{{ attendees }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="pi pi-tag text-[1.0rem]"/>
          <span class="font-semibold text-[hsl(var(--foreground))]">Category:</span>
          <span>{{ category }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="pi pi-box text-[1.0rem]"/>
          <span class="font-semibold text-[hsl(var(--foreground))]">Type:</span>
          <span>{{ eventType }}</span>
        </div>
      </div>


      <!-- Buttons -->
      <div class="flex justify-between items-end mt-auto">
        <div class="flex space-x-2">
          <ButtonView :link="`/events/${id}`" @click.stop />
          <button
            @click.stop="toggleRSVP"
            :class="[
              'text-sm font-medium px-3 py-1 rounded-full border transition',
              isGoing
                ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
            ]"
            role="button"
            :aria-pressed="isGoing.toString()"
          >
            {{ isGoing ? '✅ Going' : '👋 I\'m going' }}
          </button>
        </div>

        <!-- Created date, views, likes -->
        <div class="text-xs text-[hsl(var(--muted-foreground))] text-right flex flex-col items-end">
          <div class="flex items-center space-x-2 mt-1">
            <div class="flex items-center space-x-1">
              <span>👁</span>
              <span>{{ views }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <span>❤️</span>
              <span>{{ likes }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-1">
            <span>🕓</span>
            <span :title="`Updated: ${formattedUpdatedOn}`">{{ formattedCreatedOn }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import router from "../router";

const isFavorite = ref(false);
const toggleFavorite = () => (isFavorite.value = !isFavorite.value);
const isGoing = ref(false);
const toggleRSVP = () => (isGoing.value = !isGoing.value);

const props = defineProps({
  // Basic
  id: Number,
  title: String,
  description: String,
  photo: String,

  // Dates
  startTime: String,
  endTime: String,
  createdOn: String,
  updatedOn: String,

  // Location
  cityName: String,
  location: String,

  // Organizer
  organizer: {
    type: Object,
    default: () => ({ name: "John Doe", avatar: "https://i.pravatar.cc/40" }),
  },

  // Stats
  views: { type: Number, default: 256 },
  likes: { type: Number, default: 42 },
  attendees: { type: Number, default: 24 },
  
  // Classifications
  category: { type: String, default: "General" },
  eventType: { type: String, default: "In-person" },
});

const navigateToEvent = () => {
  if (props.id) {
    router.push(`/events/${props.id}`);
  }
};

function addToCalendar() {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    props.title,
  )}&dates=${formatForCalendar(props.startTime)}/${formatForCalendar(
    props.endTime,
  )}&details=${encodeURIComponent(props.description)}&location=${encodeURIComponent(
    props.cityName + ', ' + props.location
  )}&sf=true&output=xml`;
  window.open(url, "_blank");
}

function formatForCalendar(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function openMaps() {
  const query = encodeURIComponent(`${props.cityName}, ${props.location}`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
}

const formattedStartDate = computed(() =>
  props.startTime
    ? new Date(props.startTime).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "",
);

const formattedStartTime = computed(() =>
  props.startTime
    ? new Date(props.startTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "",
);

const formattedEndTime = computed(() =>
  props.endTime
    ? new Date(props.endTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "",
);

const formattedCreatedOn = computed(() =>
  props.createdOn
    ? new Date(props.createdOn).toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).replace(",", "")
    : "",
);

const formattedUpdatedOn = computed(() =>
  props.updatedOn
    ? new Date(props.updatedOn).toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).replace(",", "")
    : "",
);
</script>

<style scoped>
.invisible-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>