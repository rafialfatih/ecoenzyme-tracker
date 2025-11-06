<template>
  <section class="py-16 bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute -top-32 -right-32 w-80 h-80 bg-eco-green-200 rounded-full"></div>
      <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-eco-green-100 rounded-full"></div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Section Title -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Apa itu <span class="text-eco-green-600">Eco Enzyme</span>?
          </h2>
          <p class="text-base md:text-lg text-gray-600">
            Pelajari manfaat dan cara pembuatan eco enzyme untuk lingkungan yang lebih baik
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Left: Image -->
          <div class="relative">
            <div class="aspect-square rounded-xl overflow-hidden shadow-lg">
              <img
                src="@/assets/images/eco-enzyme-process.jpg"
                alt="Proses Pembuatan Eco Enzyme"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Decorative elements -->
            <div
              class="absolute -z-10 -top-3 -left-3 w-full h-full bg-eco-green-100 rounded-xl"
            ></div>
            <div
              class="absolute -z-10 -bottom-3 -right-3 w-full h-full bg-eco-green-200 rounded-xl"
            ></div>
          </div>

          <!-- Right: Content -->
          <div class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-xl md:text-2xl font-semibold text-gray-900">
                Solusi Alami untuk Limbah Organik
              </h3>
              <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                Eco Enzyme adalah cairan fermentasi yang dibuat dari sisa buah dan sayuran, gula
                merah, dan air. Proses fermentasi alami ini menghasilkan enzim yang memiliki banyak
                manfaat untuk lingkungan dan kehidupan sehari-hari.
              </p>
            </div>

            <!-- Benefits -->
            <div class="space-y-3">
              <h4 class="text-base md:text-lg font-semibold text-gray-900">Manfaat Eco Enzyme:</h4>
              <ul class="space-y-2">
                <li class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-eco-green-500 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-600">Mengurangi limbah organik rumah tangga</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-eco-green-500 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-600">Pembersih alami yang ramah lingkungan</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-eco-green-500 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-600">Pupuk organik untuk tanaman</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-eco-green-500 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-600">Menyegarkan udara dan mengurangi bau</span>
                </li>
              </ul>
            </div>

            <!-- Call to Action -->
            <div class="pt-6">
              <button
                @click="handleLearnMore"
                class="inline-flex items-center gap-2 px-6 py-3 bg-eco-green-600 text-white font-semibold rounded-lg hover:bg-eco-green-700 transition-colors"
              >
                Pelajari Lebih Lanjut
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const handleLearnMore = () => {
  // Implement navigation to detailed information page
  console.log('Navigate to learn more page')
}
</script>
