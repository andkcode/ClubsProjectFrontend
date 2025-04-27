<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1920&q=80)' }">
      <div class="backdrop-blur-md bg-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white tracking-wide">Welcome to ClubSphere</h1>
          <p class="text-gray-200 mt-2">Your portal to all things events & clubs</p>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm text-gray-100 mb-1" for="email">Email</label>
            <input v-model="email" type="email" id="email" required class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label class="block text-sm text-gray-100 mb-1" for="password">Password</label>
            <input v-model="password" type="password" id="password" required class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" class="w-full bg-pink-500 hover:bg-pink-600 transition text-white font-semibold py-2 rounded-xl shadow-md">Login</button>
        </form>
        <div class="mt-6 text-center text-sm text-gray-300">
          <p>
            Don't have an account?
            <a href="#" class="text-pink-400 hover:underline">Join a Club</a>
          </p>
          <p class="mt-2">
            Want to organize?
            <a href="#" class="text-pink-400 hover:underline">Create an Event</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  function handleLogin() {
    console.log('Logging in with', email.value, password.value);
    // Add actual authentication logic here
  }
  </script>
  
  <style>
  body {
    font-family: 'Inter', sans-serif;
  }
  </style>
  