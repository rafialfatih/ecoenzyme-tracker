<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 md:ml-64 bg-gray-50">
      <div class="py-4 px-4 sm:py-6 sm:px-6 md:px-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>

          <div class="mt-6">
            <DashboardStatusCard
              :totalBatches="batchStore.totalBatches"
              :totalVolume="batchStore.totalVolume"
              :successRate="batchStore.successRate"
              :totalActiveBatches="batchStore.totalActiveBatches"
              :totalCompletedBatches="batchStore.totalCompletedBatches"
              :totalFailedBatches="batchStore.totalFailedBatches"
            />

            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Selamat datang, {{ user.name }}!
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Track progres pembuatan eco enzyme Anda di sini.
                </p>
              </div>

              <div class="border-t border-gray-200">
                <div v-if="batchStore.loading" class="px-4 py-8 text-center">
                  <div
                    class="inline-block animate-spin w-8 h-8 border-4 border-eco-green-600 border-t-transparent rounded-full"
                  ></div>
                  <p class="text-gray-600 mt-4">Memuat data...</p>
                </div>

                <div v-else-if="batchStore.batches.length === 0" class="px-4 py-8 text-center">
                  <div
                    class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <i class="fas fa-inbox text-3xl text-gray-400"></i>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Batch</h3>
                  <p class="text-gray-500 mb-4">
                    Mulai perjalanan eco enzyme Anda dengan membuat batch pertama
                  </p>
                  <button
                    @click="handleCreateBatch"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-eco-green-600 text-white rounded-lg hover:bg-eco-green-700 transition-colors"
                  >
                    <i class="fas fa-plus"></i>
                    <span>Buat Batch Baru</span>
                  </button>
                </div>

                <div v-else class="px-4 py-5">
                  <h4 class="font-semibold text-gray-900 mb-4">Batch Terbaru</h4>
                  <div class="space-y-3">
                    <div
                      v-for="batch in latestBatches"
                      :key="batch.id"
                      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      @click="viewBatch(batch.id)"
                      role="button"
                      tabindex="0"
                      @keydown.enter.prevent="viewBatch(batch.id)"
                      @keydown.space.prevent="viewBatch(batch.id)"
                    >
                      <div class="flex-1 min-w-0">
                        <h5 class="font-medium text-gray-900 truncate">{{ batch.name }}</h5>
                        <p class="text-sm text-gray-500">
                          Mulai: {{ new Date(batch.start_date).toLocaleDateString('id-ID') }}
                        </p>
                      </div>
                      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <span
                          class="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          :class="{
                            'bg-eco-green-100 text-eco-green-700': batch.status === 'active',
                            'bg-blue-100 text-blue-700': batch.status === 'completed',
                            'bg-red-100 text-red-700': batch.status === 'failed',
                          }"
                        >
                          {{
                            batch.status === 'active'
                              ? 'Aktif'
                              : batch.status === 'completed'
                                ? 'Selesai'
                                : 'Gagal'
                          }}
                        </span>
                        <span class="text-sm font-medium text-gray-600 whitespace-nowrap"
                          >{{ batch.volume }} L</span
                        >
                      </div>
                    </div>
                  </div>

                  <button
                    @click="handleCreateBatch"
                    class="mt-4 w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-eco-green-500 hover:text-eco-green-600 transition-colors"
                  >
                    + Buat Batch Baru
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBatchStore } from '@/stores/batch'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import DashboardStatusCard from '@/components/dashboard/DashboardStatusCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const batchStore = useBatchStore()

const user = computed(() => ({
  name: authStore.user?.user_metadata?.name || 'Pengguna',
}))

const latestBatches = computed(() => {
  return [...batchStore.batches]
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0)
      const dateB = new Date(b.created_at || 0)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)
})

onMounted(async () => {
  await batchStore.fetchBatches()
})

const handleCreateBatch = () => {
  router.push('/dashboard/create-batch')
}

const viewBatch = (id) => {
  router.push({ name: 'batch-detail', params: { id } })
}
</script>
