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

      <!-- Reset Password Form -->
      <form @submit.prevent="handlePassword" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-300 mb-1" for="newPassword">New Password</label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            class="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 border border-white/10"
            placeholder="••••••••"
            required
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
            required
          />
        </div>

        <button
          type="submit"
          class="relative w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl border border-white/20 backdrop-blur-md hover:cursor-pointer"
          :disabled="loading"
        >
          <span v-if="!loading">Reset Password</span>
          <span v-else>Resetting...</span>
        </button>
      </form>
      
      <div class="flex justify-center mt-4">
        <router-link to="/login" class="text-sm text-gray-400 hover:text-white transition-colors">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue-sonner';

const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const resetToken = ref('');

const router = useRouter();
const route = useRoute();
const { resetPassword } = useAuth();

const handlePassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    toast('Please fill in all fields', {
      duration: 2500,
      position: 'top-right',
      type: 'warning',
    });
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    toast('Passwords do not match', {
      duration: 2500,
      position: 'top-right',
      type: 'error',
    });
    return;
  }

  if (newPassword.value.length < 8) {
    toast('Password must be at least 8 characters long', {
      duration: 2500,
      position: 'top-right',
      type: 'error',
    });
    return;
  }

  if (!resetToken.value) {
    toast('Invalid reset token', {
      duration: 2500,
      position: 'top-right',
      type: 'error',
    });
    return;
  }

  loading.value = true;
  
  try {
    await resetPassword(resetToken.value, newPassword.value);
    
    toast('Password reset successful', {
      duration: 1000,
      position: 'top-right',
      type: 'success',
    });

    setTimeout(() => {
      router.push('/login');
    }, 1200);
    
  } catch (error) {
    console.error('Reset password error:', error);
    toast('Failed to reset password', {
      description: 'Please try again or request a new reset link',
      duration: 2500,
      position: 'top-right',
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
};

const mouseMovePosition = ref({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth) * 20 - 10;
  const y = (e.clientY / window.innerHeight) * 20 - 10;
  mouseMovePosition.value = { x, y };
};

onMounted(() => {
  if (route.params.token) {
    resetToken.value = route.params.token;
  } else if (route.query.token) {
    resetToken.value = route.query.token;
  } else {
    toast('Invalid or missing reset token', {
      duration: 2500,
      position: 'top-right',
      type: 'error',
    });
    router.push('/login');
  }
  
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