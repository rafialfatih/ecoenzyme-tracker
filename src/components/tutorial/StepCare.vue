<template>
  <div class="space-y-6">
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-heart text-2xl text-white"></i>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-1">Perawatan & Fermentasi</h3>
          <p class="text-sm text-gray-600">
            Proses fermentasi membutuhkan waktu 90 hari. Perawatan yang tepat akan menghasilkan eco
            enzyme berkualitas tinggi
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Timeline Fermentasi</h3>
      <div class="space-y-4">
        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-calendar-week text-2xl text-red-600"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Minggu 1-2: Fase Awal</h4>
            <p class="text-sm text-gray-600 mb-2">
              Gas CO2 mulai terbentuk, wadah akan mengembang. Buka tutup setiap hari untuk
              mengeluarkan gas berlebih.
            </p>
            <div class="bg-red-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700 mb-2">
                <strong>Perawatan Harian:</strong>
              </p>
              <ul class="text-xs text-gray-700 space-y-1 ml-4">
                <li>• Buka tutup wadah setiap hari selama 5-10 detik</li>
                <li>• Kocok wadah dengan lembut untuk mencampur bahan</li>
                <li>• Periksa apakah ada tanda-tanda kebocoran</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-calendar-alt text-2xl text-orange-600"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Minggu 3-4: Fase Aktif</h4>
            <p class="text-sm text-gray-600 mb-2">
              Fermentasi semakin aktif, banyak gelembung gas. Bau asam mulai tercium. Buka tutup
              botol bisa dilakukan 2-3 hari sekali.
            </p>
            <div class="bg-orange-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700 mb-2">
                <strong>Perawatan:</strong>
              </p>
              <ul class="text-xs text-gray-700 space-y-1 ml-4">
                <li>• Buka tutup botol setiap 2-3 hari sekali</li>
                <li>• Kocok wadah setiap kali buka tutup botol</li>
                <li>• Periksa warna dan bau, pastikan berbau asam, tidak busuk</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-eco-green-300 transition-colors"
        >
          <div
            class="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-calendar text-2xl text-yellow-600"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Bulan 2-3: Fase Stabilisasi</h4>
            <p class="text-sm text-gray-600 mb-2">
              Gas mulai berkurang, warna menjadi lebih gelap dan jernih. Sampah organik mulai
              terurai. Buka tutup botol seminggu sekali sudah cukup.
            </p>
            <div class="bg-yellow-50 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700 mb-2">
                <strong>Perawatan:</strong>
              </p>
              <ul class="text-xs text-gray-700 space-y-1 ml-4">
                <li>• Buka tutup botol seminggu sekali</li>
                <li>• Kocok wadah secara berkala</li>
                <li>• Biarkan proses fermentasi berjalan alami</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="flex items-start gap-4 p-5 bg-white border-2 border-eco-green-300 rounded-lg bg-eco-green-50"
        >
          <div
            class="w-16 h-16 bg-eco-green-600 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-check-circle text-2xl text-white"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-2">Setelah 90 Hari: Siap Panen</h4>
            <p class="text-sm text-gray-600 mb-2">
              Eco Enzyme sudah matang. Warna coklat keemasan, bau asam segar, tekstur jernih. Sampah
              organik sudah terurai sempurna.
            </p>
            <div class="bg-eco-green-100 rounded-lg p-3 mt-2">
              <p class="text-xs text-gray-700 mb-2">
                <strong>Tanda-tanda Eco Enzyme sudah matang:</strong>
              </p>
              <ul class="text-xs text-gray-700 space-y-1 ml-4">
                <li>
                  <i class="fas fa-check text-eco-green-700 mr-1"></i> Warna coklat keemasan atau
                  jernih
                </li>
                <li><i class="fas fa-check text-eco-green-700 mr-1"></i> Bau asam segar</li>
                <li>
                  <i class="fas fa-check text-eco-green-700 mr-1"></i> Tekstur jernih, tidak keruh
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-triangle-exclamation text-2xl text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-2">Hal Yang Harus Diperhatikan</h3>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span>1.</span>
                Bau Busuk
              </p>
              <p class="text-gray-700">
                Tanda fermentasi gagal. Kemungkinan sampah organik tidak segar atau wadah tidak
                tertutup rapat. Buang dan mulai ulang dengan bahan yang lebih segar.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span>2.</span>
                Muncul Ulat Belatung
              </p>
              <p class="text-gray-700">
                Normal terjadi. Cukup buang ulat belatung tersebut dan tutup kembali. Pastikan buka
                tutup botol dilakukan secara teratur.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span>3.</span>
                Jamur Putih di Permukaan
              </p>
              <p class="text-gray-700">
                Normal terjadi. Cukup buang jamur putih tersebut dan tutup kembali. Pastikan burping
                dilakukan secara teratur.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span>4.</span>
                Tidak Ada Gelembung Gas
              </p>
              <p class="text-gray-700">
                Bisa terjadi di bulan ke-2-3 (normal). Jika terjadi sejak awal, periksa apakah gula
                sudah larut dengan benar atau suhu terlalu rendah.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span>5.</span>
                Warna Terlalu Gelap/Hitam
              </p>
              <p class="text-gray-700">
                Bisa terjadi jika terlalu banyak sampah organik atau fermentasi terlalu lama. Masih
                bisa digunakan, tapi encerkan lebih banyak saat penggunaan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <i class="fas fa-star text-2xl text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-2">Tips Perawatan Optimal</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-purple-600 mt-0.5">•</span>
              <span
                >Gunakan <strong>reminder atau aplikasi tracking</strong> untuk tidak lupa jadwal
                burping</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-600 mt-0.5">•</span>
              <span
                >Jangan terlalu sering membuka tutup (bisa masuk kontaminan) kecuali untuk
                burping</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-600 mt-0.5">•</span>
              <span
                >Simpan di tempat yang <strong>konsisten suhunya</strong>, hindari perubahan suhu
                drastis</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-600 mt-0.5">•</span>
              <span
                >Jika perlu menambahkan sampah organik, lakukan di
                <strong>minggu pertama</strong> saja</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-600 mt-0.5">•</span>
              <span
                ><strong>Jangan panik</strong> jika ada perubahan warna atau bau ringan, itu bagian
                dari proses fermentasi</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
