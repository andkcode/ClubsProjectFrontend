<template>
  <div
    class="relative flex flex-col w-[38rem] h-[31rem] bg-[hsl(var(--background))] border border-[hsl(var(--muted-foreground))] text-[hsl(var(--foreground))] rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:cursor-pointer" 
    @click="navigateToClub">
    <div class="relative h-[17rem] w-full">
      <img
        :src="photo"
        alt="Club cover"
        class="w-full h-full object-cover"
      />
      <button
        @click.stop="toggleFavorite"
        :class="['absolute top-3 right-3 hover:bg-white cursor-pointer text-yellow-500 rounded-full w-[2rem] h-[2rem] shadow-md transition', isFavorite ? 'pi pi-star-fill bg-white' : 'pi pi-star bg-white/80']"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
      </button>
      <div v-if="clubType.includes('Public')"
        class="absolute flex flex-row bottom-3 left-3 bg-black/50 items-center space-x-1 text-white text-xs py-1 px-2 rounded-full backdrop-blur-sm"
      ><i class="pi pi-map-marker" />
        <p>{{ countryName }}, {{ cityName }}</p>
      </div>
    </div>

    <div class="flex flex-col justify-between p-4 pt-3 h-full">
      <div class="flex justify-between items-start">
        <h1 class="text-2xl font-extrabold text-[hsl(var(--foreground))] leading-snug break-words max-w-[65%]">
          {{ title }}
        </h1>
        <div class="flex items-center gap-2 max-w-[35%]">
          <img
            v-if="createdByAvatar"
            :src="createdByAvatar"
            alt="Creator avatar"
            class="w-9 h-9 rounded-full border border-gray-300 shrink-0"
            :title="`Created by: ${formattedCreatedBy}`"
          />
          <div class="flex flex-col overflow-hidden">
            <span class="text-sm text-[hsl(var(--foreground))] font-semibold truncate" title="Creator">
              {{ formattedCreatedBy }}
            </span>
            <span class="text-xs flex flex-col text-[hsl(var(--foreground))] truncate ">
              {{ formattedCreatedOn }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in cleanedTags"
          :key="tag"
          class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer hover:bg-indigo-200 transition"
          @click.stop
        >
          #{{ tag }}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-4 w-full mt-2 text-[0.9rem]">
        <div class="flex space-x-1">
          <i class="pi pi-calendar text-[1.0rem]" />
          <span class="font-semibold text-[hsl(var(--foreground))]">Events:</span>
          <span>{{ formattedEvents }}</span>
        </div>
        <div class="flex items-center space-x-1 ">
          <i class="pi pi-users text-[1.0rem]"/>
          <span class="font-semibold text-[hsl(var(--foreground))]">Members:</span>
          <span>{{ members }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="pi pi-tag text-[1.0rem]"/>
          <span class="font-semibold text-[hsl(var(--foreground))]">Category:</span>
          <span>{{ category }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="pi pi-box text-[1.0rem]"/>
          <span class="font-semibold text-[hsl(var(--foreground))]">Type:</span>
          <span>{{ type }}</span>
        </div>
      </div>

      <div class="flex justify-between items-end pt-2">
        <div class="flex items-center space-x-2">
          <ButtonJoinClub :id="id" @click.stop />
          <span
            :class="[
              'text-xs font-semibold px-2 py-1 rounded-full',
              activityLevel === 'High'
                ? 'bg-green-100 text-green-700'
                : activityLevel === 'Medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600',
            ]"
          >
            📊 Activity: {{ activityLevel }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListFormat } from "typescript";
import ButtonJoinClub from "./ButtonJoinClub.vue";
import { ref, computed } from "vue";
import router from "../router";

const props = defineProps({
  id: Number,
  photo: String,
  title: String,
  description: String,
  createdOn: String,
  updatedOn: String,
  location: String,
  tags: {
    type: Array,
    default: () => [],
  },
  type: String,
  createdBy: [String, Object],
  createdByAvatar: {
    type: String,
    default: "https://i.pravatar.cc/40",
  },
  cityName: {
    type: String,
  },
  countryName: {
    type: String,
  },
  category: {
    type: String,
    default: "General",
  },
  clubType: {
    type: Array,
    default: () => ["Public"],
  },
  members: {
    type: Number,
  },
  events: {
    type: Array,
    default: () => [],
  },
});

const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const navigateToClub = () => {
  if (props.id) {
    router.push(`/clubs/${props.id}`);
  }
};

const activityLevel = computed(() => {
  const members = typeof props.members === "number" ? props.members : 0;
  const events = typeof props.events === "number" ? props.events : 0;

  if (members == 150 || events > 10) return "High";
  if (members > 50 || events > 3) return "Medium";
  return "Low";
});

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

const formattedCreatedBy = computed(() => {
  if (typeof props.createdBy === "object" && props.createdBy !== null) {
    return props.createdBy.username || "unknown";
  }
  if (typeof props.createdBy === "string") {
    const atIndex = props.createdBy.indexOf("@");
    return atIndex !== -1 ? props.createdBy.slice(0, atIndex) : props.createdBy;
  }
  return "unknown";
});

const formattedEvents = computed(() => {
  return Array.isArray(props.events) ? props.events.length : props.events;
});

function normalizeTags(tags: (string | null | undefined)[] | undefined): string[] {
  if (!tags || !Array.isArray(tags)) {
    return [];
  }
  
  return Array.from(
    new Set(
      tags
        .filter((tag): tag is string => typeof tag === "string" && tag.trim() !== "")
        .map((tag) => tag.trim().toLowerCase())
    )
  );
}

const cleanedTags = computed(() => {
  return normalizeTags(props.tags);
});
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