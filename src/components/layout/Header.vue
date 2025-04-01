<template>
  <header class="relative flex items-center justify-center min-w-screen h-20 overflow-hidden">
    <!-- Transparent background with subtle blur effect -->
    <div class="absolute inset-0 bg-transparent backdrop-blur-sm"></div>
    
    <!-- Animated gradient border with improved color scheme -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-600/20 animate-gradient-x opacity-30"></div>
    
    <!-- Animated floating particles with improved positioning -->
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
    
    <!-- Glass morphism effect for extra depth -->
    <div class="absolute inset-0 bg-white/5 backdrop-filter"></div>
    
    <!-- Header content with improved spacing -->
    <div class="relative z-10 w-full px-6 max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-white text-xl font-bold tracking-wider hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 transition-all duration-500">
        <span class="animate-text-shimmer">YourBrand</span>
      </div>
      
      <!-- Improved navigation with interactive effects -->
      <nav class="hidden md:flex space-x-8">
        <a href="#" class="nav-link group">
          <span class="relative text-white/80 group-hover:text-white transition-colors duration-300">
            Menu
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>
        <a href="#" class="nav-link group">
          <span class="relative text-white/80 group-hover:text-white transition-colors duration-300">
            About
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>
        <a href="#" class="nav-link group">
          <span class="relative text-white/80 group-hover:text-white transition-colors duration-300">
            Contact
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>
      </nav>
      
      <!-- Mobile menu button -->
      <button class="md:hidden text-white/90 hover:text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Enhanced animated line under the header -->
    <div class="absolute bottom-0 left-0 h-px w-full animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
  </header>
</template>

<style scoped>
/* Enhanced gradient animation */
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

/* Improved shine animation for the bottom border */
@keyframes shine {
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

/* Text shimmer animation for the logo */
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

/* Dynamic floating animation for particles */
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

/* Softer pulse effect */
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

.animate-text-shimmer {
  animation: text-shimmer 3s ease-in-out infinite;
}

/* Creating randomly positioned and sized particles */
.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: float 10s infinite ease-in-out, soft-pulse 5s infinite;
}

/* Positioning particles with varied sizes and animation timings */
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

/* Nav link hover effect */
.nav-link {
  position: relative;
  transform-origin: center;
  transition: transform 0.3s;
}

.nav-link:hover {
  transform: translateY(-1px);
}
</style>