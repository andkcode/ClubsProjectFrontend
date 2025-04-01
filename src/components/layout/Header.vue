<template>
  <header class="relative flex items-center justify-center min-w-screen h-20 overflow-hidden">
    <!-- Прозрачный фон с легким оттенком -->
    <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
    
    <!-- Анимированная градиентная рамка -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 animate-gradient-x opacity-40"></div>
    
    <!-- Анимированные частицы -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="particle1"></div>
      <div class="particle2"></div>
      <div class="particle3"></div>
      <div class="particle4"></div>
    </div>
    
    <!-- Контент хедера -->
    <div class="relative z-10 w-full px-6 flex justify-between items-center">
      <div class="text-white text-xl font-bold tracking-wider animate-pulse">asdasdas</div>
      <nav class="hidden md:flex space-x-6">
        <a href="#" class="text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105">Меню</a>
        <a href="#" class="text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105">О нас</a>
        <a href="#" class="text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105">Контакты</a>
      </nav>
    </div>
    
    <!-- Анимированная линия под хедером -->
    <div class="absolute bottom-0 left-0 h-px w-full animate-shine bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
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

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(10px) translateX(10px);
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

.particle1, .particle2, .particle3, .particle4 {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.particle1 {
  width: 60px;
  height: 60px;
  top: 10%;
  left: 10%;
  animation: float 7s infinite ease-in-out;
}

.particle2 {
  width: 40px;
  height: 40px;
  top: 20%;
  right: 20%;
  animation: float 9s infinite ease-in-out reverse;
}

.particle3 {
  width: 35px;
  height: 35px;
  bottom: 15%;
  right: 30%;
  animation: float 8s infinite ease-in-out;
}

.particle4 {
  width: 25px;
  height: 25px;
  bottom: 20%;
  left: 25%;
  animation: float 6s infinite ease-in-out reverse;
}
</style>