import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')

  const signUp = async (email, password, name) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      })

      if (signUpError) throw signUpError

      user.value = data.user
      session.value = data.session

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      user.value = data.user
      session.value = data.session

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    error.value = null

    try {
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) throw signOutError

      user.value = null
      session.value = null

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    loading.value = true

    try {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        user.value = data.session.user
        session.value = data.session
      }
    } catch (err) {
      console.error('Error checking auth:', err)
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (updates) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: updates,
      })

      if (updateError) throw updateError

      // Update local user state
      if (data.user) {
        user.value = data.user
      }

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateEmail = async (newEmail) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      })

      if (updateError) throw updateError

      // Update local user state
      if (data.user) {
        user.value = data.user
      }

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (newPassword) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) throw updateError

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email) => {
    loading.value = true
    error.value = null

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) throw resetError

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updatePasswordWithToken = async (newPassword) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) throw updateError

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const initAuthListener = () => {
    supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession) {
        user.value = currentSession.user
        session.value = currentSession
      } else {
        user.value = null
        session.value = null
      }
    })
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    userEmail,
    signUp,
    signIn,
    signOut,
    checkAuth,
    updateProfile,
    updateEmail,
    updatePassword,
    resetPassword,
    updatePasswordWithToken,
    clearError,
    initAuthListener,
  }
})
