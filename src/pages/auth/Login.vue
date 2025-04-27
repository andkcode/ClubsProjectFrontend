<template>
  <div
    class="min-h-screen min-w-screen flex items-center justify-center bg-cover bg-center"
  >
    <div class="backdrop-blur-lg bg-black/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
      <div class="items-center justify-items-center mb-10">
        <img src="/src/assets/logo.png" alt="logo.png" class="h-[5rem]">
        <p class="text-gray-300 mt-2 tracking-wide">"Your club management companion"</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm text-gray-300 mb-1" for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-300 mb-1" for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-white/10 hover:bg-white/20 transition text-white font-semibold py-3 rounded-xl shadow-inner hover:shadow-lg border border-white/30 backdrop-blur-md"
        >
          Log In
        </button>
      </form>
      <div class="mt-8 text-center text-sm text-gray-400">
        <p>
          Don't have an account?
          <a href="#" class="text-white hover:underline hover:text-gray-300">Join a Club</a>
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
  // Add your real authentication logic here
}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
