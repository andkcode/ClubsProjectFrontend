<template>
    <div 
      class="min-h-screen min-w-screen flex items-center justify-center bg-black overflow-hidden"
      @mousemove="handleMouseMove"
      :style="{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #333 0%, #111 50%, #000 100%)'
      }"
    >
      <div 
        class="backdrop-blur-lg bg-black/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transition-all duration-500"
        :style="{
          transform: `perspective(1000px) rotateX(${mouseMovePosition.y * 0.05}deg) rotateY(${-mouseMovePosition.x * 0.05}deg)`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 255, 255, 0.1) inset'
        }"
      >
        <!-- Logo -->
        <div class="flex flex-col items-center mb-5">
          <div class="relative">
            <div class="absolute inset-0 rounded-full soft-pulse"></div>
            <img src="/src/assets/logo.png" alt="Logo" class="h-20 relative z-10 filter invert brightness-200">
          </div>
        </div>
  
        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-sm text-gray-300 mb-1" for="username">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 border border-white/10"
              placeholder="ClubUser"
            />
          </div>
  
          <div>
            <label class="block text-sm text-gray-300 mb-1" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 border border-white/10"
              placeholder="you@example.com"
            />
          </div>
  
          <div>
            <label class="block text-sm text-gray-300 mb-1" for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 border border-white/10"
              placeholder="••••••••"
            />
          </div>
  
          <div>
            <label class="block text-sm text-gray-300 mb-1" for="confirmPassword">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 border border-white/10"
              placeholder="••••••••"
            />
          </div>
  
          <button
            type="submit"
            class="relative w-full hover:cursor-pointer bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl border border-white/20 backdrop-blur-md"
          >
            <span >Register</span>
          </button>
        </form>
  
        <!-- Login Link -->
        <div class="text-center mt-6 flex items-center justify-center gap-2 text-gray-400">
          Already have an account? 
          <router-link to="/login" class="text-white font-bold hover:underline">Login</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useAuth } from '../../composables/useAuth';
  import { useRouter } from 'vue-router';
  import { toast } from 'vue-sonner';
  
  const router = useRouter();
  const { register, username, email, password, errorMessage } = useAuth();
  const isLoading = ref(false);
  
  const confirmPassword = ref('');
  
  const handleRegister = async () => {

    if(!username.value || username.value.trim() === '') {
      toast('Missing Username', {
      description: 'Please enter your username.',
      duration: 2500,
      position: 'top-right',
      type: 'warning'
    });
    return;
    } else if(!email.value || email.value.trim() === '') {
    toast('Missing Email', {
      description: 'Please enter your email.',
      duration: 2500,
      position: 'top-right',
      type:'warning'
    });
    return;
    } else if(password.value.length < 8) {
    toast('Password too short', {
      description: 'Password must be at least 8 characters.',
      duration: 2500,
      position: 'top-right',
      type: 'info'
    });
    return;
    } else if (!password.value || password.value.trim() === '') {
      toast('Missing Password', {
      description: 'Please enter your password.',
      duration: 2500,
      position: 'top-right',
      type: 'warning'
    });
  } else if (password.value !== confirmPassword.value) {
    toast('Passwords do not match', {
      description: 'Please confirm your password.',
      duration: 2500,
      position: 'top-right',
      type: 'warning'
    });
    return;
  }
  
    await register(email.value, password.value, username.value, router);
  };
  
  const mouseMovePosition = ref({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    mouseMovePosition.value = { x, y };
  };
  
  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
  });
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
  });
  </script>
  
  <style>
  .soft-pulse {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
    animation: softPulse 4s ease-in-out infinite;
    border-radius: 50%;
  }
  
  @keyframes softPulse {
    0%, 100% {
      opacity: 0.05;
      transform: scale(0.97);
    }
    50% {
      opacity: 0.15;
      transform: scale(1.03);
    }
  }
  </style>