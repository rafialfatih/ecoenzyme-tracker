<template>
  <section
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-green-600 to-eco-green-700 overflow-hidden"
  >
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    </div>

    <div class="relative container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 py-12 sm:py-16">
        <div class="space-y-3 sm:space-y-4">
          <h2
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-2"
          >
            Siap Mulai Perjalanan
            <br />
            Ramah Lingkungan Anda?
          </h2>
          <p
            class="text-sm sm:text-base md:text-lg lg:text-xl text-eco-green-50 max-w-2xl mx-auto px-2"
          >
            Mulai membuat eco enzyme dengan GARS Eco. Sebagai kontribusi untuk planet yang lebih
            hijau sekarang.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto py-6 sm:py-8">
          <div class="space-y-2 sm:space-y-3">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-clock text-lg sm:text-xl md:text-2xl text-white"></i>
            </div>
            <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">90</div>
            <div class="text-xs sm:text-sm md:text-base text-eco-green-100 px-1">
              Hari Fermentasi
            </div>
          </div>
          <div class="space-y-2 sm:space-y-3">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-clipboard-list text-lg sm:text-xl md:text-2xl text-white"></i>
            </div>
            <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">3</div>
            <div class="text-xs sm:text-sm md:text-base text-eco-green-100 px-1">
              Bahan Sederhana
            </div>
          </div>
          <div class="space-y-2 sm:space-y-3">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-seedling text-lg sm:text-xl md:text-2xl text-white"></i>
            </div>
            <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">100%</div>
            <div class="text-xs sm:text-sm md:text-base text-eco-green-100 px-1">Alami</div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
          <button
            @click="handleStartNow"
            class="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-50 text-eco-green-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span>Mulai Sekarang</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStartNow = () => {
  router.push('/tutorial')
}
</script>
