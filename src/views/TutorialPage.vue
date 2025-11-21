<template>
  <div class="tutorial-page min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between">
          <button
            @click="handleBack"
            class="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-eco-green-600 transition-colors text-sm sm:text-base"
          >
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium hidden xs:inline">Kembali</span>
          </button>

          <h1
            class="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate max-w-[50%] sm:max-w-none"
          >
            Tutorial Eco Enzyme
          </h1>

          <div class="w-12 sm:w-20"></div>
        </div>
      </div>
    </header>

    <div class="bg-white border-b overflow-x-auto">
      <div class="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div class="flex items-center justify-between max-w-4xl mx-auto min-w-max sm:min-w-0">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center flex-shrink-0"
            :class="{ 'flex-1': index < steps.length - 1 }"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-all text-sm sm:text-base"
                :class="
                  currentStep > index
                    ? 'bg-eco-green-600 text-white'
                    : currentStep === index
                      ? 'bg-eco-green-600 text-white ring-2 sm:ring-4 ring-eco-green-100'
                      : 'bg-gray-200 text-gray-500'
                "
              >
                <span v-if="currentStep > index">
                  <i class="fas fa-check text-xs sm:text-sm"></i>
                </span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="text-[10px] xs:text-xs mt-1 sm:mt-2 font-medium hidden xs:block"
                :class="currentStep >= index ? 'text-eco-green-600' : 'text-gray-400'"
              >
                {{ step.label }}
              </span>
            </div>

            <div
              v-if="index < steps.length - 1"
              class="flex-1 h-0.5 sm:h-1 mx-2 sm:mx-4 rounded min-w-[20px] sm:min-w-0"
              :class="currentStep > index ? 'bg-eco-green-600' : 'bg-gray-200'"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 flex-1 flex flex-col">
      <div class="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div
          class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 md:p-8 flex-1 flex flex-col overflow-y-auto"
        >
          <div class="flex-shrink-0">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {{ steps[currentStep].title }}
            </h2>
            <p class="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
              {{ steps[currentStep].description }}
            </p>
          </div>

          <div class="flex-1 overflow-y-auto">
            <!-- Step Components -->
            <StepPreparation v-if="currentStep === 0" />
            <StepTools v-else-if="currentStep === 1" />
            <StepMaking v-else-if="currentStep === 2" />
            <StepCare v-else-if="currentStep === 3" />
            <StepResults v-else-if="currentStep === 4" />
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="mt-4 sm:mt-6 flex-shrink-0">
          <div
            class="flex flex-col sm:flex-row gap-3 sm:gap-0"
            :class="
              currentStep > 0 && currentStep < steps.length - 1
                ? 'sm:justify-between'
                : currentStep === steps.length - 1 && isLoggedIn
                  ? 'sm:justify-between'
                  : 'sm:justify-center'
            "
          >
            <button
              v-if="currentStep > 0 && currentStep < steps.length - 1"
              @click="prevStep"
              class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors text-sm sm:text-base"
            >
              Sebelumnya
            </button>

            <button
              v-if="currentStep === steps.length - 1"
              @click="prevStep"
              class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors text-sm sm:text-base"
            >
              Sebelumnya
            </button>

            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
            >
              Selanjutnya
            </button>

            <button
              v-if="currentStep === steps.length - 1 && isLoggedIn"
              @click="handleCreateBatch"
              :disabled="isLoading"
              class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <i v-if="!isLoading" class="fas fa-save"></i>
              <i v-else class="fas fa-spinner fa-spin"></i>
              <span v-if="!isLoading">Simpan Batch</span>
              <span v-else>Menyimpan...</span>
            </button>
          </div>

          <div
            v-if="currentStep === steps.length - 1 && !isLoggedIn"
            class="bg-gradient-to-r from-eco-green-50 to-eco-green-100 rounded-lg sm:rounded-xl p-4 sm:p-6 mt-4 sm:mt-6 text-center"
          >
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Ingin Tracking Progress Anda?
            </h3>
            <p class="text-sm sm:text-base text-gray-600 mb-4">
              Login untuk menyimpan batch eco enzyme Anda, mendapatkan reminder otomatis, dan
              tracking progress hingga 90 hari!
            </p>
            <button
              @click="handleLoginPrompt"
              class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <i class="fas fa-sign-in-alt"></i>
              <span>Login / Daftar Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import StepPreparation from '@/components/tutorial/StepPreparation.vue'
import StepTools from '@/components/tutorial/StepTools.vue'
import StepMaking from '@/components/tutorial/StepMaking.vue'
import StepCare from '@/components/tutorial/StepCare.vue'
import StepResults from '@/components/tutorial/StepResults.vue'
import { useAuthStore } from '@/stores/auth'
import { useBatchStore } from '@/stores/batch'

const router = useRouter()
const currentStep = ref(0)

const authStore = useAuthStore()
const batchStore = useBatchStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)
const isLoading = ref(false)

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
  router.push('/login')
}

const handleCreateBatch = async () => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  isLoading.value = true

  try {
    const today = new Date().toISOString().split('T')[0]
    const defaultVolume = 1

    const batchData = {
      name: `Batch Tutorial - ${new Date().toLocaleDateString('id-ID')}`,
      start_date: today,
      volume: defaultVolume,
      ingredients: {
        organic_waste: {
          weight: Math.round(defaultVolume * 300),
          unit: 'gram',
        },
        sugar: {
          weight: Math.round(defaultVolume * 100),
          unit: 'gram',
        },
        water: {
          volume: defaultVolume,
          unit: 'liter',
        },
      },
      notes: 'Batch dibuat dari tutorial eco enzyme',
    }

    const result = await batchStore.createBatch(batchData)

    if (result.success) {
      router.push('/dashboard')
    } else {
      alert(result.error || 'Gagal membuat batch. Silakan coba lagi.')
    }
  } catch (error) {
    alert(error.message || 'Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isLoading.value = false
  }
}
</script>
