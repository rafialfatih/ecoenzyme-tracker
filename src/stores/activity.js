import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref([])
  const loading = ref(false)
  const error = ref(null)
  const uploadingPhoto = ref(false)

  const sortActivitiesByDateAndTime = (activitiesArray) => {
    return [...activitiesArray].sort((a, b) => {
      const dateA = new Date(a.activity_date + 'T00:00:00')
      const dateB = new Date(b.activity_date + 'T00:00:00')
      const dateDiff = dateB.getTime() - dateA.getTime()

      if (dateDiff !== 0) {
        return dateDiff
      }

      if (a.created_at && b.created_at) {
        const timeA = new Date(a.created_at).getTime()
        const timeB = new Date(b.created_at).getTime()
        return timeB - timeA // Descending (newer times first)
      }

      if (a.created_at && !b.created_at) return -1
      if (!a.created_at && b.created_at) return 1

      return (b.id || 0) - (a.id || 0) // Descending
    })
  }

  const uploadPhoto = async (file, userId) => {
    uploadingPhoto.value = true
    error.value = null

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('File harus berupa gambar')
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Ukuran file maksimal 5MB')
      }

      const timestamp = Date.now()
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${timestamp}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage
        .from('activity-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('activity-photos').getPublicUrl(data.path)

      return { success: true, url: publicUrl }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      uploadingPhoto.value = false
    }
  }

  const deletePhoto = async (photoUrl) => {
    try {
      const urlParts = photoUrl.split('/activity-photos/')
      if (urlParts.length < 2) return { success: false }

      const filePath = urlParts[1]

      const { error: deleteError } = await supabase.storage
        .from('activity-photos')
        .remove([filePath])

      if (deleteError) throw deleteError

      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const fetchActivitiesByBatch = async (batchId) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('activities')
        .select('*')
        .eq('batch_id', batchId)

      if (fetchError) throw fetchError

      activities.value = sortActivitiesByDateAndTime(data || [])
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const createActivity = async (activityData, photoFile = null) => {
    loading.value = true
    error.value = null

    try {
      let photoUrl = null

      if (photoFile) {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const uploadResult = await uploadPhoto(photoFile, user.id)
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Gagal upload foto')
        }
        photoUrl = uploadResult.url
      }

      const newActivity = {
        batch_id: activityData.batch_id,
        activity_date: activityData.activity_date || new Date().toISOString().split('T')[0],
        activity_type: activityData.activity_type,
        description: activityData.description || '',
        condition: activityData.condition || {},
        photo_url: photoUrl,
      }

      const { data, error: createError } = await supabase
        .from('activities')
        .insert([newActivity])
        .select()
        .single()

      if (createError) throw createError

      // Add to activities and re-sort to maintain correct order
      activities.value.push(data)
      activities.value = sortActivitiesByDateAndTime(activities.value)

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateActivity = async (id, updates) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Update local state
      const index = activities.value.findIndex((a) => a.id === id)
      if (index !== -1) {
        activities.value[index] = data
      }

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const deleteActivity = async (id) => {
    loading.value = true
    error.value = null

    try {
      const activity = activities.value.find((a) => a.id === id)

      if (activity?.photo_url) {
        await deletePhoto(activity.photo_url)
      }

      const { error: deleteError } = await supabase.from('activities').delete().eq('id', id)

      if (deleteError) throw deleteError

      activities.value = activities.value.filter((a) => a.id !== id)

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const getActivityTypeLabel = (type) => {
    const labels = {
      open_lid: 'Buka Tutup Botol',
      check_condition: 'Cek Kondisi',
      remove_maggots: 'Buang Ulat',
      note: 'Catatan',
      harvest: 'Panen',
      other: 'Lainnya',
    }
    return labels[type] || type
  }

  const getActivityTypeIcon = (type) => {
    const icons = {
      open_lid: '🍶',
      check_condition: '🔍',
      remove_maggots: '🐛',
      note: '📝',
      harvest: '🫙',
      other: '📌',
    }
    return icons[type] || '📌'
  }

  const clearError = () => {
    error.value = null
  }

  const resetStore = () => {
    activities.value = []
    loading.value = false
    error.value = null
  }

  return {
    activities,
    loading,
    error,
    uploadingPhoto,
    uploadPhoto,
    deletePhoto,
    fetchActivitiesByBatch,
    createActivity,
    updateActivity,
    deleteActivity,
    getActivityTypeLabel,
    getActivityTypeIcon,
    clearError,
    resetStore,
  }
})
