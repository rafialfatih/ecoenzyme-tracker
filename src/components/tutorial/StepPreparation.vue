<template>
  <div class="space-y-6">
    <div class="bg-eco-green-50 border-2 border-eco-green-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-eco-green-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-building text-2xl text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-2">Volume Wadah</h3>
          <div class="flex items-end gap-3">
            <div>
              <label for="volume" class="block text-sm text-gray-600 mb-1"
                >Masukkan volume wadah yang diinginkan</label
              >
              <div class="flex items-center gap-2">
                <input
                  type="number"
                  id="volume"
                  v-model="desiredVolume"
                  min="0.5"
                  max="10"
                  step="0.5"
                  class="w-20 px-2 py-1 border-2 border-gray-300 rounded-md focus:border-eco-green-500 focus:ring-1 focus:ring-eco-green-500"
                />
                <span class="text-gray-600">liter</span>
              </div>
            </div>
            <div class="flex-1">
              <div class="text-sm text-gray-600">
                <p class="mb-1">Rasio 3:1:10</p>
                <p class="font-medium text-eco-green-700">
                  {{ organicWaste }}g sampah : {{ brownSugar }}g gula : {{ water }}ml air
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Container Info -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-info-circle text-2xl text-white"></i>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-2">Petunjuk Ukuran Wadah</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-0.5">•</span>
              <span
                >Gunakan wadah dengan ukuran 1.5x dari volume yang diinginkan (untuk ruang
                fermentasi)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-0.5">•</span>
              <span
                >Contoh: untuk {{ desiredVolume }}L eco enzyme, gunakan wadah
                {{ (desiredVolume * 1.5).toFixed(1) }}L</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-0.5">•</span>
              <span>Semakin besar volume, semakin lama waktu fermentasi yang dibutuhkan</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bahan-bahan -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Bahan yang Dibutuhkan</h3>
      <div class="space-y-3">
        <!-- Sampah Organik -->
        <div
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-apple-alt text-2xl text-orange-600"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-1">Sampah Organik</h4>
            <p class="text-sm text-gray-600 mb-2">
              Kulit buah (jeruk, nanas, apel) atau sisa sayuran segar
            </p>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold text-eco-green-600">{{ organicWaste }}</span>
              <span class="text-sm text-gray-500">gram</span>
            </div>
          </div>
        </div>

        <!-- Gula Merah -->
        <div
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-cube text-2xl text-amber-700"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-1">Gula Merah / Gula Aren</h4>
            <p class="text-sm text-gray-600 mb-2">Bisa juga pakai molase atau gula pasir biasa</p>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold text-eco-green-600">{{ brownSugar }}</span>
              <span class="text-sm text-gray-500">gram</span>
            </div>
          </div>
        </div>

        <!-- Air -->
        <div
          class="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-tint text-2xl text-blue-600"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-1">Air Bersih</h4>
            <p class="text-sm text-gray-600 mb-2">
              Air matang atau air keran yang sudah diendapkan
            </p>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold text-eco-green-600">{{ water }}</span>
              <span class="text-sm text-gray-500">ml</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips Card -->
    <div class="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-star text-2xl text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-2">Tips Memilih Bahan</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Pilih sampah organik yang <strong>segar</strong>, hindari yang sudah busuk atau
                berjamur</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Potong sampah organik menjadi <strong>potongan kecil</strong> (2-3 cm) agar lebih
                cepat fermentasi</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Gula merah lebih baik dari gula putih karena mengandung
                <strong>mineral</strong> lebih banyak</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-eco-green-600 mt-0.5">•</span>
              <span
                >Hindari air yang mengandung <strong>klorin tinggi</strong>, endapkan dulu 24 jam
                jika pakai air keran</span
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

const desiredVolume = ref(1)

const organicWaste = computed(() => Math.round(desiredVolume.value * 300))
const brownSugar = computed(() => Math.round(desiredVolume.value * 100))
const water = computed(() => Math.round(desiredVolume.value * 1000))
</script>
