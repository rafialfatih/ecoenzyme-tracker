<template>
  <section
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-green-50 via-white to-eco-green-100 overflow-hidden"
  >
    <!-- Background -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-eco-green-500 rounded-full blur-3xl"></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-eco-green-300 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative container mx-auto px-6 py-16 text-center flex flex-col items-center space-y-8"
    >
      <!-- Main Heading -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
        Buat <span class="text-eco-green-600">Eco Enzyme</span>
        <br />
        Dengan Mudah
      </h1>

      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
      >
        <span class="text-sm text-eco-green-700 font-medium">Ramah Lingkungan • Mudah Dibuat</span>
      </div>

      <!-- Description -->
      <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Panduan lengkap membuat eco enzyme dari sampah organik rumah tangga. Tracking progress,
        reminder otomatis, dan tips praktis dalam satu aplikasi.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="handleStartTutorial"
          class="group px-8 py-4 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <span>Mulai Tutorial</span>
          <svg
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        <button
          @click="handleLogin"
          class="px-8 py-4 bg-white hover:bg-gray-50 text-eco-green-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-eco-green-200"
        >
          Login / Daftar
        </button>
      </div>

      <!-- Info Pills -->
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <div class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <svg class="w-5 h-5 text-eco-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-gray-700">Tracking Mudah</span>
        </div>

        <div class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <svg class="w-5 h-5 text-eco-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-gray-700">Reminder Otomatis</span>
        </div>

        <div class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <svg class="w-5 h-5 text-eco-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
            />
          </svg>
          <span class="text-sm text-gray-700">Panduan Lengkap</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-eco-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Event handlers untuk CTA buttons
const handleStartTutorial = () => {
  router.push('/tutorial')
}

const handleLogin = () => {
  // Nanti akan navigate ke halaman login
  console.log('Navigate to login')
}
</script>
