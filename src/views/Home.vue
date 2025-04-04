<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-sans">

  
      <section class="flex flex-col items-center justify-center text-center py-24 px-6">
        <h2 class="text-5xl font-extrabold leading-tight max-w-3xl animate-fade-in">Find Your People. Build Your Passion.</h2>
        <p class="mt-6 text-xl max-w-xl opacity-90 animate-fade-in-delay">Create or join clubs based on your interests – whether it’s books, basketball, crypto, or cosplay. ClubHub is where communities begin.</p>
        <button class="mt-10 bg-white text-purple-800 font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-purple-200 transition-all animate-fade-in-delay-more">
          Get Started
        </button>
      </section>
  
      <section id="explore" class="bg-white text-gray-900 px-10 py-20">
        <h3 class="text-4xl font-bold text-center mb-12">Popular Clubs</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="bg-gradient-to-br from-yellow-300 to-yellow-500 p-6 rounded-2xl shadow-xl">
            <h4 class="text-2xl font-bold mb-2">Photography Lovers</h4>
            <p>Capture the world and share your shots with like-minded artists.</p>
          </div>
          <div class="bg-gradient-to-br from-green-300 to-green-500 p-6 rounded-2xl shadow-xl">
            <h4 class="text-2xl font-bold mb-2">Tech Enthusiasts</h4>
            <p>Explore the latest in AI, coding, and hardware projects together.</p>
          </div>
          <div class="bg-gradient-to-br from-pink-300 to-pink-500 p-6 rounded-2xl shadow-xl">
            <h4 class="text-2xl font-bold mb-2">Anime Watchers</h4>
            <p>Weekly meetups to binge, chat, and cosplay your favorite series.</p>
          </div>
        </div>
      </section>
  
      <section id="create" class="px-10 py-20 bg-purple-950 text-white">
        <h3 class="text-4xl font-bold text-center mb-12">Start Your Own Club</h3>
        <div class="max-w-2xl mx-auto text-center">
          <p class="text-lg mb-6">Bring your idea to life and attract people who love what you love. Creating a club is free and easy.</p>
          <button class="bg-white text-purple-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-200 transition-all">
            Create a Club
          </button>
        </div>
      </section>
  
      <section id="about" class="px-10 py-20 bg-indigo-950 text-white">
        <h3 class="text-4xl font-bold text-center mb-10">About ClubHub</h3>
        <p class="max-w-3xl mx-auto text-lg text-center">ClubHub is a platform where anyone can create or join clubs based on shared interests. Whether you’re into coding, cooking, climbing, or chess – this is your place to meet, grow, and have fun together.</p>
      </section>
  
      <footer class="text-center py-8 bg-indigo-900 text-sm opacity-70">
        © 2025 ClubHub. All rights reserved.
      </footer>
    </div>
  </template>
  
  <script type="ts">
  export default {
    name: "ClubHubHome",
  };
  </script>
  
  <style scoped>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }
  .animate-fade-in-delay {
    animation: fade-in 1.5s ease-out forwards;
  }
  .animate-fade-in-delay-more {
    animation: fade-in 2s ease-out forwards;
  }
  </style>
  