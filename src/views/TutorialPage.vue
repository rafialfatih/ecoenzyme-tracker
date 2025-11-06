<template>
  <div class="tutorial-page min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <button
            @click="handleBack"
            class="flex items-center gap-2 text-gray-600 hover:text-eco-green-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span class="font-medium">Kembali</span>
          </button>

          <h1 class="text-xl font-bold text-gray-900">Tutorial Eco Enzyme</h1>

          <div class="w-20"></div>
          <!-- Spacer for center alignment -->
        </div>
      </div>
    </header>

    <!-- Stepper -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-6 py-6">
        <div class="flex items-center justify-between max-w-4xl mx-auto">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
            :class="{ 'flex-1': index < steps.length - 1 }"
          >
            <!-- Step Circle -->
            <div class="flex flex-col items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all"
                :class="
                  currentStep > index
                    ? 'bg-eco-green-600 text-white'
                    : currentStep === index
                      ? 'bg-eco-green-600 text-white ring-4 ring-eco-green-100'
                      : 'bg-gray-200 text-gray-500'
                "
              >
                <span v-if="currentStep > index">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="text-xs mt-2 font-medium hidden sm:block"
                :class="currentStep >= index ? 'text-eco-green-600' : 'text-gray-400'"
              >
                {{ step.label }}
              </span>
            </div>

            <!-- Line connector -->
            <div
              v-if="index < steps.length - 1"
              class="flex-1 h-1 mx-4 rounded"
              :class="currentStep > index ? 'bg-eco-green-600' : 'bg-gray-200'"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="container mx-auto px-6 py-8 flex-1 flex flex-col">
      <div class="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <!-- Step Content akan ditampilkan di sini -->
        <div class="bg-white rounded-xl shadow-sm p-6 md:p-8 flex-1 flex flex-col overflow-y-auto">
          <div class="flex-shrink-0">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {{ steps[currentStep].title }}
            </h2>
            <p class="text-sm md:text-base text-gray-600 mb-6">
              {{ steps[currentStep].description }}
            </p>
          </div>

          <!-- Scrollable content area -->
          <div class="flex-1 overflow-y-auto">
            <!-- Placeholder untuk step components -->
            <div class="h-full flex items-center justify-center text-gray-400">
              <p>Content untuk step {{ currentStep + 1 }} akan ditambahkan di sini</p>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="mt-4 md:mt-6 flex-shrink-0">
          <!-- Navigation buttons -->
          <div
            class="flex"
            :class="
              currentStep > 0 && currentStep < steps.length - 1
                ? 'justify-between'
                : 'justify-center'
            "
          >
            <button
              v-if="currentStep > 0 && currentStep < steps.length - 1"
              @click="prevStep"
              class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Sebelumnya
            </button>

            <button
              v-if="currentStep === steps.length - 1"
              @click="prevStep"
              class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Sebelumnya
            </button>

            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              class="px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Selanjutnya
            </button>
          </div>

          <!-- CTA Login (hanya muncul di step terakhir) -->
          <div
            v-if="currentStep === steps.length - 1"
            class="bg-gradient-to-r from-eco-green-50 to-eco-green-100 rounded-xl p-6 mt-6 text-center"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-2">Ingin Tracking Progress Anda?</h3>
            <p class="text-gray-600 mb-4">
              Login untuk menyimpan batch eco enzyme Anda, mendapatkan reminder otomatis, dan
              tracking progress hingga 90 hari!
            </p>
            <button
              @click="handleLoginPrompt"
              class="px-8 py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login / Daftar Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(0)

const steps = [
  {
    label: 'Bahan',
    title: 'Persiapan Bahan',
    description: 'Siapkan bahan-bahan yang dibutuhkan untuk membuat eco enzyme',
  },
  {
    label: 'Alat',
    title: 'Persiapan Alat',
    description: 'Siapkan peralatan yang diperlukan untuk proses pembuatan',
  },
  {
    label: 'Pembuatan',
    title: 'Proses Pembuatan',
    description: 'Ikuti langkah-langkah pembuatan eco enzyme',
  },
  {
    label: 'Perawatan',
    title: 'Perawatan & Fermentasi',
    description: 'Pelajari cara merawat eco enzyme selama proses fermentasi',
  },
  {
    label: 'Hasil',
    title: 'Hasil & Penggunaan',
    description: 'Panen hasil eco enzyme dan pelajari cara menggunakannya',
  },
]

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleBack = () => {
  router.push('/')
}

const handleLoginPrompt = () => {
  // Navigate ke halaman login
  router.push('/login')
}
</script>
