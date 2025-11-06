<template>
  <nav
    :class="[
      'bg-white shadow-md fixed w-full z-50 transition-transform duration-300',
      { '-translate-y-full': !isVisible },
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <router-link
          to="/"
          class="flex items-center gap-2 text-eco-green-600 font-semibold text-lg hover:text-eco-green-700"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-14a2 2 0 10-.001 3.999A2 2 0 0010 2zm0 5.5a2 2 0 100 4 2 2 0 000-4zm5.5-5.5a2 2 0 10-.001 3.999A2 2 0 0015.5 2zM15 8a2 2 0 100 4 2 2 0 000-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Eco Enzyme</span>
        </router-link>

        <!-- Navigation Links - Desktop -->
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

        <!-- User Actions -->
        <div class="flex items-center gap-4">
          <!-- User Menu - When Logged In -->
          <div v-if="isLoggedIn" class="relative" v-click-outside="closeUserMenu">
            <button
              @click="toggleUserMenu"
              class="flex items-center gap-2 text-gray-700 hover:text-eco-green-600 focus:outline-none"
            >
              <span class="text-sm font-medium">{{ user.name }}</span>
              <svg
                class="w-5 h-5"
                :class="{ 'transform rotate-180': isUserMenuOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
            >
              <router-link
                to="/dashboard"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-eco-green-50 hover:text-eco-green-600"
              >
                Dashboard
              </router-link>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-eco-green-50 hover:text-eco-green-600"
              >
                Keluar
              </button>
            </div>
          </div>

          <!-- Login/Register Buttons - When Logged Out -->
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

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-gray-500 hover:text-eco-green-600 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isVisible = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 50 // minimum scroll before triggering hide/show

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  const scrollDifference = currentScrollPosition - lastScrollPosition.value

  // Only update visibility after scrolling more than the threshold
  if (Math.abs(scrollDifference) > scrollThreshold) {
    // Scrolling down and not at the top -> hide
    if (scrollDifference > 0 && currentScrollPosition > 0) {
      isVisible.value = false
    }
    // Scrolling up -> show
    else if (scrollDifference < 0) {
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

// This would come from your auth store/service
const isLoggedIn = ref(false)
const user = ref({
  name: 'John Doe',
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

const handleLogout = () => {
  // Implement logout logic here
  console.log('Logging out...')
}

// Optional: Close menus when route changes
watch(route, () => {
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
})
</script>
