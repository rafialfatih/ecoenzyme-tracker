<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Tambah Aktivitas</h2>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 transition-colors">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <div v-if="activityStore.error" class="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ activityStore.error }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Aktivitas <span class="text-red-500">*</span>
          </label>
          <DateInput v-model="formData.activity_date" required :max="today" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Jenis Aktivitas <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.activity_type"
            required
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
          >
            <option value="">Pilih jenis aktivitas</option>
            <option value="open_lid">🍶 Buka Tutup Botol</option>
            <option value="check_condition">🔍 Cek Kondisi</option>
            <option value="remove_maggots">🐛 Buang Ulat</option>
            <option value="note">📝 Catatan</option>
            <option value="harvest">🫙 Panen</option>
            <option value="other">📌 Lainnya</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Deskripsi </label>
          <textarea
            v-model="formData.description"
            rows="4"
            placeholder="Jelaskan aktivitas yang dilakukan..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Foto (Opsional) </label>

          <div v-if="!photoPreview" class="flex items-center justify-center w-full">
            <label
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <i class="fas fa-cloud-upload-alt text-4xl mb-2 text-gray-500"></i>
                <p class="mb-1 text-sm text-gray-500">
                  <span class="font-semibold">Klik untuk upload</span>
                </p>
                <p class="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
              </div>
              <input
                ref="fileInputRef"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handlePhotoSelect"
                :disabled="activityStore.loading || activityStore.uploadingPhoto"
              />
            </label>
          </div>

          <div v-else class="relative">
            <img :src="photoPreview" alt="Preview" class="w-full h-48 object-cover rounded-lg" />
            <button
              type="button"
              @click="removePhoto"
              class="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              :disabled="activityStore.loading || activityStore.uploadingPhoto"
            >
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <p v-if="activityStore.uploadingPhoto" class="text-xs text-eco-green-600 mt-2">
            📤 Uploading foto...
          </p>
          <div
            v-if="activityStore.error && activityStore.error.includes('foto')"
            class="text-xs text-red-600 mt-2"
          >
            {{ activityStore.error }}
          </div>
        </div>

        <div v-if="formData.activity_type === 'check_condition'" class="space-y-4">
          <h3 class="font-semibold text-gray-900">Kondisi Eco Enzyme</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Warna</label>
            <select
              v-model="formData.condition.color"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
            >
              <option value="">Pilih warna</option>
              <option value="light_brown">Coklat Muda</option>
              <option value="dark_brown">Coklat Tua</option>
              <option value="amber">Kuning Kecoklatan</option>
              <option value="cloudy">Keruh</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Aroma</label>
            <select
              v-model="formData.condition.smell"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
            >
              <option value="">Pilih aroma</option>
              <option value="fermented">Asam Fermentasi</option>
              <option value="citrus">Harum Jeruk</option>
              <option value="sweet">Manis</option>
              <option value="rotten">Busuk</option>
            </select>
          </div>

          <label class="block text-sm font-medium text-gray-700 mb-2">Kondisi</label>
          <div class="flex items-center gap-3">
            <input
              v-model="formData.condition.bubbles"
              type="checkbox"
              id="bubbles"
              class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
            />
            <label for="bubbles" class="text-sm font-medium text-gray-700">
              Ada gelembung gas
            </label>
          </div>

          <div class="flex items-center gap-3">
            <input
              v-model="formData.condition.mold"
              type="checkbox"
              id="mold"
              class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
            />
            <label for="mold" class="text-sm font-medium text-gray-700">
              Ada jamur/lapisan putih
            </label>
          </div>

          <div class="flex items-center gap-3">
            <input
              v-model="formData.condition.maggot"
              type="checkbox"
              id="maggot"
              class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
            />
            <label for="maggot" class="text-sm font-medium text-gray-700"> Ada ulat </label>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="handleClose"
            class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            :disabled="activityStore.loading"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="activityStore.loading"
            class="flex-1 px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <i v-if="activityStore.loading" class="fas fa-spinner fa-spin"></i>
            <span>{{ activityStore.loading ? 'Menyimpan...' : 'Simpan' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useActivityStore } from '@/stores/activity'
import DateInput from '@/components/DateInput.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  batchId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close', 'success'])

const activityStore = useActivityStore()

const today = new Date().toISOString().split('T')[0]

const formData = ref({
  activity_date: today,
  activity_type: '',
  description: '',
  condition: {
    color: '',
    smell: '',
    bubbles: false,
    mold: false,
    maggot: false,
  },
})

const photoPreview = ref(null)
const selectedPhoto = ref(null)
const fileInputRef = ref(null)

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      formData.value = {
        activity_date: today,
        activity_type: '',
        description: '',
        condition: {
          color: '',
          smell: '',
          bubbles: false,
          mold: false,
          maggot: false,
        },
      }
      photoPreview.value = null
      selectedPhoto.value = null
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
      activityStore.clearError()
    }
  },
)

const handlePhotoSelect = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    activityStore.error = 'File harus berupa gambar'
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    activityStore.error = 'Ukuran file maksimal 5MB'
    return
  }

  selectedPhoto.value = file

  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removePhoto = () => {
  photoPreview.value = null
  selectedPhoto.value = null

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleSubmit = async () => {
  const activityData = {
    batch_id: props.batchId,
    activity_date: formData.value.activity_date,
    activity_type: formData.value.activity_type,
    description: formData.value.description,
    condition: formData.value.activity_type === 'check_condition' ? formData.value.condition : {},
  }

  const result = await activityStore.createActivity(activityData, selectedPhoto.value)

  if (result.success) {
    emit('success')
    handleClose()
  }
}

const handleClose = () => {
  emit('close')
}
</script>
