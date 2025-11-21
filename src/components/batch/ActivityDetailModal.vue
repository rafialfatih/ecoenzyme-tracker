<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Detail Aktivitas</h2>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 transition-colors">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <div v-if="activity" class="p-6 space-y-6">
        <div class="flex items-start gap-4">
          <div class="text-4xl">
            {{ activityStore.getActivityTypeIcon(activity.activity_type) }}
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {{ activityStore.getActivityTypeLabel(activity.activity_type) }}
            </h3>
            <p class="text-sm text-gray-500 flex items-center gap-2">
              <i class="fas fa-calendar-alt"></i>
              {{ formatDate(activity.activity_date) }}
            </p>
          </div>
        </div>

        <div v-if="activity.description">
          <h4 class="text-sm font-semibold text-gray-700 mb-2">Deskripsi</h4>
          <p class="text-gray-700 whitespace-pre-line bg-gray-50 rounded-lg p-4">
            {{ activity.description }}
          </p>
        </div>

        <div
          v-if="activity.activity_type === 'check_condition' && activity.condition"
          class="bg-blue-50 rounded-lg p-4 space-y-3"
        >
          <h4 class="text-sm font-semibold text-gray-900">Kondisi Eco Enzyme</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div v-if="activity.condition.color" class="flex items-center gap-2">
              <span class="text-gray-600 font-medium">Warna:</span>
              <span class="text-gray-900">{{ getColorLabel(activity.condition.color) }}</span>
            </div>
            <div v-if="activity.condition.smell" class="flex items-center gap-2">
              <span class="text-gray-600 font-medium">Aroma:</span>
              <span class="text-gray-900">{{ getSmellLabel(activity.condition.smell) }}</span>
            </div>
            <div v-if="activity.condition.bubbles !== undefined" class="flex items-center gap-2">
              <span class="text-gray-600 font-medium">Gelembung:</span>
              <span class="text-gray-900">{{
                activity.condition.bubbles ? 'Ada' : 'Tidak ada'
              }}</span>
            </div>
            <div v-if="activity.condition.mold !== undefined" class="flex items-center gap-2">
              <span class="text-gray-600 font-medium">Jamur:</span>
              <span
                class="font-medium"
                :class="activity.condition.mold ? 'text-red-600' : 'text-green-600'"
              >
                {{ activity.condition.mold ? 'Ada' : 'Tidak ada' }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="activity.photo_url">
          <h4 class="text-sm font-semibold text-gray-700 mb-2">Foto</h4>
          <div class="relative rounded-lg overflow-hidden border border-gray-200">
            <img
              :src="activity.photo_url"
              alt="Activity photo"
              class="w-full h-auto object-contain max-h-96 bg-gray-50"
              @error="handleImageError"
            />
          </div>
        </div>

        <div v-else class="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <i class="fas fa-image text-4xl text-gray-300 mb-2"></i>
          <p class="text-sm text-gray-500">Tidak ada foto untuk aktivitas ini</p>
        </div>
      </div>

      <div class="flex justify-end p-6 border-t">
        <button
          @click="handleClose"
          class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivityStore } from '@/stores/activity'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  activity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const activityStore = useActivityStore()

const formatDate = (dateString) => {
  if (!dateString) return '-'
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

const handleImageError = (event) => {
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  if (parent) {
    parent.innerHTML = `
      <div class="text-center py-8">
        <i class="fas fa-exclamation-triangle text-3xl text-red-400 mb-2"></i>
        <p class="text-sm text-red-600">Gagal memuat foto</p>
      </div>
    `
  }
}

const handleClose = () => {
  emit('close')
}
</script>
