<template>
  <div class="min-h-screen w-full bg-white text-gray-800 flex flex-col">
    <div class="flex flex-col items-center justify-center h-[15rem] mb-5 bg-gray-100 shadow-xl">
      <h1 class="text-[3.5rem] font-bold">{{ club.title }}</h1>
      <h2 class="text-[1.3rem] font-medium">Location of club</h2>
    </div>

    <div class="flex flex-col w-[35rem] h-[25rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        v-if="club.photo"
        :src="club.photo"
        alt="Club photo"
        class="w-full h-[17rem] object-cover"
      />
      <div class="overflow-auto h-full p-4 invisible-scrollbar">
        <div class="flex flex-row justify-between space-x-[2rem] items-center">
          <h1 class="text-xl font-semibold text-black break-words whitespace-pre-wrap">
            {{ club.title }}
          </h1>
          <p class="text-black text-lg font-bold self-start">
            {{ formattedCreatedBy }}
          </p>
        </div>
        <p class="text-gray-600 text-m mb-2 break-words whitespace-pre-wrap">
          {{ club.description }}
        </p>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row space-x-2 items-end">
            <p class="text-gray-600 text-m text-end">{{ formattedCreatedOn }}</p>
            <p class="text-black text-m text-end font-bold">/</p>
            <p class="text-gray-600 text-m text-end">{{ formattedUpdatedOn }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ClubsService from "../composables/ClubsService";

export default {
  data() {
    return {
      club: {}, 
    };
  },
  methods: {
    async getClubById() {
      try {
        const route = useRoute(); 
        const clubId = this.$route.params.id;  // Use this.$route instead of route
        const response = await ClubsService.getClubById(clubId);
        this.club = response;  // Make sure club is defined in data()
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getClubById(); 
  },
  computed: {
    formattedCreatedOn() {
      return this.club.createdOn
        ? new Date(this.club.createdOn)
            .toLocaleString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(",", "")
        : "";
    },
    formattedUpdatedOn() {
      return this.club.updatedOn
        ? new Date(this.club.updatedOn)
            .toLocaleString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(",", "")
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
