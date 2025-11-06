<template>
  <section
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-green-600 to-eco-green-700 overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center space-y-12">
        <!-- Heading -->
        <div class="space-y-4">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Siap Mulai Perjalanan
            <br />
            Ramah Lingkungan Anda?
          </h2>
          <p class="text-lg md:text-xl text-eco-green-50 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan orang yang sudah membuat eco enzyme dan berkontribusi untuk
            planet yang lebih hijau.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 max-w-2xl mx-auto py-8">
          <div class="space-y-3">
            <div
              class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-3xl md:text-4xl font-bold text-white">90</div>
            <div class="text-sm md:text-base text-eco-green-100">Hari Fermentasi</div>
          </div>
          <div class="space-y-3">
            <div
              class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                />
              </svg>
            </div>
            <div class="text-3xl md:text-4xl font-bold text-white">3</div>
            <div class="text-sm md:text-base text-eco-green-100">Bahan Sederhana</div>
          </div>
          <div class="space-y-3">
            <div
              class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div class="text-3xl md:text-4xl font-bold text-white">100%</div>
            <div class="text-sm md:text-base text-eco-green-100">Alami</div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="handleStartNow"
            class="group px-8 py-4 bg-white hover:bg-gray-50 text-eco-green-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span>Mulai Sekarang</span>
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
            @click="handleViewGuide"
            class="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border-2 border-white/50 hover:border-white"
          >
            Lihat Panduan
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const handleStartNow = () => {
  // Navigate ke tutorial atau signup
  console.log('Start now clicked')
}

const handleViewGuide = () => {
  // Scroll to about section atau navigate ke guide page
  console.log('View guide clicked')
}
</script>
