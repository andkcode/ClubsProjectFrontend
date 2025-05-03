<template>
  <footer class="relative flex items-center justify-center min-w-screen h-20 overflow-hidden bg-black/90 backdrop-blur-md border-t border-white/10">

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 w-full px-6 max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-gray-400 text-sm">
        © 2025 ClubHub. All rights reserved.
      </div>
      
      <div class="hidden md:flex space-x-8">
        <a href="#" class="nav-link group">
          <span class="relative text-gray-400 group-hover:text-white transition-colors duration-300">
            Privacy Policy
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>
        <a href="#" class="nav-link group">
          <span class="relative text-gray-400 group-hover:text-white transition-colors duration-300">
            Terms of Service
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>
        <a href="#" class="nav-link group">
          <span class="relative text-gray-400 group-hover:text-white transition-colors duration-300">
            Contact Us
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>
      </div>
    </div>
    
    <!-- Top line glow effect -->
    <div class="absolute top-0 left-0 h-px w-full animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
  </footer>
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
  width: 40px;
  height: 40px;
  top: 20%;
  left: 15%;
  animation-duration: 8s;
}

.particle:nth-child(2) {
  width: 30px;
  height: 30px;
  top: 30%;
  right: 20%;
  animation-duration: 10s;
  animation-delay: 1s;
}

.particle:nth-child(3) {
  width: 25px;
  height: 25px;
  bottom: 25%;
  right: 25%;
  animation-duration: 7s;
  animation-delay: 0.5s;
}

.particle:nth-child(4) {
  width: 35px;
  height: 35px;
  bottom: 30%;
  left: 30%;
  animation-duration: 9s;
  animation-delay: 1.5s;
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