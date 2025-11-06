import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import AboutSection from '../components/landing/AboutSection.vue'
import CTASection from '../components/landing/CTASection.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LandingPage,
    },
  ],
})

describe('LandingPage.vue', () => {
  it('renders all sections', () => {
    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findComponent(HeroSection).exists()).toBe(true)
    expect(wrapper.findComponent(AboutSection).exists()).toBe(true)
    expect(wrapper.findComponent(CTASection).exists()).toBe(true)
  })
})
