<template>
  <section
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-green-50 via-white to-eco-green-100 overflow-hidden"
  >
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-eco-green-500 rounded-full blur-3xl"></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-eco-green-300 rounded-full blur-3xl"
      ></div>
    </div>

    <div
      class="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center flex flex-col items-center space-y-6 sm:space-y-8"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2"
      >
        Buat <span class="text-eco-green-600">Eco Enzyme</span>
        <br />
        Dengan Mudah
      </h1>

      <div
        class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm"
      >
        <span class="text-xs sm:text-sm text-eco-green-700 font-medium"
          >Ramah Lingkungan • Mudah Dibuat</span
        >
      </div>

      <p
        class="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2"
      >
        Panduan lengkap membuat eco enzyme dari sampah organik rumah tangga. Tracking progress,
        reminder otomatis, dan tips praktis dalam satu aplikasi.
      </p>

      <div
        class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto px-2"
      >
        <button
          @click="$emit('start-tutorial')"
          class="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <span>Mulai Tutorial</span>
          <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </button>

        <button
          v-if="!isLoggedIn"
          @click="$emit('login')"
          class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-50 text-eco-green-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-eco-green-200 text-sm sm:text-base"
        >
          Login / Daftar
        </button>
      </div>

      <div class="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-2">
        <div
          class="flex items-center gap-1.5 sm:gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg"
        >
          <i class="fas fa-clipboard-list text-eco-green-600 text-sm sm:text-base"></i>
          <span class="text-xs sm:text-sm text-gray-700">Tracking Mudah</span>
        </div>

        <div
          class="flex items-center gap-1.5 sm:gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg"
        >
          <i class="fas fa-clock text-eco-green-600 text-sm sm:text-base"></i>
          <span class="text-xs sm:text-sm text-gray-700">Reminder Otomatis</span>
        </div>

        <div
          class="flex items-center gap-1.5 sm:gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg"
        >
          <i class="fas fa-book text-eco-green-600 text-sm sm:text-base"></i>
          <span class="text-xs sm:text-sm text-gray-700">Panduan Lengkap</span>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block"
    >
      <i class="fas fa-chevron-down text-xl sm:text-2xl text-eco-green-600 animate-bounce"></i>
    </div>
  </section>
</template>

<script setup>
defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['start-tutorial', 'login'])
</script>
