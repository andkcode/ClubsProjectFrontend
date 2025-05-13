<template>
  <div class="z-10 min-w-screen px-6 max-w-7xl mx-auto min-h-[6rem] flex items-center justify-between bg-[hsl(var(--background))] text-[hsl(var(--foreground))] backdrop-blur-md border-b transition-colors duration-300">
    <div class="flex items-center">
      <router-link class="hover:cursor-pointer" :to="`/`">
        <img src="/src/assets/logo.png" alt="logo.png" 
          class="w-[100%] h-[5rem] dark:invert transition-all duration-300" />
      </router-link>
    </div>

    <!-- Search Bar -->
    <div class="relative flex items-center justify-center w-full max-w-[40rem] mx-auto h-[2.5rem] px-4 rounded-full bg-[hsl(var(--muted))]/5 border border-[hsl(var(--muted-foreground))]/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl focus-within:border-[hsl(var(--muted-foreground))]/40">
      <i class="pi pi-search text-[1.3rem] text-[hsl(var(--muted-foreground))]"></i>
      <input type="text" placeholder="Search"
        class="ml-3 flex-1 bg-transparent text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none" />
    </div>

    <!-- Right part -->
    <div class="relative flex w-full max-w-fit space-x-6">
      <nav class="flex items-center flex-grow space-x-8">
        <router-link class="nav-link group" :to="`/`">
          <span class="relative text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors duration-300">
            Home
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </router-link>
        <router-link class="nav-link group" :to="`/clubs`">
          <span class="relative text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors duration-300">
            Clubs
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </router-link>
        <router-link class="nav-link group" :to="`/events`">
          <span class="relative text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors duration-300">
            Events
          </span>
        </router-link>
      </nav>
          <UserMenu />
          <ThemeButton />
    </div>

    <!-- Subtle animated particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>

    <!-- Top line glow effect -->
    <div class="absolute bottom-0 left-0 h-px w-full animate-shine bg-gradient-to-r from-transparent via-[hsl(var(--foreground))]/60 to-transparent"></div>
  </div>
</template>
<script setup>
import ThemeButton from '../components/ThemeButton.vue';
import UserMenu from '../components/UserMenu.vue';
import { useAuth } from '../composables/useAuth';

const { isAuthenticated } = useAuth();

const open = () => {
  console.log(isAuthenticated.value);
}
</script>

<style scoped>
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes shine {
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@keyframes text-shimmer {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(20px, 0);
  }
  75% {
    transform: translate(10px, 10px);
  }
}

@keyframes soft-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.3;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 15s ease infinite;
}

.animate-shine {
  background-size: 200% 100%;
  animation: shine 3s infinite linear;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: float 10s infinite ease-in-out, soft-pulse 5s infinite;
}

.particle:nth-child(1) {
  width: 60px;
  height: 60px;
  top: 10%;
  left: 10%;
  animation-duration: 7s;
}

.particle:nth-child(2) {
  width: 40px;
  height: 40px;
  top: 20%;
  right: 20%;
  animation-duration: 9s;
  animation-delay: 1s;
}

.particle:nth-child(3) {
  width: 35px;
  height: 35px;
  bottom: 15%;
  right: 30%;
  animation-duration: 8s;
  animation-delay: 2s;
}

.particle:nth-child(4) {
  width: 25px;
  height: 25px;
  bottom: 20%;
  left: 25%;
  animation-duration: 6s;
  animation-delay: 0.5s;
}

.nav-link {
  position: relative;
  transform-origin: center;
  transition: transform 0.3s;
}

.nav-link:hover {
  transform: translateY(-1px);
}
</style>