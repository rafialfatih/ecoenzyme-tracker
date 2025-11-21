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

    <!-- Reset Password Card -->
    <div class="relative w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-eco-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-lock text-3xl text-white"></i>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p class="text-gray-600">Masukkan password baru Anda</p>
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

        <!-- Invalid Token Message -->
        <div
          v-if="invalidToken"
          class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg"
        >
          <div class="flex items-center gap-3">
            <i class="fas fa-exclamation-circle text-red-600 flex-shrink-0"></i>
            <div>
              <p class="text-sm font-medium text-red-800">
                Link reset password tidak valid atau sudah kadaluarsa
              </p>
              <p class="text-xs text-red-600 mt-1">
                Silakan request link reset password baru
              </p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form
          v-if="!successMessage && !invalidToken"
          @submit.prevent="handleResetPassword"
          class="space-y-5"
        >
          <!-- New Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password Baru
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Min. 6 karakter"
                minlength="6"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors pr-12"
                :disabled="authStore.loading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i v-if="!showPassword" class="fas fa-eye"></i>
                <i v-else class="fas fa-eye-slash"></i>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">Password minimal 6 karakter</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password Baru
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="Ulangi password baru"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors pr-12"
                :class="{ 'border-red-300': confirmPassword && password !== confirmPassword }"
                :disabled="authStore.loading"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i v-if="!showConfirmPassword" class="fas fa-eye"></i>
                <i v-else class="fas fa-eye-slash"></i>
              </button>
            </div>
            <p
              v-if="confirmPassword && password !== confirmPassword"
              class="text-xs text-red-600 mt-1"
            >
              Password tidak sama
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="
              authStore.loading || (confirmPassword && password !== confirmPassword) || !password
            "
            class="w-full px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <i v-if="authStore.loading" class="fas fa-spinner fa-spin"></i>
            <span>{{ authStore.loading ? 'Memproses...' : 'Reset Password' }}</span>
          </button>
        </form>

        <!-- Back to Login -->
        <div v-if="successMessage || invalidToken" class="mt-6">
          <button
            @click="handleGoToLogin"
            class="w-full px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Kembali ke Login
          </button>
        </div>

        <div v-else class="mt-6 text-center">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const successMessage = ref('')
const invalidToken = ref(false)

onMounted(async () => {
  // Check if there's a hash fragment with access_token (from Supabase email link)
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  const type = hashParams.get('type')

  if (type === 'recovery' && accessToken) {
    // Supabase processes the recovery token automatically via the hash fragment
    // Wait a bit for Supabase to process it, then check the session
    setTimeout(async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error || !data.session) {
          invalidToken.value = true
        }
      } catch (err) {
        invalidToken.value = true
      }
    }, 1000)
  } else {
    // Check if we have a valid session (user might have already processed the token)
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        invalidToken.value = true
      }
    } catch (err) {
      invalidToken.value = true
    }
  }
})

const handleResetPassword = async () => {
  // Validate password match
  if (password.value !== confirmPassword.value) {
    return
  }

  authStore.clearError()
  const result = await authStore.updatePasswordWithToken(password.value)

  if (result.success) {
    successMessage.value = 'Password berhasil direset! Silakan login dengan password baru Anda.'
    password.value = ''
    confirmPassword.value = ''

    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }
}

const handleGoToLogin = () => {
  router.push('/login')
}
</script>

