<template>
  <div
    class="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-eco-green-100 flex items-center justify-center p-6"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-eco-green-500 rounded-full blur-3xl"></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-eco-green-300 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Forgot Password Card -->
    <div class="relative w-full max-w-md">
      <!-- Back Button -->
      <button
        @click="handleBack"
        class="flex items-center gap-2 text-gray-600 hover:text-eco-green-600 transition-colors mb-6"
      >
        <i class="fas fa-arrow-left"></i>
        <span class="font-medium">Kembali</span>
      </button>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-eco-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-key text-3xl text-white"></i>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Lupa Password?</h1>
          <p class="text-gray-600">
            Masukkan email Anda dan kami akan mengirimkan link untuk reset password
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-6 p-4 bg-eco-green-50 border-2 border-eco-green-200 rounded-lg"
        >
          <div class="flex items-center gap-3">
            <i class="fas fa-check-circle text-eco-green-600 flex-shrink-0"></i>
            <div>
              <p class="text-sm font-medium text-eco-green-800">{{ successMessage }}</p>
              <p class="text-xs text-eco-green-600 mt-1">
                Silakan cek email Anda untuk melanjutkan reset password
              </p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="authStore.error" class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <div class="flex items-center gap-3">
            <i class="fas fa-exclamation-circle text-red-600 flex-shrink-0"></i>
            <p class="text-sm text-red-600">{{ authStore.error }}</p>
          </div>
        </div>

        <!-- Form -->
        <form v-if="!successMessage" @submit.prevent="handleResetPassword" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="nama@email.com"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
              :disabled="authStore.loading"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <i v-if="authStore.loading" class="fas fa-spinner fa-spin"></i>
            <span>{{ authStore.loading ? 'Mengirim...' : 'Kirim Link Reset' }}</span>
          </button>
        </form>

        <!-- Back to Login -->
        <div v-if="!successMessage" class="mt-6 text-center">
          <p class="text-gray-600">
            Ingat password Anda?
            <button
              @click="handleGoToLogin"
              class="text-eco-green-600 hover:text-eco-green-700 font-semibold"
            >
              Login
            </button>
          </p>
        </div>

        <!-- Back to Login after success -->
        <div v-if="successMessage" class="mt-6">
          <button
            @click="handleGoToLogin"
            class="w-full px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const successMessage = ref('')

const handleResetPassword = async () => {
  authStore.clearError()
  const result = await authStore.resetPassword(email.value)

  if (result.success) {
    successMessage.value = 'Link reset password telah dikirim ke email Anda!'
    email.value = ''
  }
}

const handleBack = () => {
  router.push('/login')
}

const handleGoToLogin = () => {
  router.push('/login')
}
</script>

