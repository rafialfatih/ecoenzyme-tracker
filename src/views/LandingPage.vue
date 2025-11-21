<template>
  <div class="landing-page">
    <HeroSection
      :is-logged-in="isLoggedIn"
      @start-tutorial="handleStartTutorial"
      @login="handleLogin"
    />
    <AboutSection />
    <CTASection />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HeroSection from '../components/landing/HeroSection.vue'
import AboutSection from '../components/landing/AboutSection.vue'
import CTASection from '../components/landing/CTASection.vue'

const router = useRouter()
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

const handleStartTutorial = () => {
  router.push('/tutorial')
}

const handleLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}
</style>
