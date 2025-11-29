<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 ml-64 bg-gray-50">
      <div class="py-6 px-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Progress Tracking</h1>
              <p class="text-gray-600 mt-1">Pantau semua batch eco enzyme Anda</p>
            </div>
            <button
              @click="handleCreateBatch"
              class="flex items-center gap-2 px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              <i class="fas fa-plus"></i>
              <span>Batch Baru</span>
            </button>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-4 mb-4 space-y-4">
            <div>
              <p class="text-sm font-medium text-gray-700 mb-2">Filter Status:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="filter in filters"
                  :key="filter.value"
                  @click="activeFilter = filter.value"
                  class="px-4 py-2 rounded-lg font-medium transition-colors"
                  :class="
                    activeFilter === filter.value
                      ? 'bg-eco-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  "
                >
                  {{ filter.label }}
                  <span
                    class="ml-2 px-2 py-0.5 rounded-full text-xs"
                    :class="
                      activeFilter === filter.value
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    "
                  >
                    {{ getFilterCount(filter.value) }}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <p class="text-sm font-medium text-gray-700 mb-2">Filter Kondisi:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="filter in conditionFilters"
                  :key="filter.value"
                  @click="activeConditionFilter = filter.value"
                  class="px-4 py-2 rounded-lg font-medium transition-colors"
                  :class="
                    activeConditionFilter === filter.value
                      ? 'bg-eco-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  "
                >
                  {{ filter.label }}
                  <span
                    class="ml-2 px-2 py-0.5 rounded-full text-xs"
                    :class="
                      activeConditionFilter === filter.value
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    "
                  >
                    {{ getConditionFilterCount(filter.value) }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="relative max-w-md">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari batch berdasarkan nama..."
                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500 transition"
              />
            </div>
          </div>

          <div v-if="batchStore.loading" class="bg-white rounded-lg shadow-sm p-8 text-center">
            <div
              class="inline-block animate-spin w-8 h-8 border-4 border-eco-green-600 border-t-transparent rounded-full"
            ></div>
            <p class="text-gray-600 mt-4">Memuat data...</p>
          </div>

          <div
            v-else-if="filteredBatches.length === 0"
            class="bg-white rounded-lg shadow-sm p-8 text-center"
          >
            <div
              class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <i class="fas fa-inbox text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{
                activeFilter === 'all' ? 'Belum Ada Batch' : `Tidak Ada Batch ${getFilterLabel()}`
              }}
            </h3>
            <p class="text-gray-500 mb-4">
              {{ activeFilter === 'all' ? 'Mulai buat batch pertama Anda' : 'Coba filter lain' }}
            </p>
            <button
              v-if="activeFilter === 'all'"
              @click="handleCreateBatch"
              class="inline-flex items-center gap-2 px-6 py-3 bg-eco-green-600 text-white rounded-lg hover:bg-eco-green-700"
            >
              <i class="fas fa-plus"></i>
              <span>Buat Batch Baru</span>
            </button>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="batch in filteredBatches"
              :key="batch.id"
              class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 mb-1">{{ batch.name }}</h3>
                      <div class="flex items-center gap-4 text-sm text-gray-600">
                        <span class="flex items-center gap-1">
                          <i class="fas fa-calendar-alt"></i>
                          Mulai: {{ formatDate(batch.start_date) }}
                        </span>
                        <span class="flex items-center gap-1">
                          <i class="fas fa-flask"></i>
                          Volume: {{ batch.volume }} L
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span
                        class="px-3 py-1 rounded-full text-xs font-semibold"
                        :class="{
                          'bg-eco-green-100 text-eco-green-700': batch.status === 'active',
                          'bg-blue-100 text-blue-700': batch.status === 'completed',
                          'bg-red-100 text-red-700': batch.status === 'failed',
                        }"
                      >
                        {{ getStatusLabel(batch.status) }}
                      </span>
                      <span
                        v-if="batch.condition"
                        class="px-3 py-1 rounded-full text-xs font-semibold"
                        :class="getConditionBadgeClass(batch.condition)"
                      >
                        {{ batch.condition }}
                      </span>
                    </div>
                  </div>

                  <div v-if="batch.status === 'active'" class="mb-3">
                    <div class="flex items-center justify-between text-sm mb-2">
                      <span class="text-gray-600">Progress Fermentasi</span>
                      <span class="font-semibold text-eco-green-600">
                        {{ batchStore.getBatchProgress(batch) }} / 90 hari ({{
                          batchStore.getBatchProgressPercentage(batch)
                        }}%)
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                      <div
                        class="h-3 rounded-full transition-all duration-300"
                        :class="
                          batchStore.isBatchOverdue(batch) ? 'bg-red-500' : 'bg-eco-green-600'
                        "
                        :style="{ width: batchStore.getBatchProgressPercentage(batch) + '%' }"
                      ></div>
                    </div>
                    <p v-if="batchStore.isBatchOverdue(batch)" class="text-xs text-red-600 mt-1">
                      ⚠️ Sudah melewati target 90 hari
                    </p>
                    <p v-else class="text-xs text-gray-500 mt-1">
                      Sisa {{ batchStore.getDaysRemaining(batch) }} hari lagi
                    </p>
                  </div>

                  <!-- Completed/Failed Info -->
                  <div v-else>
                    <p class="text-sm text-gray-600">
                      Target selesai: {{ formatDate(batch.target_end_date) }}
                    </p>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2 lg:flex-col lg:items-stretch">
                  <button
                    @click="viewDetail(batch.id)"
                    class="flex-1 lg:flex-none px-4 py-2 bg-eco-green-600 hover:bg-eco-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Lihat Detail
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBatchStore } from '@/stores/batch'
import { evaluateBatchCondition } from '@/lib/batchCondition'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar.vue'

