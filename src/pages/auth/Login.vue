<template>
  <div 
    class="min-h-screen min-w-screen flex items-center justify-center bg-black overflow-hidden"
    @mousemove="handleMouseMove"
    :style="{
      backgroundImage: 'radial-gradient(circle at 50% 50%, #333 0%, #111 50%, #000 100%)'
    }"
  >

    
    <!-- Login card with glass effect -->
    <div 
      class="backdrop-blur-lg bg-black/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transition-all duration-500 hover:border-white/40"
      :style="{
        transform: `perspective(1000px) rotateX(${mouseMovePosition.y * 0.05}deg) rotateY(${-mouseMovePosition.x * 0.05}deg)`,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 255, 255, 0.1) inset'
      }"
    >
      <!-- Logo and tagline with animated entry -->
      <div class="flex flex-col items-center justify-center mb-10 transition-all duration-700">
        <div class="h-20 w-20 mb-4 relative flex items-center justify-center">
          <div class="absolute w-full h-full rounded-full bg-gradient-to-r from-white/5 to-white/20 animate-pulse"></div>
          <img src="/src/assets/logo.png" alt="logo.png" class="h-20">
        </div>
        <p class="text-gray-300 mt-2 tracking-wide">"Your club management companion"</p>
      </div>
      
      <!-- Login form with animations -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="group">
          <label class="block text-sm text-gray-300 mb-1" for="email">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 border border-white/10 focus:border-white/30"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div class="group">
          <label class="block text-sm text-gray-300 mb-1" for="password">Password</label>
          <div class="relative">
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-300 border border-white/10 focus:border-white/30"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <button
          type="submit"
          :disabled="isLoading"
          class="relative w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:cursor-pointer border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 overflow-hidden group"
        >
          <span :class="{'opacity-0': isLoading, 'opacity-100': !isLoading, 'transition-all': true, 'duration-300': true}">
            Log In
          </span>
          
          <span v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          
          <div class="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></div>
        </button>
      </form>
      
      <!-- Register link with hover effect -->
      <div class="mt-8 flex-col flex items-center text-sm text-gray-400">
        <p>
          Don't have an account?
          <a href="#" class="flex relative justify-self-center text-white hover:text-gray-200 transition-all duration-300 group">
            Join a Club
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const mouseMovePosition = ref({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const { clientX, clientY } = e;
  const x = (clientX / window.innerWidth) * 20 - 10;
  const y = (clientY / window.innerHeight) * 20 - 10;
  mouseMovePosition.value = { x, y };
};

function handleLogin() {
  isLoading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    console.log('Logging in with', email.value, password.value);
    isLoading.value = false;
  }, 1500);
}

// Clean up event listeners when component unmounts
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

/* Add subtle text shadow effect */
input, button, label, p, a {
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

/* Focus styles */
input:focus {
  box-shadow: 0 0 0 2px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1);
}

/* Animation for form elements */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

form > div {
  animation: fadeIn 0.5s ease-out forwards;
}

form > div:nth-child(1) { animation-delay: 0.1s; }
form > div:nth-child(2) { animation-delay: 0.2s; }
form > button { animation-delay: 0.3s; }
</style>