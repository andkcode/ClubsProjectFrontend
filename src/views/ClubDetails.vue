<template>
  <div class="min-h-screen bg-white text-gray-800 p-6 flex flex-col items-center">
    <div class="w-full max-w-2xl space-y-6">
      <h1 class="text-3xl font-semibold border-b pb-2">Club Details</h1>

      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">Failed to load club data.</div>
      <div v-else>
        <div class="space-y-4">
          <div>
            <h2 class="text-xl font-medium">Name</h2>
            <p class="text-gray-600">{{ club.name }}</p>
          </div>

          <div>
            <h2 class="text-xl font-medium">Description</h2>
            <p class="text-gray-600">{{ club.description }}</p>
          </div>

          <div v-if="club.location">
            <h2 class="text-xl font-medium">Location</h2>
            <p class="text-gray-600">{{ club.location }}</p>
          </div>

          <div v-if="club.members && club.members.length">
            <h2 class="text-xl font-medium">Members</h2>
            <ul class="list-disc list-inside text-gray-600">
              <li v-for="member in club.members" :key="member.id">{{ member.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const clubId = route.params.id

const loading = ref(true)
const error = ref(false)
const club = ref({})

onMounted(async () => {
  try {

    await new Promise(resolve => setTimeout(resolve, 500))

    club.value = {
      name: 'Chess Club',
      description: 'A club for chess enthusiasts of all skill levels.',
      location: 'Room 204, Main Building',
      members: [
        { id: 1, name: 'Alice Johnson' },
        { id: 2, name: 'Bob Smith' },
      ],
    }
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

