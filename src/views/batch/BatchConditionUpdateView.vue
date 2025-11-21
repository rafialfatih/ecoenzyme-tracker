<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 md:ml-64 bg-gray-50">
      <div class="py-4 px-4 sm:py-6 sm:px-6 md:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="mb-6">
            <button
              @click="handleBack"
              class="flex items-center gap-2 text-gray-600 hover:text-eco-green-600 transition-colors mb-4 text-sm sm:text-base"
            >
              <i class="fas fa-arrow-left"></i>
              <span class="font-medium">Kembali</span>
            </button>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Log Aktivitas</h1>
                <p class="text-gray-600 text-sm sm:text-base truncate">{{ batch?.name || 'Loading...' }}</p>
              </div>
              <button
                @click="openModal"
                class="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors w-full sm:w-auto"
              >
                <i class="fas fa-plus"></i>
                <span>Tambah Aktivitas</span>
              </button>
            </div>
          </div>

          <!-- Batch Info Card -->
          <div v-if="batch" class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">{{ batch.name }}</h2>
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <i class="fas fa-calendar-alt"></i>
                    Hari ke-{{ batchStore.getBatchProgress(batch) }}
                  </span>
                  <span
                    class="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold w-fit"
                    :class="{
                      'bg-eco-green-100 text-eco-green-700': batch.status === 'active',
                      'bg-blue-100 text-blue-700': batch.status === 'completed',
                      'bg-red-100 text-red-700': batch.status === 'failed',
                    }"
                  >
                    {{ getStatusLabel(batch.status) }}
                  </span>
                </div>
              </div>
              <div class="text-left sm:text-right">
                <p class="text-xs sm:text-sm text-gray-600">Total Aktivitas</p>
                <p class="text-2xl sm:text-3xl font-bold text-eco-green-600">
                  {{ activityStore.activities.length }}
                </p>
              </div>
            </div>
          </div>

          <!-- Activity List -->
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-6">Timeline Aktivitas</h2>
            <ActivityList />
          </div>
        </div>
      </div>
    </div>

    <!-- Add Activity Modal -->
    <AddActivityModal
      :is-open="isModalOpen"
      :batch-id="batchId"
      @close="closeModal"
      @success="handleActivityAdded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import ActivityList from '@/components/batch/ActivityList.vue'
import AddActivityModal from '@/components/batch/AddActivityModal.vue'
import { useBatchStore } from '@/stores/batch'
import { useActivityStore } from '@/stores/activity'

const route = useRoute()
const router = useRouter()
const batchStore = useBatchStore()
const activityStore = useActivityStore()

const isModalOpen = ref(false)

const batchId = computed(() => route.params.id)
const batch = computed(() => batchStore.currentBatch)

const getStatusLabel = (status) => {
  if (status === 'active') return 'Aktif'
  if (status === 'completed') return 'Selesai'
  if (status === 'failed') return 'Gagal'
  return status
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleActivityAdded = async () => {
  // Refresh activities after adding new one
  await activityStore.fetchActivitiesByBatch(batchId.value)
}

const handleBack = () => {
  router.push({ name: 'batch-detail', params: { id: batchId.value } })
}

onMounted(async () => {
  // Fetch batch info
  await batchStore.fetchBatchById(batchId.value)

  // Fetch activities for this batch
  await activityStore.fetchActivitiesByBatch(batchId.value)
})
</script>
