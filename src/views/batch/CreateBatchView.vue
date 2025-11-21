<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 md:ml-64 bg-gray-50">
      <div class="py-4 px-4 sm:py-6 sm:px-6 md:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="mb-6">
            <button
              @click="handleBack"
              class="flex items-center gap-2 text-gray-600 hover:text-eco-green-600 transition-colors mb-4 text-sm sm:text-base"
            >
              <i class="fas fa-arrow-left"></i>
              <span class="font-medium">Kembali</span>
            </button>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Buat Batch Baru</h1>
            <p class="text-gray-600 mt-2 text-sm sm:text-base">
              Mulai tracking eco enzyme batch Anda
            </p>
          </div>

          <div class="bg-white shadow rounded-lg p-4 sm:p-6">
            <div
              v-if="batchStore.error"
              class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <i class="fas fa-exclamation-circle text-red-600 flex-shrink-0"></i>
                <p class="text-sm text-red-600">{{ batchStore.error }}</p>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Batch <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="Contoh: Batch Jeruk #1"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                  autocomplete="off"
                  :disabled="batchStore.loading"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Berikan nama yang mudah diingat untuk batch Anda
                </p>
              </div>

              <div>
                <label for="start_date" class="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai <span class="text-red-500">*</span>
                </label>
                <DateInput
                  id="start_date"
                  v-model="formData.start_date"
                  required
                  :max="today"
                  :disabled="batchStore.loading"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Target selesai otomatis 90 hari dari tanggal ini
                </p>
              </div>

              <div class="bg-eco-green-50 border-2 border-eco-green-200 rounded-lg p-4">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 bg-eco-green-600 rounded-full flex items-center justify-center"
                  >
                    <i class="fas fa-calculator text-2xl text-white"></i>
                  </div>
                  <h3 class="font-semibold text-gray-900">Kalkulator Takaran</h3>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Volume Wadah <span class="text-red-500">*</span>
                  </label>
                  <div class="flex items-center gap-4">
                    <input
                      v-model.number="volume"
                      type="number"
                      min="0.5"
                      max="10"
                      step="0.5"
                      required
                      class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                      :disabled="batchStore.loading"
                    />
                    <span class="text-gray-600 font-medium">Liter</span>
                  </div>
                </div>

                <div class="bg-white rounded-lg p-4 space-y-3">
                  <p class="text-sm font-medium text-gray-700 mb-3">
                    Takaran untuk {{ volume }} liter:
                  </p>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"
                      >
                        <i class="fas fa-apple-alt text-white"></i>
                      </div>
                      <span class="text-sm text-gray-700">Sampah Organik</span>
                    </div>
                    <span class="text-lg font-bold text-eco-green-600">{{ organicWaste }} g</span>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-cube text-white"></i>
                      </div>
                      <span class="text-sm text-gray-700">Gula Merah</span>
                    </div>
                    <span class="text-lg font-bold text-eco-green-600">{{ sugar }} g</span>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-tint text-white"></i>
                      </div>
                      <span class="text-sm text-gray-700">Air Bersih</span>
                    </div>
                    <span class="text-lg font-bold text-eco-green-600">{{ water }} L</span>
                  </div>
                </div>
              </div>

              <!-- Notes (Optional) -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  id="notes"
                  v-model="formData.notes"
                  rows="4"
                  placeholder="Tambahkan catatan tentang batch ini..."
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors resize-none"
                  :disabled="batchStore.loading"
                ></textarea>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  type="button"
                  @click="handleBack"
                  class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                  :disabled="batchStore.loading"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="batchStore.loading"
                  class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-eco-green-600 hover:bg-eco-green-700 disabled:bg-gray-400 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <i v-if="batchStore.loading" class="fas fa-spinner fa-spin"></i>
                  <span>{{ batchStore.loading ? 'Menyimpan...' : 'Buat Batch' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBatchStore } from '@/stores/batch'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import DateInput from '@/components/DateInput.vue'

const router = useRouter()
const batchStore = useBatchStore()

const formData = ref({
  name: '',
  start_date: new Date().toISOString().split('T')[0],
  notes: '',
})

const volume = ref(1)

const today = new Date().toISOString().split('T')[0]

const organicWaste = computed(() => Math.round(volume.value * 300))
const sugar = computed(() => Math.round(volume.value * 100))
const water = computed(() => volume.value)

const handleSubmit = async () => {
  const batchData = {
    name: formData.value.name,
    start_date: formData.value.start_date,
    volume: volume.value,
    ingredients: {
      organic_waste: {
        weight: organicWaste.value,
        unit: 'gram',
      },
      sugar: {
        weight: sugar.value,
        unit: 'gram',
      },
      water: {
        volume: water.value,
        unit: 'liter',
      },
    },
    notes: formData.value.notes,
  }

  const result = await batchStore.createBatch(batchData)

  if (result.success) {
    router.push('/dashboard')
  }
}

const handleBack = () => {
  router.push('/dashboard')
}
</script>
