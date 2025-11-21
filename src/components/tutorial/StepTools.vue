<template>
  <div class="space-y-6">
    <!-- Intro -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-check-circle text-2xl text-white"></i>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-1">Siapkan Peralatan</h3>
          <p class="text-sm text-gray-600">
            Pastikan semua peralatan bersih dan kering sebelum digunakan
          </p>
        </div>
      </div>
    </div>

    <!-- Checklist Alat -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Peralatan yang Dibutuhkan</h3>
      <div class="space-y-3">
        <!-- Wadah/Botol -->
        <label
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors cursor-pointer group"
        >
          <input
            type="checkbox"
            v-model="checklist.container"
            class="w-5 h-5 mt-0.5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500 cursor-pointer"
          />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-box text-2xl text-purple-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900">Wadah / Botol Plastik</h4>
            </div>
            <p class="text-sm text-gray-600 mb-2">
              Botol plastik bekas (air mineral, soft drink) atau wadah plastik food grade dengan
              tutup yang rapat
            </p>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 bg-eco-green-100 text-eco-green-700 rounded-full text-sm font-medium"
            >
              <span>Minimal kapasitas:</span>
              <span class="font-bold">1.5 Liter</span>
            </div>
          </div>
        </label>

        <!-- Corong -->
        <label
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors cursor-pointer group"
        >
          <input
            type="checkbox"
            v-model="checklist.funnel"
            class="w-5 h-5 mt-0.5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500 cursor-pointer"
          />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-filter text-2xl text-yellow-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900">Corong</h4>
            </div>
            <p class="text-sm text-gray-600">
              Untuk memudahkan memasukkan bahan ke dalam botol tanpa tumpah
            </p>
          </div>
        </label>

        <!-- Pisau / Gunting -->
        <label
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors cursor-pointer group"
        >
          <input
            type="checkbox"
            v-model="checklist.knife"
            class="w-5 h-5 mt-0.5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500 cursor-pointer"
          />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-cut text-2xl text-red-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900">Pisau / Gunting</h4>
            </div>
            <p class="text-sm text-gray-600">
              Untuk memotong sampah organik menjadi potongan kecil (2-3 cm)
            </p>
          </div>
        </label>

        <!-- Wadah Pencampuran -->
        <label
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors cursor-pointer group"
        >
          <input
            type="checkbox"
            v-model="checklist.mixingBowl"
            class="w-5 h-5 mt-0.5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500 cursor-pointer"
          />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-layer-group text-2xl text-indigo-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900">Wadah Pencampuran (Opsional)</h4>
            </div>
            <p class="text-sm text-gray-600">
              Mangkuk besar untuk mencampur gula dengan air sebelum dimasukkan ke botol
            </p>
          </div>
        </label>

        <!-- Sendok/Spatula -->
        <label
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors cursor-pointer group"
        >
          <input
            type="checkbox"
            v-model="checklist.spoon"
            class="w-5 h-5 mt-0.5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500 cursor-pointer"
          />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-spoon text-2xl text-pink-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900">Sendok</h4>
            </div>
            <p class="text-sm text-gray-600">Untuk mengaduk larutan gula agar tercampur rata</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Progress Checklist -->
    <div class="bg-gradient-to-r from-eco-green-50 to-eco-green-100 rounded-lg p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">Progress Persiapan</span>
        <span class="text-sm font-bold text-eco-green-600"
          >{{ completedItems }}/{{ totalItems }}</span
        >
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-eco-green-600 h-3 rounded-full transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <p class="text-xs text-gray-600 mt-2" v-if="progressPercentage < 100">
        Centang semua peralatan yang sudah Anda siapkan
      </p>
      <p class="text-xs text-eco-green-700 font-semibold mt-2" v-else>
        ✓ Semua peralatan sudah siap! Lanjut ke tahap berikutnya
      </p>
    </div>

    <!-- Tips Memilih Wadah -->
    <div class="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-star text-2xl text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-2">Tips Memilih Wadah</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Gunakan botol plastik <strong>PET atau HDPE</strong> yang food grade dan tahan
                asam</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span>Tutup botol harus <strong>rapat</strong> agar gas fermentasi tidak bocor</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span>Isi botol maksimal <strong>70-80%</strong> saja, sisakan ruang untuk gas</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Hindari wadah <strong>kaca atau metal</strong> karena bisa pecah/berkarat karena
                asam</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Pastikan wadah sudah <strong>dicuci bersih dan kering</strong> sebelum
                digunakan</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const checklist = ref({
  container: false,
  funnel: false,
  knife: false,
  mixingBowl: false,
  spoon: false,
})

const totalItems = computed(() => Object.keys(checklist.value).length)
const completedItems = computed(() => {
  return Object.values(checklist.value).filter((item) => item === true).length
})
const progressPercentage = computed(() => {
  return Math.round((completedItems.value / totalItems.value) * 100)
})
</script>