const router = useRouter()
const batchStore = useBatchStore()

const activeFilter = ref('all')
const activeConditionFilter = ref('all')
const searchQuery = ref('')
const allActivities = ref([])

const filters = [
  { label: 'Semua', value: 'all' },
  { label: 'Aktif', value: 'active' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Gagal', value: 'failed' },
]

const conditionFilters = [
  { label: 'Semua Kondisi', value: 'all' },
  { label: 'Aman', value: 'Aman' },
  { label: 'Perlu Perhatian', value: 'Perlu Perhatian' },
  { label: 'Siap Panen', value: 'Siap Panen' },
  { label: 'Potensi Gagal', value: 'Potensi Gagal' },
  { label: 'Gagal Fermentasi', value: 'Gagal Fermentasi' },
  { label: 'Fermentasi Berhasil', value: 'Fermentasi Berhasil' },
]

const batchesWithCondition = computed(() => {
  return batchStore.batches.map((batch) => {
    const batchActivities = allActivities.value.filter((a) => a.batch_id === batch.id)

    const progressDays = batchStore.getBatchProgress(batch)

    const condition = evaluateBatchCondition(batch, batchActivities, progressDays)

    return {
      ...batch,
      condition: condition?.status || null,
    }
  })
})

const filteredBatches = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return batchesWithCondition.value.filter((batch) => {
    const matchesFilter = activeFilter.value === 'all' || batch.status === activeFilter.value
    const matchesConditionFilter =
      activeConditionFilter.value === 'all' || batch.condition === activeConditionFilter.value
    const matchesSearch = query.length === 0 || batch.name?.toLowerCase().includes(query)

    return matchesFilter && matchesConditionFilter && matchesSearch
  })
})

const getFilterCount = (filter) => {
  if (filter === 'all') return batchStore.totalBatches
  if (filter === 'active') return batchStore.totalActiveBatches
  if (filter === 'completed') return batchStore.totalCompletedBatches
  if (filter === 'failed') return batchStore.totalFailedBatches
  return 0
}

const getConditionFilterCount = (conditionValue) => {
  let filtered = batchesWithCondition.value
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter((b) => b.status === activeFilter.value)
  }

  if (conditionValue === 'all') return filtered.length
  return filtered.filter((b) => b.condition === conditionValue).length
}

const getConditionBadgeClass = (condition) => {
  if (!condition) return 'bg-gray-100 text-gray-700'

  const classes = {
    Aman: 'bg-eco-green-100 text-eco-green-700',
    'Siap Panen': 'bg-eco-green-100 text-eco-green-700',
    'Perlu Perhatian': 'bg-yellow-100 text-yellow-700',
    'Potensi Gagal': 'bg-red-100 text-red-700',
    'Gagal Fermentasi': 'bg-red-100 text-red-700',
    'Fermentasi Berhasil': 'bg-blue-100 text-blue-700',
  }

  return classes[condition] || 'bg-gray-100 text-gray-700'
}

const getFilterLabel = () => {
  const filter = filters.find((f) => f.value === activeFilter.value)
  return filter?.label || ''
}

const getStatusLabel = (status) => {
  if (status === 'active') return 'Aktif'
  if (status === 'completed') return 'Selesai'
  if (status === 'failed') return 'Gagal'
  return status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const handleCreateBatch = () => {
  router.push('/dashboard/create-batch')
}

const viewDetail = (id) => {
  router.push({ name: 'batch-detail', params: { id } })
}

onMounted(async () => {
  await batchStore.fetchBatches()

  try {
    const { data, error: fetchError } = await supabase
      .from('activities')
      .select('*')
      .order('activity_date', { ascending: false })
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    if (data) {
      const sorted = data.sort((a, b) => {
        const dateA = new Date(a.activity_date)
        const dateB = new Date(b.activity_date)

        if (dateA.getTime() !== dateB.getTime()) {
          return dateB.getTime() - dateA.getTime() // Descending
        }

        const timeA = a.created_at ? new Date(a.created_at).getTime() : a.id
        const timeB = b.created_at ? new Date(b.created_at).getTime() : b.id
        return timeB - timeA
      })

      allActivities.value = sorted
    }
  } catch (error) {
    // Error fetching activities
  }
})
</script>
