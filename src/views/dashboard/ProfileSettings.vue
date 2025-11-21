<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 md:ml-64 bg-gray-50">
      <div class="py-4 px-4 sm:py-6 sm:px-6 md:px-8">
        <div class="max-w-3xl mx-auto">
          <!-- Header -->
          <div class="mb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p class="text-gray-600 mt-1 text-sm sm:text-base">Kelola informasi profil Anda</p>
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-6 bg-eco-green-50 border border-eco-green-200 p-4 rounded-lg"
          >
            <p class="text-sm text-eco-green-700 font-medium">{{ successMessage }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg">
            <p class="text-sm text-red-600 font-medium">{{ authStore.error }}</p>
          </div>

          <!-- Profile Form -->
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Informasi Profil</h2>

            <form @submit.prevent="handleUpdateProfile" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nama
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                  placeholder="Masukkan email Anda"
                />
              </div>

              <!-- Submit Button -->
              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  :disabled="authStore.loading"
                  class="flex-1 px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <i v-if="authStore.loading" class="fas fa-spinner fa-spin"></i>
                  <span>{{ authStore.loading ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Ubah Password</h2>

            <form @submit.prevent="handleUpdatePassword" class="space-y-6">
              <!-- Current Password -->
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Password Saat Ini
                </label>
                <input
                  id="currentPassword"
                  v-model="passwordData.currentPassword"
                  type="password"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                  placeholder="Masukkan password saat ini"
                />
              </div>

              <!-- New Password -->
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Password Baru
                </label>
                <input
                  id="newPassword"
                  v-model="passwordData.newPassword"
                  type="password"
                  minlength="6"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                  placeholder="Masukkan password baru (min. 6 karakter)"
                />
              </div>

              <!-- Confirm Password -->
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password Baru
                </label>
                <input
                  id="confirmPassword"
                  v-model="passwordData.confirmPassword"
                  type="password"
                  minlength="6"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-200 outline-none transition-colors"
                  placeholder="Konfirmasi password baru"
                />
                <p
                  v-if="
                    passwordData.newPassword &&
                    passwordData.confirmPassword &&
                    passwordData.newPassword !== passwordData.confirmPassword
                  "
                  class="text-xs text-red-600 mt-1"
                >
                  Password tidak cocok
                </p>
              </div>

              <!-- Submit Button -->
              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  :disabled="
                    authStore.loading ||
                    !passwordData.newPassword ||
                    passwordData.newPassword !== passwordData.confirmPassword
                  "
                  class="flex-1 px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <i v-if="authStore.loading" class="fas fa-spinner fa-spin"></i>
                  <span>{{ authStore.loading ? 'Mengubah...' : 'Ubah Password' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/dashboard/Sidebar.vue'

const authStore = useAuthStore()

const successMessage = ref('')
const formData = ref({
  name: '',
  email: '',
})

const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const user = computed(() => authStore.user)

onMounted(() => {
  // Load current user data
  if (user.value) {
    formData.value = {
      name: user.value.user_metadata?.name || '',
      email: user.value.email || '',
    }
  }
})

const handleUpdateProfile = async () => {
  authStore.clearError()
  successMessage.value = ''

  const updates = {}
  let emailChanged = false

  // Check if name changed
  if (formData.value.name !== (user.value?.user_metadata?.name || '')) {
    updates.name = formData.value.name
  }

  // Check if email changed
  if (formData.value.email !== user.value?.email) {
    emailChanged = true
  }

  // Update profile metadata
  if (Object.keys(updates).length > 0) {
    const result = await authStore.updateProfile(updates)
    if (!result.success) {
      return
    }
  }

  // Update email if changed
  if (emailChanged) {
    const result = await authStore.updateEmail(formData.value.email)
    if (!result.success) {
      return
    }
    successMessage.value =
      'Email berhasil diubah. Silakan cek email Anda untuk verifikasi email baru.'
  } else if (Object.keys(updates).length > 0) {
    successMessage.value = 'Profil berhasil diperbarui.'
  }

  // Clear form after success
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}

const handleUpdatePassword = async () => {
  authStore.clearError()
  successMessage.value = ''

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    authStore.error = 'Password tidak cocok'
    return
  }

  if (passwordData.value.newPassword.length < 6) {
    authStore.error = 'Password harus minimal 6 karakter'
    return
  }

  const result = await authStore.updatePassword(passwordData.value.newPassword)

  if (result.success) {
    successMessage.value = 'Password berhasil diubah.'
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }
}
</script>
