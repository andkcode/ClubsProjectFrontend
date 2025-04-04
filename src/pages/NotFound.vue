<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center text-white px-6 py-10">
      <div class="text-center max-w-xl">
        <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 animate-pulse">404</h1>
        <h2 class="text-4xl mt-4 font-bold">Lost in the ClubHub Universe?</h2>
        <p class="mt-4 text-lg text-gray-300">Looks like this club doesn’t exist... yet. Maybe you’re just ahead of your time.</p>
  
        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <RouterLink to="/" class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl shadow-md transition transform hover:scale-105">
            Back to Home
          </RouterLink>
          <RouterLink to="/create-club" class="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-md transition transform hover:scale-105">
            Start a New Club
          </RouterLink>
        </div>
  
        <div class="mt-12">
          <img src="/assets/astronaut_clubhub.svg" alt="Lost in space" class="w-64 mx-auto opacity-80 animate-float" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'NotFoundPage'
  };
  </script>
  
  <style scoped>
  @keyframes float {
    0% { transform: translatey(0px); }
    50% { transform: translatey(-10px); }
    100% { transform: translatey(0px); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  </style>
  