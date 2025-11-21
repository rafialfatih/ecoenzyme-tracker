<template>
  <div class="space-y-6">
    <!-- Intro -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-flask text-2xl text-white"></i>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-1">Proses Pembuatan</h3>
          <p class="text-sm text-gray-600">
            Ikuti langkah-langkah berikut dengan urutan yang benar untuk hasil terbaik
          </p>
        </div>
      </div>
    </div>

    <!-- Steps -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Langkah-langkah Pembuatan</h3>
      <div class="space-y-4">
        <!-- Step 1 -->
        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-eco-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          >
            1
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Siapkan Larutan Gula</h4>
            <p class="text-sm text-gray-600 mb-2">
              Larutkan gula merah/aren ke dalam air. Aduk hingga gula benar-benar larut dan tidak
              ada butiran gula yang tersisa.
            </p>
            <div class="bg-eco-green-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700">
                <i class="fas fa-lightbulb text-eco-green-600 mr-1"></i>
                <strong>Tips:</strong> Gunakan air hangat untuk mempercepat proses pelarutan gula
              </p>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-eco-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          >
            2
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Potong Sampah Organik</h4>
            <p class="text-sm text-gray-600 mb-2">
              Potong sampah organik (kulit buah/sayuran) menjadi potongan kecil berukuran 2-3 cm.
              Semakin kecil potongannya, semakin cepat proses fermentasi.
            </p>
            <div class="bg-amber-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700">
                <i class="fas fa-exclamation-triangle text-amber-600 mr-1"></i>
                <strong>Penting:</strong> Pastikan sampah organik masih segar, hindari yang sudah
                busuk atau berjamur
              </p>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-eco-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          >
            3
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Masukkan Bahan ke Wadah</h4>
            <p class="text-sm text-gray-600 mb-2">
              Masukkan bahan ke dalam wadah dengan urutan:
              <strong>Gula → Sampah Organik → Air</strong>. Gunakan corong untuk memudahkan proses.
            </p>
            <div class="bg-blue-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700">
                <i class="fas fa-info-circle text-blue-600 mr-1"></i>
                <strong>Urutan Penting:</strong> Gula di bawah, sampah di tengah, air di atas. Ini
                membantu proses fermentasi lebih optimal
              </p>
            </div>
          </div>
        </div>

        <!-- Step 4 -->
        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-eco-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          >
            4
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Tutup Rapat dan Beri Label</h4>
            <p class="text-sm text-gray-600 mb-2">
              Tutup wadah dengan rapat. Beri label dengan tanggal pembuatan dan volume. Jangan lupa
              sisakan ruang 20-30% untuk gas fermentasi.
            </p>
            <div class="bg-red-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700">
                <i class="fas fa-exclamation-circle text-red-600 mr-1"></i>
                <strong>Peringatan:</strong> Jangan tutup terlalu rapat di minggu pertama, buka
                sedikit setiap hari untuk melepas gas
              </p>
            </div>
          </div>
        </div>

        <!-- Step 5 -->
        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-eco-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          >
            5
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Simpan di Tempat yang Tepat</h4>
            <p class="text-sm text-gray-600 mb-2">
              Simpan wadah di tempat yang sejuk, kering, dan terhindar dari sinar matahari langsung.
              Suhu ideal adalah 20-30°C.
            </p>
            <div class="bg-purple-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700">
                <i class="fas fa-home text-purple-600 mr-1"></i>
                <strong>Lokasi Terbaik:</strong> Dapur, gudang, atau ruangan dengan sirkulasi udara
                yang baik
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Checklist -->
    <div class="bg-gradient-to-r from-eco-green-50 to-eco-green-100 rounded-lg p-4">
      <h3 class="font-semibold text-gray-900 mb-3">Checklist Proses Pembuatan</h3>
      <div class="space-y-2">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="checklist.sugarDissolved"
            class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
          />
          <span class="text-sm text-gray-700">Gula sudah larut sempurna</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="checklist.organicCut"
            class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
          />
          <span class="text-sm text-gray-700">Sampah organik sudah dipotong kecil (2-3 cm)</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="checklist.correctOrder"
            class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
          />
          <span class="text-sm text-gray-700">Urutan bahan sudah benar (Gula → Sampah → Air)</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="checklist.properSpace"
            class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
          />
          <span class="text-sm text-gray-700">Wadah masih memiliki ruang 20-30% untuk gas</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="checklist.labeled"
            class="w-5 h-5 text-eco-green-600 border-gray-300 rounded focus:ring-eco-green-500"
          />
          <span class="text-sm text-gray-700">Wadah sudah diberi label tanggal pembuatan</span>
        </label>
      </div>
      <div class="mt-4 pt-4 border-t border-eco-green-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Progress</span>
          <span class="text-sm font-bold text-eco-green-600"
            >{{ completedItems }}/{{ totalItems }}</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-eco-green-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Important Notes -->
    <div class="bg-red-50 border-2 border-red-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-exclamation-triangle text-2xl text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-2">Hal yang Harus Dihindari</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-red-600 mt-0.5">•</span>
              <span>Jangan gunakan wadah kaca atau logam</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-600 mt-0.5">•</span>
              <span>Jangan tutup terlalu rapat di minggu pertama</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-600 mt-0.5">•</span>
              <span>Jangan simpan di tempat yang terkena sinar matahari langsung</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-600 mt-0.5">•</span>
              <span>Jangan gunakan sampah organik yang sudah busuk atau berjamur</span>
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
  sugarDissolved: false,
  organicCut: false,
  correctOrder: false,
  properSpace: false,
  labeled: false,
})

const totalItems = computed(() => Object.keys(checklist.value).length)
const completedItems = computed(() => {
  return Object.values(checklist.value).filter((item) => item === true).length
})
const progressPercentage = computed(() => {
  return Math.round((completedItems.value / totalItems.value) * 100)
})
</script>
