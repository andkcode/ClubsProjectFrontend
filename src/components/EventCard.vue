<template>
  <div
    class="relative flex flex-col w-[36rem] h-[30rem] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"
  >
    <!-- Фото -->
    <div class="relative w-full h-[16rem]">
      <img :src="photo" alt="Event cover" class="w-full h-full object-cover" />
      
      <!-- Дата -->
      <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 px-3 py-1 rounded-full shadow-sm">
        📅 {{ formattedStartDate }}
      </div>
      
      <!-- Популярный бейдж -->
      <div v-if="likes > 100" class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
        🔥 Популярный
      </div>
    </div>

    <!-- Контент -->
    <div class="flex flex-col justify-between h-full p-4 pt-3">
      <!-- Заголовок + Время -->
      <div class="flex justify-between items-start mb-2">
        <h1 class="text-xl font-bold text-gray-900 leading-snug break-words max-w-[65%]">
          {{ title }}
        </h1>
        <div class="text-right text-sm text-gray-500 space-y-1">
          <p>{{ formattedStartTime }}</p>
          <p>—</p>
          <p>{{ formattedEndTime }}</p>
        </div>
      </div>

      <!-- Организатор и Теги -->
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center space-x-2">
          <img
            :src="organizer.avatar"
            alt="Organizer"
            class="w-8 h-8 rounded-full border border-gray-300"
            title="Организатор: {{ organizer.name }}"
          />
          <span class="text-sm text-gray-700 font-medium">
            {{ organizer.name }}
          </span>
        </div>

        <!-- Добавить в календарь -->
        <button
          @click="addToCalendar"
          class="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full hover:bg-indigo-200 transition"
        >
          📆 В календарь
        </button>
      </div>

      <!-- Описание -->
      <div class="mb-3 flex-1 overflow-auto invisible-scrollbar max-h-[6rem]">
        <p class="text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
          {{ description }}
        </p>
      </div>

      <!-- Кнопки -->
      <div class="flex justify-between items-end">
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
          >
            {{ isGoing ? '✅ Иду' : '👋 Я пойду' }}
          </button>
        </div>

        <!-- Дата создания и лайки/вью -->
        <div class="text-xs text-gray-500 text-right flex flex-col items-end">
          <div class="flex items-center space-x-1">
            <span>🕓</span>
            <span>{{ formattedCreatedOn }}</span>
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonView from "./ButtonView.vue";
import { ref, computed } from "vue";

const props = defineProps({
  id: Number,
  photo: String,
  title: String,
  description: String,
  startTime: String,
  endTime: String,
  type: String,
  createdOn: String,
  views: {
    type: Number,
    default: 256,
  },
  likes: {
    type: Number,
    default: 42,
  },
  organizer: {
    type: Object,
    default: () => ({
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40",
    }),
  },
});

const isGoing = ref(false);

function toggleRSVP() {
  isGoing.value = !isGoing.value;
}

function addToCalendar() {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    props.title,
  )}&dates=${formatForCalendar(props.startTime)}/${formatForCalendar(
    props.endTime,
  )}&details=${encodeURIComponent(props.description)}&location=&sf=true&output=xml`;
  window.open(url, "_blank");
}

function formatForCalendar(dateStr) {
  const date = new Date(dateStr);
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";
}

const formattedStartDate = computed(() =>
  props.startTime
    ? new Date(props.startTime).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "",
);

const formattedStartTime = computed(() =>
  props.startTime
    ? new Date(props.startTime).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "",
);

const formattedEndTime = computed(() =>
  props.endTime
    ? new Date(props.endTime).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "",
);

const formattedCreatedOn = computed(() =>
  props.createdOn
    ? new Date(props.createdOn).toLocaleString("ru-RU", {
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
