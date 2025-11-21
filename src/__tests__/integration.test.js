import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useBatchStore } from '../stores/batch'
import { useActivityStore } from '../stores/activity'
import { calculateIngredients } from '../utils/batchCalculator'

// Mock Supabase - define all mocks inside the factory function
vi.mock('../lib/supabase', () => {
  const mockAuthSignUp = vi.fn()
  const mockAuthGetUser = vi.fn()
  const mockAuthSignIn = vi.fn()
  const mockStorageFrom = vi.fn()

  return {
    supabase: {
      auth: {
        signUp: mockAuthSignUp,
        getUser: mockAuthGetUser,
        signInWithPassword: mockAuthSignIn,
      },
      storage: {
        from: mockStorageFrom,
      },
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(),
          })),
        })),
      })),
    },
  }
})

// Import supabase after mock is set up
import { supabase } from '../lib/supabase'

describe('Integration Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('1. New User Registration', () => {
    it('should successfully register a new user', async () => {
      const authStore = useAuthStore()

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        user_metadata: { name: 'Test User' },
      }

      const mockSession = {
        access_token: 'mock-token',
        user: mockUser,
      }

      supabase.auth.signUp.mockResolvedValue({
        data: {
          user: mockUser,
          session: mockSession,
        },
        error: null,
      })

      const result = await authStore.signUp('test@example.com', 'password123', 'Test User')

      expect(result.success).toBe(true)
      expect(authStore.user).toEqual(mockUser)
      expect(authStore.session).toEqual(mockSession)
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        options: {
          data: {
            name: 'Test User',
          },
        },
      })
    })
  })

  describe('2. Make New Batch with Composition Calculator', () => {
    it('should create a new batch with calculated ingredients', async () => {
      const batchStore = useBatchStore()

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
      }

      supabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const mockBatch = {
        id: 'batch-123',
        user_id: 'user-123',
        name: 'Test Batch',
        start_date: '2026-01-01',
        target_end_date: '2026-03-31',
        volume: 1,
        ingredients: calculateIngredients(1),
        status: 'active',
      }

      const mockInsert = vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: mockBatch,
            error: null,
          }),
        })),
      }))

      supabase.from = vi.fn(() => ({
        insert: mockInsert,
      }))

      const batchData = {
        name: 'Test Batch',
        start_date: '2026-01-01',
        volume: 1,
        ingredients: calculateIngredients(1),
        notes: 'Test notes',
      }

      const result = await batchStore.createBatch(batchData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockBatch)
      expect(result.data.ingredients.organic_waste.weight).toBe(300)
      expect(result.data.ingredients.sugar.weight).toBe(100)
      expect(result.data.ingredients.water.volume).toBe(1)
      expect(result.data.target_end_date).toBe('2026-03-31')
    })

    it('should calculate ingredients correctly for different volumes', () => {
      // This test doesn't need Supabase, just testing the calculator function
      const volumes = [0.5, 1, 2, 5]

      for (const volume of volumes) {
        const ingredients = calculateIngredients(volume)

        expect(ingredients.organic_waste.weight).toBe(Math.round(volume * 300))
        expect(ingredients.sugar.weight).toBe(Math.round(volume * 100))
        expect(ingredients.water.volume).toBe(volume)
      }
    })
  })

  describe('3. Activity Photo Upload', () => {
    it('should successfully upload activity photo', async () => {
      const activityStore = useActivityStore()

      const mockUser = {
        id: 'user-123',
      }

      supabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      const mockUploadData = {
        path: 'user-123/1234567890.jpg',
      }

      const mockPublicUrl = 'https://example.com/storage/user-123/1234567890.jpg'

      const mockStorageUpload = vi.fn().mockResolvedValue({
        data: mockUploadData,
        error: null,
      })

      const mockStorageGetPublicUrl = vi.fn().mockReturnValue({
        data: {
          publicUrl: mockPublicUrl,
        },
      })

      supabase.storage.from.mockReturnValue({
        upload: mockStorageUpload,
        getPublicUrl: mockStorageGetPublicUrl,
      })

      const result = await activityStore.uploadPhoto(mockFile, mockUser.id)

      expect(result.success).toBe(true)
      expect(result.url).toBe(mockPublicUrl)
      expect(supabase.storage.from).toHaveBeenCalledWith('activity-photos')
      expect(mockStorageUpload).toHaveBeenCalled()
    })
  })

  describe('4. Filter Batch by Status', () => {
    it('should filter batches by active status', () => {
      const batchStore = useBatchStore()

      // Set up mock batches
      batchStore.batches = [
        { id: '1', name: 'Batch 1', status: 'active' },
        { id: '2', name: 'Batch 2', status: 'completed' },
        { id: '3', name: 'Batch 3', status: 'active' },
        { id: '4', name: 'Batch 4', status: 'failed' },
      ]

      const activeBatches = batchStore.activeBatches

      expect(activeBatches).toHaveLength(2)
      expect(activeBatches.every((b) => b.status === 'active')).toBe(true)
      expect(activeBatches.map((b) => b.id)).toEqual(['1', '3'])
    })

    it('should filter batches by completed status', () => {
      const batchStore = useBatchStore()

      batchStore.batches = [
        { id: '1', name: 'Batch 1', status: 'active' },
        { id: '2', name: 'Batch 2', status: 'completed' },
        { id: '3', name: 'Batch 3', status: 'completed' },
        { id: '4', name: 'Batch 4', status: 'failed' },
      ]

      const completedBatches = batchStore.completedBatches

      expect(completedBatches).toHaveLength(2)
      expect(completedBatches.every((b) => b.status === 'completed')).toBe(true)
      expect(completedBatches.map((b) => b.id)).toEqual(['2', '3'])
    })

    it('should filter batches by failed status', () => {
      const batchStore = useBatchStore()

      batchStore.batches = [
        { id: '1', name: 'Batch 1', status: 'active' },
        { id: '2', name: 'Batch 2', status: 'completed' },
        { id: '3', name: 'Batch 3', status: 'failed' },
        { id: '4', name: 'Batch 4', status: 'failed' },
      ]

      const failedBatches = batchStore.failedBatches

      expect(failedBatches).toHaveLength(2)
      expect(failedBatches.every((b) => b.status === 'failed')).toBe(true)
      expect(failedBatches.map((b) => b.id)).toEqual(['3', '4'])
    })

    it('should return all batches when no filter is applied', () => {
      const batchStore = useBatchStore()

      batchStore.batches = [
        { id: '1', name: 'Batch 1', status: 'active' },
        { id: '2', name: 'Batch 2', status: 'completed' },
        { id: '3', name: 'Batch 3', status: 'failed' },
      ]

      expect(batchStore.totalBatches).toBe(3)
      expect(batchStore.totalActiveBatches).toBe(1)
      expect(batchStore.totalCompletedBatches).toBe(1)
      expect(batchStore.totalFailedBatches).toBe(1)
    })
  })
})
