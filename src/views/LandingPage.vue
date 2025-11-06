<template>
  <div class="landing-page">
    <HeroSection />
    <AboutSection />
    <CTASection />
  </div>
</template>

<script setup>
import HeroSection from '../components/landing/HeroSection.vue'
import AboutSection from '../components/landing/AboutSection.vue'
import CTASection from '../components/landing/CTASection.vue'
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}
</style>
