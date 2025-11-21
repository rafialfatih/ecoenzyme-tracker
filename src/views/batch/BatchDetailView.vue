<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 md:ml-64 bg-gray-50">
      <div class="py-4 px-4 sm:py-6 sm:px-6 md:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div class="flex items-center gap-3">
              <button
                @click="handleBack"
                class="inline-flex items-center gap-2 text-gray-600 hover:text-eco-green-600 transition-colors text-sm sm:text-base"
              >
                <i class="fas fa-arrow-left"></i>
                <span class="font-medium">Kembali</span>
              </button>
            </div>
            <div v-if="batch" class="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                v-if="isActive"
                @click="handleEdit"
                class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-eco-green-600 hover:bg-eco-green-700 text-white text-xs sm:text-sm rounded-lg transition-colors"
              >
                <i class="fas fa-edit"></i>
                <span>Edit Batch</span>
              </button>
              <button
                @click="handleDelete"
                class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 text-xs sm:text-sm rounded-lg transition-colors"
              >
                <i class="fas fa-trash"></i>
                <span>Hapus</span>
              </button>
            </div>
          </div>

          <div
            v-if="isFetching"
            class="bg-white rounded-lg shadow-sm p-8 text-center flex flex-col items-center gap-4"
          >
            <div
              class="inline-block animate-spin w-8 h-8 border-4 border-eco-green-600 border-t-transparent rounded-full"
            ></div>
            <p class="text-gray-600">Memuat detail batch...</p>
          </div>

          <div v-else-if="!batch" class="bg-white rounded-lg shadow-sm p-8 text-center space-y-4">
            <h2 class="text-xl font-semibold text-gray-900">Batch tidak ditemukan</h2>
            <p class="text-gray-600">
              Kami tidak dapat menemukan data batch. Silakan coba kembali atau kembali ke halaman
              progress.
            </p>
            <div class="flex justify-center gap-3">
              <button
                @click="loadBatch"
                class="px-5 py-2 bg-eco-green-600 hover:bg-eco-green-700 text-white rounded-lg transition-colors"
              >
                Muat Ulang
              </button>
              <button
                @click="handleBack"
                class="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                Kembali
              </button>
            </div>
          </div>

          <div v-else class="space-y-6">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                      {{ batch.name }}
                    </h1>
                    <span
                      v-if="batch"
                      class="px-3 py-1 rounded-full text-xs font-semibold"
                      :class="statusBadgeClass"
                    >
                      {{ statusLabel }}
                    </span>
                  </div>
                  <p class="text-gray-600">
                    Lihat informasi lengkap batch dan kelola status fermentasi.
                  </p>
                </div>
                <div class="flex flex-col items-start md:items-end gap-2 text-sm text-gray-600">
                  <span class="flex items-center gap-2">
                    <i class="fas fa-calendar-alt"></i>
                    Mulai: {{ formatDate(batch.start_date) }}
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fas fa-calendar-check"></i>
                    Target selesai: {{ formatDate(batch.target_end_date) }}
                  </span>
                </div>
              </div>

              <div class="mt-6 space-y-4">
                <div>
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="text-gray-600">Progress Fermentasi</span>
                    <span class="font-semibold text-eco-green-600">
                      {{ progressDays }} / 90 hari ({{ progressPercentage }}%)
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div
                      class="h-3 rounded-full transition-all duration-300"
                      :class="isOverdue ? 'bg-red-500' : 'bg-eco-green-600'"
                      :style="{ width: progressPercentage + '%' }"
                    ></div>
                  </div>
                  <p v-if="isOverdue" class="text-xs text-red-600 mt-1">
                    ⚠️ Sudah melewati target 90 hari
                  </p>
                  <p v-else class="text-xs text-gray-500 mt-1">
                    Sisa {{ daysRemaining }} hari lagi
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-eco-green-50 border border-eco-green-100 rounded-lg p-4">
                    <p class="text-xs tracking-wide text-eco-green-700 mb-1">Volume</p>
                    <p class="text-2xl font-bold text-eco-green-700">{{ formattedVolume }} L</p>
                  </div>
                  <div class="bg-orange-50 border border-orange-100 rounded-lg p-4">
                    <p class="text-xs uppercase tracking-wide text-orange-700 mb-1">
                      Sampah Organik
                    </p>
                    <p class="text-2xl font-bold text-orange-700">{{ organicWaste }} g</p>
                  </div>
                  <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <p class="text-xs uppercase tracking-wide text-amber-700 mb-1">Gula Merah</p>
                    <p class="text-2xl font-bold text-amber-700">{{ sugar }} g</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white shadow rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Detail Batch</h2>
                <dl class="space-y-3 text-sm text-gray-700">
                  <div class="flex justify-between">
                    <dt class="font-medium text-gray-600">Nama</dt>
                    <dd class="text-gray-900">{{ batch.name }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="font-medium text-gray-600">Volume</dt>
                    <dd class="text-gray-900">{{ formattedVolume }} Liter</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="font-medium text-gray-600">Mulai</dt>
                    <dd class="text-gray-900">{{ formatDate(batch.start_date) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="font-medium text-gray-600">Target Selesai</dt>
                    <dd class="text-gray-900">{{ formatDate(batch.target_end_date) }}</dd>
                  </div>
                  <div v-if="batch.notes" class="pt-3 border-t border-gray-100">
                    <dt class="font-medium text-gray-600 mb-1">Catatan</dt>
                    <dd class="text-gray-700 whitespace-pre-line">
                      {{ batch.notes }}
                    </dd>
                  </div>
                  <div class="pt-3 border-t border-gray-100">
                    <dt class="font-medium text-gray-600 mb-2">Kondisi Batch</dt>
                    <dd>
                      <div
                        v-if="batchCondition"
                        class="p-3 rounded-lg"
                        :class="{
                          'bg-eco-green-50 border border-eco-green-200':
                            batchCondition.status === 'Aman' ||
                            batchCondition.status === 'Siap Panen',
                          'bg-yellow-50 border border-yellow-200':
                            batchCondition.status === 'Perlu Perhatian',
                          'bg-red-50 border border-red-200':
                            batchCondition.status === 'Potensi Gagal' ||
                            batchCondition.status === 'Gagal Fermentasi',
                          'bg-blue-50 border border-blue-200':
                            batchCondition.status === 'Fermentasi Berhasil',
                        }"
                      >
                        <div class="flex items-center gap-2 mb-2">
                          <span
                            class="px-3 py-1 rounded-full text-xs font-semibold"
                            :class="{
                              'bg-eco-green-600 text-white':
                                batchCondition.status === 'Aman' ||
                                batchCondition.status === 'Siap Panen',
                              'bg-yellow-500 text-white':
                                batchCondition.status === 'Perlu Perhatian',
                              'bg-red-600 text-white':
                                batchCondition.status === 'Potensi Gagal' ||
                                batchCondition.status === 'Gagal Fermentasi',
                              'bg-blue-600 text-white':
                                batchCondition.status === 'Fermentasi Berhasil',
                            }"
                          >
                            {{ batchCondition.status }}
                          </span>
                        </div>
                        <p
                          v-if="batchCondition.recommendation"
                          class="text-xs text-gray-600 whitespace-pre-line mt-2"
                        >
                          {{ batchCondition.recommendation }}
                        </p>
                      </div>
                      <p v-else class="text-xs text-gray-500">
                        Belum ada data kondisi. Lakukan pengecekan kondisi terlebih dahulu.
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>

              <div class="bg-white shadow rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Komposisi Bahan</h2>
                <div class="space-y-4">
                  <div
                    class="flex items-center justify-between bg-eco-green-50 border border-eco-green-100 rounded-lg p-4"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-800">Sampah Organik</p>
                      <p class="text-xs text-gray-500">Rasio standar 3 bagian</p>
                    </div>
                    <span class="text-lg font-semibold text-eco-green-700"
                      >{{ organicWaste }} g</span
                    >
                  </div>
                  <div
                    class="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-lg p-4"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-800">Gula Merah</p>
                      <p class="text-xs text-gray-500">Rasio standar 1 bagian</p>
                    </div>
                    <span class="text-lg font-semibold text-amber-700">{{ sugar }} g</span>
                  </div>
                  <div
                    class="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-4"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-800">Air Bersih</p>
                      <p class="text-xs text-gray-500">Rasio standar 10 bagian</p>
                    </div>
                    <span class="text-lg font-semibold text-blue-700">{{ water }} L</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="batch.status === 'failed' && batch.failure_reason"
              class="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <h3 class="text-sm font-semibold text-red-700 mb-2">Alasan Kegagalan</h3>
              <p class="text-sm text-red-600 whitespace-pre-line">
                {{ batch.failure_reason }}
              </p>
            </div>

            <div
              v-if="successMessage"
              class="bg-eco-green-50 border border-eco-green-200 p-4 rounded-lg"
            >
              <p class="text-sm text-eco-green-700 font-medium">{{ successMessage }}</p>
            </div>
            <div v-if="formError" class="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p class="text-sm text-red-600 font-medium">{{ formError }}</p>
            </div>

            <StatusActions
              v-if="isActive"
              :batch="batch"
              :batch-id="batchId"
              @status-updated="handleStatusUpdated"
              @error="handleStatusError"
            />

            <div class="bg-white shadow rounded-lg p-4 sm:p-6">
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6"
              >
                <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Timeline Aktivitas</h2>
                <button
                  v-if="isActive"
                  @click="openActivityModal"
                  class="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-eco-green-600 hover:bg-eco-green-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto"
                >
                  <i class="fas fa-plus"></i>
                  <span>Tambah Aktivitas</span>
                </button>
              </div>
              <ActivityList />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddActivityModal
      :is-open="isActivityModalOpen"
      :batch-id="batchId"
      @close="closeActivityModal"
      @success="handleActivityAdded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import StatusActions from '@/components/batch/StatusActions.vue'
import ActivityList from '@/components/batch/ActivityList.vue'
import AddActivityModal from '@/components/batch/AddActivityModal.vue'
import { useBatchStore } from '@/stores/batch'
import { useActivityStore } from '@/stores/activity'
import { evaluateBatchCondition } from '@/lib/batchCondition'

const router = useRouter()
const route = useRoute()
const batchStore = useBatchStore()
const activityStore = useActivityStore()

const successMessage = ref('')
const formError = ref(null)

const isFetching = ref(true)
const isActivityModalOpen = ref(false)

const batchId = computed(() => route.params.id)
const batch = computed(() => batchStore.currentBatch)

const progressDays = computed(() => (batch.value ? batchStore.getBatchProgress(batch.value) : 0))
const progressPercentage = computed(() =>
  batch.value ? batchStore.getBatchProgressPercentage(batch.value) : 0,
)
const daysRemaining = computed(() => (batch.value ? batchStore.getDaysRemaining(batch.value) : 0))
const isOverdue = computed(() => (batch.value ? batchStore.isBatchOverdue(batch.value) : false))
const isActive = computed(() => batch.value?.status === 'active')

const formattedVolume = computed(() => {
  if (!batch.value?.volume) return '0'
  return Number(batch.value.volume).toFixed(1)
})

const organicWaste = computed(() => {
  const ingredients = batch.value?.ingredients?.organic_waste?.weight
  if (ingredients) return ingredients
  const volume = Number(batch.value?.volume || 0)
  return Math.round(volume * 300)
})

const sugar = computed(() => {
  const ingredients = batch.value?.ingredients?.sugar?.weight
  if (ingredients) return ingredients
  const volume = Number(batch.value?.volume || 0)
  return Math.round(volume * 100)
})

const water = computed(() => {
  const ingredients = batch.value?.ingredients?.water?.volume
  if (ingredients) return Number(ingredients).toFixed(1)
  return formattedVolume.value
})

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

const batchCondition = computed(() => {
  return evaluateBatchCondition(batch.value, activityStore.activities, progressDays.value)
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const loadBatch = async () => {
  isFetching.value = true
  successMessage.value = ''
  formError.value = null
  batchStore.clearError()

  const result = await batchStore.fetchBatchById(batchId.value)
  if (!result.success) {
    formError.value = result.error || 'Gagal memuat detail batch.'
  } else {
    await activityStore.fetchActivitiesByBatch(batchId.value)
  }

  isFetching.value = false
}

const handleStatusUpdated = (data) => {
  successMessage.value = data.message
  formError.value = null

  loadBatch()
}

const handleStatusError = (error) => {
  formError.value = error
  successMessage.value = ''
}

const handleBack = () => {
  router.push('/dashboard/progress')
}

const handleEdit = () => {
  router.push({ name: 'batch-edit', params: { id: batchId.value } })
}

const openActivityModal = () => {
  isActivityModalOpen.value = true
}

const closeActivityModal = () => {
  isActivityModalOpen.value = false
}

const handleActivityAdded = async () => {
  await activityStore.fetchActivitiesByBatch(batchId.value)
}

const handleDelete = async () => {
  if (!batch.value) return

  if (confirm('Yakin ingin menghapus batch ini? Data tidak dapat dikembalikan.')) {
    const result = await batchStore.deleteBatch(batchId.value)
    if (result.success) {
      router.push('/dashboard/progress')
    } else {
      formError.value = result.error || 'Gagal menghapus batch.'
    }
  }
}

onMounted(loadBatch)

watch(
  () => batchStore.error,
  (error) => {
    if (error) {
      formError.value = error
    }
  },
)
</script>
