<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Perbarui Status Batch</h2>
    <p class="text-sm text-gray-600 mb-4">
      Tandai batch ini sebagai selesai atau gagal sesuai hasil fermentasi Anda.
    </p>

    <div class="flex flex-col md:flex-row gap-4">
      <button
        class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        @click="handleStatusChange('completed')"
        :disabled="batch.status === 'completed' || isStatusUpdating"
      >
        <i class="fas fa-check"></i>
        <span>
          {{ batch.status === 'completed' ? 'Sudah Selesai' : 'Tandai Selesai' }}
        </span>
      </button>

      <button
        class="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 disabled:bg-red-50 text-red-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        @click="handleStatusChange('failed')"
        :disabled="batch.status === 'failed' || isStatusUpdating"
      >
        <i class="fas fa-times"></i>
        <span>
          {{ batch.status === 'failed' ? 'Sudah Gagal' : 'Tandai Gagal' }}
        </span>
      </button>
    </div>

    <p v-if="isStatusUpdating" class="text-sm text-gray-500 mt-3">
      Memperbarui status...
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBatchStore } from '@/stores/batch'

const props = defineProps({
  batch: {
    type: Object,
    required: true,
  },
  batchId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['status-updated', 'error'])

const batchStore = useBatchStore()
const isStatusUpdating = ref(false)

const handleStatusChange = async (status) => {
  if (!props.batch || props.batch.status === status) return

  let failureReason = null

  if (status === 'failed') {
    const reason = window.prompt('Masukkan alasan kegagalan batch:', '')
    if (!reason || reason.trim().length === 0) {
      window.alert('Alasan kegagalan wajib diisi.')
      return
    }
    failureReason = reason.trim()
  } else {
    const confirmMessage = 'Tandai batch ini sebagai selesai?'
    if (!window.confirm(confirmMessage)) {
      return
    }
  }

  isStatusUpdating.value = true

  let result
  if (status === 'completed') {
    result = await batchStore.completeBatch(props.batchId)
  } else if (status === 'failed') {
    result = await batchStore.failBatch(props.batchId, failureReason)
  }

  if (result?.success) {
    emit('status-updated', {
      status,
      message:
        status === 'completed'
          ? 'Status batch diperbarui menjadi selesai.'
          : 'Status batch diperbarui menjadi gagal.',
    })
  } else {
    emit('error', result?.error || 'Gagal memperbarui status batch.')
  }

  isStatusUpdating.value = false
}
</script>

