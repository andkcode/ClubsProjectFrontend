<template>
  <router-link :to="link">
    <div class="group">
      <button
        class="relative px-6 py-2 rounded-lg border cursor-pointer border-gray-300 text-white font-medium text-base bg-black shadow-sm border transition-none hover:shadow-md hover:border-white"
      >
        <span
          class="relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
        >
          View
          <svg
            class="w-4 h-4 text-white group-hover:text-green-600 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      </button>
    </div>
  </router-link>
</template>
