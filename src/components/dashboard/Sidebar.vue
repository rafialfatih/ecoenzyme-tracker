<template>
  <button
    @click="toggleMobileMenu"
    class="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
  >
    <i class="fas fa-bars text-xl"></i>
  </button>

  <div
    v-if="isMobileMenuOpen"
    @click="closeMobileMenu"
    class="md:hidden fixed inset-0 bg-black/50 z-40"
  ></div>

  <div
    :class="[
      'min-h-screen w-64 bg-white shadow-lg fixed left-0 top-0 z-40 transition-transform duration-300',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between h-16 border-b border-gray-200 px-4">
        <router-link to="/" class="text-xl font-bold text-eco-green-600">
          <img
            src="@/assets/images/gars-twoline.png"
            alt="Proses Pembuatan Eco Enzyme"
            class="w-32 h-32"
          />
        </router-link>
        <button @click="closeMobileMenu" class="md:hidden text-gray-500 hover:text-gray-700">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center px-4 py-2">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 rounded-full bg-eco-green-600 flex items-center justify-center text-white"
            >
              {{ userInitials }}
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">
              {{ user?.user_metadata?.name || 'User' }}
            </p>
            <p class="text-xs text-gray-500">{{ user?.email }}</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 pt-4">
        <router-link
          to="/dashboard"
          class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          :class="{ 'bg-gray-100': $route.path === '/dashboard' }"
        >
          <span class="ml-2">Dashboard</span>
        </router-link>
        <router-link
          to="/dashboard/progress"
          class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          :class="{ 'bg-gray-100': $route.path === '/dashboard/progress' }"
        >
          <span class="ml-2">Progress Tracking</span>
        </router-link>
      </nav>

      <div class="border-t border-gray-200">
        <router-link
          to="/dashboard/profile"
          class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          :class="{ 'bg-gray-100': $route.path === '/dashboard/profile' }"
        >
          <span class="ml-2">Profile Settings</span>
        </router-link>
        <div class="p-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

router.afterEach(() => {
  closeMobileMenu()
})

const handleResize = () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const userInitials = computed(() => {
  const name = user.value?.user_metadata?.name || ''
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const handleLogout = async () => {
  try {
    const { success } = await authStore.signOut()
    if (success) {
      router.push('/')
    }
  } catch (error) {
    // Logout error handling
  }
}
</script>
