<template>
  <div
    class="relative flex flex-col w-[36rem] h-[30rem] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"
  >
    <!-- Photo -->
    <div class="relative w-full h-[16rem]">
      <img :src="photo" :alt="`Event: ${title}`" class="w-full h-full object-cover" loading="lazy" />

      <button
        @click="toggleFavorite"
        :class="['absolute top-3 right-3 hover:bg-white cursor-pointer text-yellow-500 rounded-full w-[2rem] h-[2rem] shadow-md transition', isFavorite ? 'pi pi-star-fill bg-white' : 'pi pi-star bg-white/80']"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        role="button"
        :aria-pressed="isFavorite.toString()"
      >
      </button>

      <!-- Date -->
      <div class="absolute top-3 left-3 flex items-center justify-center bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 w-[7rem] h-[2rem] rounded-full shadow-sm">
        <i class="pi pi-calendar" />
        <p> {{ formattedStartDate }}</p>
      </div>

      <!-- Location -->
      <div
        class="absolute flex flex-row bottom-3 left-3 bg-black/50 items-center space-x-1 text-white text-xs py-1 px-2 rounded-full backdrop-blur-sm cursor-pointer hover:underline"
        @click="openMaps"
        :title="`${cityName}, ${location}`"
      >
        <i class="pi pi-building" />
        <p>{{ cityName }}, {{ location }}</p>
      </div>

      <!-- Popular Badge -->
      <div v-if="likes > 100" class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
        🔥 Popular
      </div>
    </div>

    <div class="flex flex-col h-full p-4 pt-3">
      <!-- Title + Organizer -->
      <div class="flex justify-between items-start mb-2">
        <h1 class="text-xl font-bold text-gray-900 leading-snug break-words">
          {{ title }}
        </h1>
        <div class="flex items-center space-x-2 ml-4">
          <img
            :src="organizer.avatar"
            alt="Organizer"
            class="w-8 h-8 rounded-full border border-gray-300"
            :title="`Organizer: ${organizer.name}`"
          />
          <span class="text-sm text-gray-700 font-medium">
            {{ organizer.name }}
          </span>
        </div>
      </div>

      <!-- Time + Add to Calendar -->
      <div class="flex flex-col items-start text-sm text-gray-500 mb-4">
        <div class="flex-row flex space-x-1">
          <p>{{ formattedStartTime }}</p>
          <p>-</p>
          <p>{{ formattedEndTime }}</p>
        </div>
        <button
          @click="addToCalendar"
          class="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full hover:bg-indigo-200 transition"
        >
          📆 Add to Calendar
        </button>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between items-end mt-auto">
        <div class="flex space-x-2">
          <ButtonView :link="`/events/${id}`" />
          <button
            @click="toggleRSVP"
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
        <div class="text-xs text-gray-500 text-right flex flex-col items-end">
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
import ButtonView from "./ButtonView.vue";
import { ref, computed } from "vue";

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
});

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
    ? new Date(props.createdOn).toLocaleString("en-US", {
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
