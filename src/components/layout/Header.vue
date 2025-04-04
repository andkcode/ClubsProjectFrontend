<template>
  <header class="relative flex items-center justify-center min-w-screen h-20 overflow-hidden border-b-1 border-black">
    <div class="absolute inset-0 bg-gray-100"></div>
    
    <div class="absolute inset-0 bg-white"></div>
    
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    
    <div class="absolute inset-0 bg-white/5 backdrop-filter"></div>
    
    <div class="relative z-10 w-full px-6 max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-white text-xl font-bold tracking-wider hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 transition-all duration-500">
       <router-link class="hover:cursor-pointer" :to="`/`"><img src="/src/assets/logo.png" alt="logo.png" class="w-[100%] h-[5rem]"></router-link>
      </div>

      <div class="relative w-full px-6 h-[2.5rem] max-w-xl flex items-center rounded-full bg-white border border-gray-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xlr focus-within:border-black">
        <i class="pi pi-search text-[1.3rem] text-gray-500"></i>
        <input type="text" placeholder="Search" class="ml-3 flex-1 bg-transparent text-black placeholder-gray-400 focus:outline-none" />
      </div>

      
      
      <nav class="hidden md:flex space-x-8">
        <router-link class="nav-link group" :to="`/`">
          <span class="relative text-black group-hover:text-pink-500 transition-colors duration-300">
            Home
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </router-link>
        <router-link class="nav-link group" :to="`/clubs`">
          <span class="relative text-black group-hover:text-purple-400 transition-colors duration-300">
            Clubs
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </router-link>
        <router-link class="nav-link group" :to="`/events`">
          <span class="relative text-black group-hover:text-blue-500 transition-colors duration-300">
            Events
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </router-link>
        <a href="#" class="nav-link group">
            <i class="pi pi-user text-[1.5rem] text-black group-hover:text-orange-400 transition-colors duration-300 relative text-black transition-colors"></i>
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
        </a>
      </nav>
      
      <button class="md:hidden text-white/90 hover:text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <div class="absolute bottom-0 left-0 h-px w-full animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
  </header>
</template>

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

.particle:nth-child(5) {
  width: 45px;
  height: 45px;
  top: 40%;
  left: 40%;
  animation-duration: 11s;
  animation-delay: 0.2s;
}

.particle:nth-child(6) {
  width: 30px;
  height: 30px;
  top: 70%;
  left: 15%;
  animation-duration: 9s;
  animation-delay: 1.5s;
}

.particle:nth-child(7) {
  width: 50px;
  height: 50px;
  top: 30%;
  right: 10%;
  animation-duration: 12s;
  animation-delay: 0.7s;
}

.particle:nth-child(8) {
  width: 20px;
  height: 20px;
  bottom: 40%;
  right: 40%;
  animation-duration: 7s;
  animation-delay: 1.2s;
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