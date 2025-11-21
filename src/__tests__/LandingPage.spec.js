import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import LandingPage from '../views/LandingPage.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import AboutSection from '../components/landing/AboutSection.vue'
import CTASection from '../components/landing/CTASection.vue'

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: null },
        error: null,
      }),
    },
  },
}))

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
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders all sections', () => {
    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    expect(wrapper.findComponent(HeroSection).exists()).toBe(true)
    expect(wrapper.findComponent(AboutSection).exists()).toBe(true)
    expect(wrapper.findComponent(CTASection).exists()).toBe(true)
  })

  it('passes isLoggedIn prop to HeroSection', () => {
    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    const heroSection = wrapper.findComponent(HeroSection)
    expect(heroSection.exists()).toBe(true)
    expect(heroSection.props('isLoggedIn')).toBe(false)
  })
})
