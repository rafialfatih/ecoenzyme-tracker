<template>
  <div class="space-y-4">
    <!-- Loading State -->
    <div v-if="activityStore.loading" class="text-center py-8">
      <div
        class="inline-block animate-spin w-8 h-8 border-4 border-eco-green-600 border-t-transparent rounded-full"
      ></div>
      <p class="text-gray-600 mt-4">Memuat aktivitas...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="activityStore.activities.length === 0" class="text-center py-8">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-clipboard-list text-3xl text-gray-400"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Aktivitas</h3>
      <p class="text-gray-500">Mulai catat aktivitas untuk batch ini</p>
    </div>

    <!-- Activity Timeline -->
    <div v-else class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

      <!-- Activity Items -->
      <div
        v-for="(activity, index) in activityStore.activities"
        :key="activity.id"
        class="relative pl-20 pb-8 last:pb-0"
      >
        <!-- Timeline Dot -->
        <div
          class="absolute left-5 top-0 w-6 h-6 rounded-full border-4 border-white"
          :class="{
            'bg-eco-green-500': activity.activity_type === 'open_lid',
            'bg-blue-500': activity.activity_type === 'check_condition',
            'bg-yellow-500': activity.activity_type === 'remove_maggots',
            'bg-amber-500': activity.activity_type === 'note',
            'bg-purple-500': activity.activity_type === 'harvest',
            'bg-gray-500': activity.activity_type === 'other',
          }"
        ></div>

        <!-- Activity Card -->
        <div
          class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="openDetailModal(activity)"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{
                activityStore.getActivityTypeIcon(activity.activity_type)
              }}</span>
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ activityStore.getActivityTypeLabel(activity.activity_type) }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ formatDate(activity.activity_date) }}
                </p>
              </div>
            </div>

            <!-- Delete Button -->
            <button
              @click.stop="handleDelete(activity.id)"
              class="text-gray-400 hover:text-red-600 transition-colors"
              title="Hapus aktivitas"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <!-- Description -->
          <p v-if="activity.description" class="text-gray-700 mb-3">
            {{ activity.description }}
          </p>

          <!-- Condition Details (if check_condition) -->
          <div
            v-if="activity.activity_type === 'check_condition' && activity.condition"
            class="bg-blue-50 rounded-lg p-3 space-y-2"
          >
            <h5 class="text-sm font-semibold text-gray-900">Kondisi:</h5>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div v-if="activity.condition.color">
                <span class="text-gray-600">Warna:</span>
                <span class="ml-2 font-medium">{{ getColorLabel(activity.condition.color) }}</span>
              </div>
              <div v-if="activity.condition.smell">
                <span class="text-gray-600">Aroma:</span>
                <span
                  class="ml-2 font-medium"
                  :class="activity.condition.smell == 'rotten' ? 'text-red-600' : 'text-green-600'"
                  >{{ getSmellLabel(activity.condition.smell) }}</span
                >
              </div>
              <div v-if="activity.condition.bubbles !== undefined">
                <span class="text-gray-600">Gelembung:</span>
                <span class="ml-2 font-medium">{{
                  activity.condition.bubbles ? 'Ada' : 'Tidak ada'
                }}</span>
              </div>
              <div v-if="activity.condition.mold !== undefined">
                <span class="text-gray-600">Jamur:</span>
                <span
                  class="ml-2 font-medium"
                  :class="activity.condition.mold ? 'text-red-600' : 'text-green-600'"
                >
                  {{ activity.condition.mold ? 'Ada' : 'Tidak ada' }}
                </span>
              </div>
              <div v-if="activity.condition.maggot !== undefined">
                <span class="text-gray-600">Ulat:</span>
                <span
                  class="ml-2 font-medium"
                  :class="activity.condition.maggot ? 'text-red-600' : 'text-green-600'"
                >
                  {{ activity.condition.maggot ? 'Ada' : 'Tidak ada' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Detail Modal -->
    <ActivityDetailModal
      :is-open="isDetailModalOpen"
      :activity="selectedActivity"
      @close="closeDetailModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useActivityStore } from '@/stores/activity'
import ActivityDetailModal from './ActivityDetailModal.vue'

const activityStore = useActivityStore()

const isDetailModalOpen = ref(false)
const selectedActivity = ref(null)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const getColorLabel = (color) => {
  const labels = {
    light_brown: 'Coklat Muda',
    dark_brown: 'Coklat Tua',
    amber: 'Kuning Kecoklatan',
    cloudy: 'Keruh',
  }
  return labels[color] || color
}

const getSmellLabel = (smell) => {
  const labels = {
    fermented: 'Asam Fermentasi',
    citrus: 'Harum Jeruk',
    sweet: 'Manis',
    rotten: 'Busuk',
  }
  return labels[smell] || smell
}

const openDetailModal = (activity) => {
  selectedActivity.value = activity
  isDetailModalOpen.value = true
}

const closeDetailModal = () => {
  isDetailModalOpen.value = false
  selectedActivity.value = null
}

const handleDelete = async (id) => {
  if (confirm('Yakin ingin menghapus aktivitas ini?')) {
    await activityStore.deleteActivity(id)
  }
}
</script>
