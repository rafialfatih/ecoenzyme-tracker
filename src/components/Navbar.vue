<template>
  <nav
    v-if="!route.path.startsWith('/dashboard')"
    :class="[
      'bg-white shadow-md fixed w-full z-50 transition-transform duration-300',
      { '-translate-y-full': !isVisible },
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center h-16">
        <router-link
          to="/"
          class="flex items-center gap-2 text-eco-green-600 font-semibold text-lg hover:text-eco-green-700"
        >
          <img
            src="@/assets/images/gars-oneline.png"
            alt="Proses Pembuatan Eco Enzyme"
            class="w-48 h-48"
          />
        </router-link>

        <div class="hidden md:flex items-center gap-6">
          <router-link
            to="/"
            class="text-gray-600 hover:text-eco-green-600 font-medium transition-colors"
            :class="{ 'text-eco-green-600': route.path === '/' }"
          >
            Beranda
          </router-link>
          <router-link
            to="/tutorial"
            class="text-gray-600 hover:text-eco-green-600 font-medium transition-colors"
            :class="{ 'text-eco-green-600': route.path === '/tutorial' }"
          >
            Tutorial
          </router-link>
        </div>

        <div class="flex items-center gap-4">
          <div v-if="isLoggedIn" class="relative" v-click-outside="closeUserMenu">
            <button
              @click="toggleUserMenu"
              class="flex items-center gap-3 text-gray-700 hover:text-eco-green-600 focus:outline-none group"
            >
              <div
                class="w-8 h-8 rounded-full bg-eco-green-100 flex items-center justify-center border-2 border-eco-green-200 group-hover:border-eco-green-300"
              >
                <span class="text-sm font-medium text-eco-green-600">{{ userInitials }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="text-left">
                  <p class="text-sm font-medium leading-none">
                    {{ user?.user_metadata?.name || '' }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">{{ user?.email || '' }}</p>
                </div>
                <i
                  class="fas fa-chevron-down transition-transform duration-200"
                  :class="{ 'transform rotate-180': isUserMenuOpen }"
                ></i>
              </div>
            </button>

            <div
              v-show="isUserMenuOpen"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
            >
              <div class="px-4 py-2 border-b border-gray-100">
                <p class="text-xs text-gray-500">Selamat datang!</p>
              </div>
              <div class="py-1">
                <router-link
                  to="/dashboard"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-eco-green-50 hover:text-eco-green-600"
                >
                  <i class="fas fa-home"></i>
                  <span>Dashboard</span>
                </router-link>
              </div>
              <div class="border-t border-gray-100 py-1">
                <button
                  @click="handleLogout"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center gap-3">
            <router-link
              to="/login"
              class="text-gray-600 hover:text-eco-green-600 font-medium transition-colors"
            >
              Masuk
            </router-link>
            <router-link
              to="/register"
              class="bg-eco-green-600 text-white px-4 py-2 rounded-lg hover:bg-eco-green-700 transition-colors"
            >
              Daftar
            </router-link>
          </div>
        </div>

        <button
          @click="toggleMobileMenu"
          class="md:hidden text-gray-500 hover:text-eco-green-600 focus:outline-none"
        >
          <i v-if="!isMobileMenuOpen" class="fas fa-bars text-2xl"></i>
          <i v-else class="fas fa-times text-2xl"></i>
        </button>
      </div>

      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
        <div class="flex flex-col gap-4">
          <router-link
            to="/"
            class="text-gray-600 hover:text-eco-green-600 font-medium"
            :class="{ 'text-eco-green-600': route.path === '/' }"
          >
            Beranda
          </router-link>
          <router-link
            to="/tutorial"
            class="text-gray-600 hover:text-eco-green-600 font-medium"
            :class="{ 'text-eco-green-600': route.path === '/tutorial' }"
          >
            Tutorial
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isVisible = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 50

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  const scrollDifference = currentScrollPosition - lastScrollPosition.value

  if (Math.abs(scrollDifference) > scrollThreshold) {
    if (scrollDifference > 0 && currentScrollPosition > 0) {
      isVisible.value = false
    } else if (scrollDifference < 0) {
      isVisible.value = true
    }
    lastScrollPosition.value = currentScrollPosition
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isLoggedIn = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const userInitials = computed(() => {
  const name = user.value?.user_metadata?.name || ''
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    isUserMenuOpen.value = false
  }
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleLogout = async () => {
  try {
    await authStore.signOut()
    router.push('/')
    closeUserMenu()
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

watch(route, () => {
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
})
</script>
