<template>
  <section class="py-12 sm:py-16 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
            Apa itu <span class="text-eco-green-600">Eco Enzyme</span>?
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 px-2">
            Pelajari manfaat dan cara pembuatan eco enzyme untuk lingkungan yang lebih baik
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div class="relative order-2 md:order-1">
            <div class="aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
              <img
                src="@/assets/images/eco-enzyme-process.jpg"
                alt="Proses Pembuatan Eco Enzyme"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              class="absolute -z-10 -top-2 -left-2 sm:-top-3 sm:-left-3 w-full h-full bg-eco-green-100 rounded-lg sm:rounded-xl"
            ></div>
            <div
              class="absolute -z-10 -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-full h-full bg-eco-green-200 rounded-lg sm:rounded-xl"
            ></div>
          </div>

          <div class="space-y-4 sm:space-y-6 order-1 md:order-2">
            <div class="space-y-3 sm:space-y-4">
              <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Solusi Alami untuk Limbah Organik
              </h3>
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
                Eco Enzyme adalah cairan fermentasi yang dibuat dari sisa buah dan sayuran, gula
                merah, dan air. Proses fermentasi alami ini menghasilkan enzim yang memiliki banyak
                manfaat untuk lingkungan dan kehidupan sehari-hari.
              </p>
            </div>

            <div class="space-y-2 sm:space-y-3">
              <h4 class="text-base sm:text-lg font-semibold text-gray-900">Manfaat Eco Enzyme:</h4>
              <ul class="space-y-2">
                <li class="flex items-start gap-2 sm:gap-3">
                  <i
                    class="fas fa-check-circle text-eco-green-500 flex-shrink-0 mt-0.5 sm:mt-1 text-sm sm:text-base"
                  ></i>
                  <span class="text-sm sm:text-base text-gray-600"
                    >Mengurangi limbah organik rumah tangga</span
                  >
                </li>
                <li class="flex items-start gap-2 sm:gap-3">
                  <i
                    class="fas fa-check-circle text-eco-green-500 flex-shrink-0 mt-0.5 sm:mt-1 text-sm sm:text-base"
                  ></i>
                  <span class="text-sm sm:text-base text-gray-600"
                    >Pembersih alami yang ramah lingkungan</span
                  >
                </li>
                <li class="flex items-start gap-2 sm:gap-3">
                  <i
                    class="fas fa-check-circle text-eco-green-500 flex-shrink-0 mt-0.5 sm:mt-1 text-sm sm:text-base"
                  ></i>
                  <span class="text-sm sm:text-base text-gray-600"
                    >Pupuk organik untuk tanaman</span
                  >
                </li>
                <li class="flex items-start gap-2 sm:gap-3">
                  <i
                    class="fas fa-check-circle text-eco-green-500 flex-shrink-0 mt-0.5 sm:mt-1 text-sm sm:text-base"
                  ></i>
                  <span class="text-sm sm:text-base text-gray-600"
                    >Menyegarkan udara dan mengurangi bau</span
                  >
                </li>
              </ul>
            </div>

            <div class="pt-4 sm:pt-6">
              <button
                @click="handleLearnMore"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-eco-green-600 text-white font-semibold rounded-lg hover:bg-eco-green-700 transition-colors text-sm sm:text-base"
              >
                Pelajari Lebih Lanjut
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
