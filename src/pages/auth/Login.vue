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

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
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
          <router-link to="/forgot-password" class="inline-block text-start mt-2 ml-1 text-sm text-[hsl(var(--muted-foreground))] hover:cursor-pointer hover:text-white duration-300 transition-colors">Forgot password?</router-link>
        </div>

        <button
          type="submit"
          class="relative w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl border border-white/20 backdrop-blur-md hover:cursor-pointer"
        >
          <span>Log In</span>
        </button>
      </form>
      <div class="flex justify-center mt-4">
  <router-link to="/register" class="inline-block text-sm text-[hsl(var(--muted-foreground))] hover:cursor-pointer hover:text-white transition-colors duration-300">Don't you have an account?</router-link>
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
const { login, email, password, errorMessage } = useAuth();

const handleLogin = async () => {
  if (!email.value || email.value.trim() === '') {
    toast('Missing Email', {
      description: 'Please enter your email.',
      duration: 2500,
      position: 'top-right',
      type:'warning'
    });
    return;
  } else if(!password.value || password.value.trim() === '') {
    toast('Missing Password', {
      description: 'Please enter your password.',
      duration: 2500,
      position: 'top-right',
      type: 'warning'
    });
    return;
  }

  await login(email.value, password.value, router);
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
