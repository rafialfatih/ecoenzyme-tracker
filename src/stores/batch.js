import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useBatchStore = defineStore('batch', () => {
  const batches = ref([])
  const currentBatch = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const activeBatches = computed(() => {
    return batches.value.filter((batch) => batch.status === 'active')
  })

  const completedBatches = computed(() => {
    return batches.value.filter((batch) => batch.status === 'completed')
  })

  const failedBatches = computed(() => {
    return batches.value.filter((batch) => batch.status === 'failed')
  })

  const totalBatches = computed(() => batches.value.length)

  const totalActiveBatches = computed(() => activeBatches.value.length)

  const totalCompletedBatches = computed(() => completedBatches.value.length)

  const totalFailedBatches = computed(() => failedBatches.value.length)

  const totalVolume = computed(() => {
    return completedBatches.value.reduce((sum, batch) => sum + parseFloat(batch.volume), 0)
  })

  const successRate = computed(() => {
    const finished = totalCompletedBatches.value + totalFailedBatches.value
    if (finished === 0) return 0
    return Math.round((totalCompletedBatches.value / finished) * 100)
  })

  const fetchBatches = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('batches')
        .select('*')
        .order('start_date', { ascending: false })

      if (fetchError) throw fetchError

      batches.value = data || []
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchBatchById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('batches')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      currentBatch.value = data
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const createBatch = async (batchData) => {
    loading.value = true
    error.value = null

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not authenticated')
      }

      const startDate = new Date(batchData.start_date)
      const targetEndDate = new Date(startDate)
      targetEndDate.setDate(targetEndDate.getDate() + 90)

      const newBatch = {
        user_id: user.id,
        name: batchData.name,
        start_date: batchData.start_date,
        target_end_date: targetEndDate.toISOString().split('T')[0],
        volume: batchData.volume,
        ingredients: batchData.ingredients,
        notes: batchData.notes || '',
        status: 'active',
      }

      const { data, error: createError } = await supabase
        .from('batches')
        .insert([newBatch])
        .select()
        .single()

      if (createError) throw createError

      batches.value.unshift(data)

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateBatch = async (id, updates) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('batches')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      const index = batches.value.findIndex((b) => b.id === id)
      if (index !== -1) {
        batches.value[index] = data
      }

      if (currentBatch.value?.id === id) {
        currentBatch.value = data
      }

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const deleteBatch = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase.from('batches').delete().eq('id', id)

      if (deleteError) throw deleteError

      batches.value = batches.value.filter((b) => b.id !== id)

      if (currentBatch.value?.id === id) {
        currentBatch.value = null
      }

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const completeBatch = async (id) => {
    return await updateBatch(id, { status: 'completed', failure_reason: null })
  }

  const failBatch = async (id, reason) => {
    return await updateBatch(id, { status: 'failed', failure_reason: reason })
  }

  const logBatchActivity = async (activityData) => {
    error.value = null

    try {
      const payload = {
        batch_id: activityData.batch_id,
        activity_date: activityData.activity_date,
        title: activityData.title,
        condition: activityData.condition,
        temperature: activityData.temperature,
        ph: activityData.ph,
        humidity: activityData.humidity,
        notes: activityData.notes,
      }

      const { data, error: insertError } = await supabase
        .from('batch_activities')
        .insert([payload])
        .select()
        .single()

      if (insertError) throw insertError

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  const getBatchProgress = (batch) => {
    if (!batch) return 0

    const startDate = new Date(batch.start_date)
    const today = new Date()
    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))

    return Math.min(Math.max(daysElapsed, 0), 90)
  }

  const getBatchProgressPercentage = (batch) => {
    const daysElapsed = getBatchProgress(batch)
    return Math.round((daysElapsed / 90) * 100)
  }

  const getDaysRemaining = (batch) => {
    if (!batch) return 0

    const daysElapsed = getBatchProgress(batch)
    return Math.max(90 - daysElapsed, 0)
  }

  const isBatchOverdue = (batch) => {
    if (!batch || batch.status !== 'active') return false

    const targetDate = new Date(batch.target_end_date)
    const today = new Date()

    return today > targetDate
  }

  const clearError = () => {
    error.value = null
  }

  const resetStore = () => {
    batches.value = []
    currentBatch.value = null
    loading.value = false
    error.value = null
  }

  return {
    batches,
    currentBatch,
    loading,
    error,
    activeBatches,
    completedBatches,
    failedBatches,
    totalBatches,
    totalActiveBatches,
    totalCompletedBatches,
    totalFailedBatches,
    totalVolume,
    successRate,
    fetchBatches,
    fetchBatchById,
    createBatch,
    updateBatch,
    deleteBatch,
    completeBatch,
    failBatch,
    logBatchActivity,
    getBatchProgress,
    getBatchProgressPercentage,
    getDaysRemaining,
    isBatchOverdue,
    clearError,
    resetStore,
  }
})
