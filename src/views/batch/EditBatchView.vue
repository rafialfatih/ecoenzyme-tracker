<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 md:ml-64 bg-gray-50">
      <div class="py-4 px-4 sm:py-6 sm:px-6 md:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <button
              @click="handleBack"
              class="inline-flex items-center gap-2 text-gray-600 hover:text-eco-green-600 transition-colors text-sm sm:text-base"
            >
              <i class="fas fa-arrow-left"></i>
              <span class="font-medium">Kembali</span>
            </button>
            <span
              v-if="batch"
              class="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold"
              :class="statusBadgeClass"
            >
              {{ statusLabel }}
            </span>
          </div>

          <div
            v-if="isFetching"
            class="bg-white shadow rounded-lg p-8 text-center flex flex-col items-center gap-4"
          >
            <div
              class="inline-block animate-spin w-8 h-8 border-4 border-eco-green-600 border-t-transparent rounded-full"
            ></div>
            <p class="text-gray-600">Memuat data batch...</p>
          </div>

          <div v-else-if="!batch" class="bg-white shadow rounded-lg p-8 text-center space-y-4">
            <h2 class="text-lg font-semibold text-gray-900">Batch tidak ditemukan</h2>
            <p class="text-gray-600">Silakan kembali dan coba pilih batch lain.</p>
            <button
              @click="handleBack"
              class="px-5 py-2 bg-eco-green-600 hover:bg-eco-green-700 text-white rounded-lg transition-colors"
            >
              Kembali
            </button>
          </div>

          <div v-else class="space-y-6">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6">
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Edit Batch</h1>
              <p class="text-gray-600 text-sm sm:text-base">
                Perbarui informasi dasar batch. Perubahan status dilakukan dari halaman detail
                batch.
              </p>
            </div>

            <div v-if="formError" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <p class="text-sm text-red-600 font-medium">{{ formError }}</p>
            </div>
            <div
              v-if="successMessage"
              class="bg-eco-green-50 border border-eco-green-200 rounded-lg p-4"
            >
              <p class="text-sm text-eco-green-700 font-medium">{{ successMessage }}</p>
            </div>

            <div class="bg-white shadow rounded-lg p-4 sm:p-6">
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
                    :disabled="isSubmitting"
                  />
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
                    :disabled="isSubmitting"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Target selesai akan disesuaikan otomatis 90 hari dari tanggal ini.
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Volume Wadah (Liter) <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="volume"
                    type="number"
                    min="0.5"
                    max="100"
                    step="0.1"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                    :disabled="isSubmitting"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Komposisi bahan akan dihitung ulang sesuai volume baru.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-eco-green-50 border border-eco-green-200 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Sampah Organik
                    </p>
                    <p class="text-xl font-semibold text-eco-green-700">{{ organicWaste }} g</p>
                  </div>
                  <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Gula Merah
                    </p>
                    <p class="text-xl font-semibold text-amber-700">{{ sugar }} g</p>
                  </div>
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Air Bersih
                    </p>
                    <p class="text-xl font-semibold text-blue-700">{{ water }} L</p>
                  </div>
                </div>

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
                    :disabled="isSubmitting"
                  ></textarea>
                </div>

                <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                  <button
                    type="button"
                    @click="resetForm"
                    class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                    :disabled="isSubmitting"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    :disabled="isSubmitting"
                  >
                    <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                    <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import { useBatchStore } from '@/stores/batch'
import DateInput from '@/components/DateInput.vue'

const router = useRouter()
const route = useRoute()
const batchStore = useBatchStore()

const batchId = computed(() => route.params.id)
const batch = computed(() => batchStore.currentBatch)

const formData = ref({
  name: '',
  start_date: '',
  notes: '',
})
const volume = ref(1)

const today = new Date().toISOString().split('T')[0]

const successMessage = ref('')
const formError = ref(null)
const isSubmitting = ref(false)
const isFetching = ref(true)

const statusLabel = computed(() => {
  if (!batch.value) return ''
  if (batch.value.status === 'active') return 'Aktif'
  if (batch.value.status === 'completed') return 'Selesai'
  if (batch.value.status === 'failed') return 'Gagal'
  return batch.value.status
})

const statusBadgeClass = computed(() => {
  if (!batch.value) return ''
  return {
    'bg-eco-green-100 text-eco-green-700': batch.value.status === 'active',
    'bg-blue-100 text-blue-700': batch.value.status === 'completed',
    'bg-red-100 text-red-700': batch.value.status === 'failed',
  }
})

const organicWaste = computed(() => Math.round(Number(volume.value || 0) * 300))
const sugar = computed(() => Math.round(Number(volume.value || 0) * 100))
const water = computed(() => Number(volume.value || 0).toFixed(1))

const loadBatch = async () => {
  isFetching.value = true
  successMessage.value = ''
  formError.value = null
  batchStore.clearError()

  const result = await batchStore.fetchBatchById(batchId.value)
  if (result.success) {
    initializeForm(result.data)
  } else {
    formError.value = result.error || 'Gagal memuat data batch.'
  }

  isFetching.value = false
}

const initializeForm = (data) => {
  if (!data) return
  formData.value = {
    name: data.name || '',
    start_date: data.start_date || today,
    notes: data.notes || '',
  }

  const parsedVolume = Number(data.volume)
  volume.value = Number.isFinite(parsedVolume) && parsedVolume > 0 ? parsedVolume : 1
}

const calculateTargetEndDate = (startDate) => {
  const parsed = new Date(startDate)
  if (Number.isNaN(parsed.getTime())) {
    return batch.value?.target_end_date || startDate
  }
  parsed.setDate(parsed.getDate() + 90)
  return parsed.toISOString().split('T')[0]
}

const handleSubmit = async () => {
  if (!batch.value) return

  isSubmitting.value = true
  successMessage.value = ''
  formError.value = null
  batchStore.clearError()

  const payload = {
    name: formData.value.name,
    start_date: formData.value.start_date,
    target_end_date: calculateTargetEndDate(formData.value.start_date),
    volume: Number(volume.value),
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
        volume: Number(volume.value),
        unit: 'liter',
      },
    },
    notes: formData.value.notes,
  }

  const result = await batchStore.updateBatch(batchId.value, payload)

  if (result.success) {
    successMessage.value = 'Batch berhasil diperbarui.'
    router.push({ name: 'batch-detail', params: { id: batchId.value } })
  } else {
    formError.value = result.error || 'Gagal memperbarui batch.'
  }

  isSubmitting.value = false
}

const resetForm = () => {
  initializeForm(batch.value)
}

const handleBack = () => {
  router.push({ name: 'batch-detail', params: { id: batchId.value } })
}

onMounted(loadBatch)
</script>
