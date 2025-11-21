import { describe, it, expect } from 'vitest'
import {
  calculateIngredients,
  calculateTargetEndDate,
  validateVolume,
} from '../utils/batchCalculator'

describe('Batch Calculator - Unit Tests', () => {
  describe('calculateIngredients', () => {
    it('should calculate ingredients correctly for 1L volume', () => {
      const result = calculateIngredients(1)

      expect(result.organic_waste.weight).toBe(300)
      expect(result.organic_waste.unit).toBe('gram')
      expect(result.sugar.weight).toBe(100)
      expect(result.sugar.unit).toBe('gram')
      expect(result.water.volume).toBe(1)
      expect(result.water.unit).toBe('liter')
    })

    it('should calculate ingredients correctly for 2L volume', () => {
      const result = calculateIngredients(2)

      expect(result.organic_waste.weight).toBe(600)
      expect(result.sugar.weight).toBe(200)
      expect(result.water.volume).toBe(2)
    })

    it('should calculate ingredients correctly for 0.5L volume', () => {
      const result = calculateIngredients(0.5)

      expect(result.organic_waste.weight).toBe(150)
      expect(result.sugar.weight).toBe(50)
      expect(result.water.volume).toBe(0.5)
    })

    it('should throw error for negative volume', () => {
      expect(() => calculateIngredients(-1)).toThrow('Volume cannot be negative')
    })
  })

  describe('calculateTargetEndDate', () => {
    it('should calculate target end date correctly (90 days from start)', () => {
      const startDate = '2026-01-01'
      const result = calculateTargetEndDate(startDate)

      expect(result).toBe('2026-04-01')
    })

    it('should handle year boundary correctly', () => {
      const startDate = '2025-10-15'
      const result = calculateTargetEndDate(startDate)

      expect(result).toBe('2026-01-13')
    })

    it('should throw error for invalid date format', () => {
      expect(() => calculateTargetEndDate('invalid-date')).toThrow('Invalid date format')
    })
  })

  describe('validateVolume', () => {
    it('should return error for negative volume', () => {
      const result = validateVolume(-1)

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Volume cannot be negative')
    })

    it('should return error for zero volume', () => {
      const result = validateVolume(0)

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Volume must be greater than 0')
    })

    it('should return error for non-number input', () => {
      const result = validateVolume('not-a-number')

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Volume must be a valid number')
    })

    it('should return valid for positive number', () => {
      const result = validateVolume(1)

      expect(result.isValid).toBe(true)
      expect(result.error).toBeNull()
    })

    it('should return valid for decimal number', () => {
      const result = validateVolume(1.5)

      expect(result.isValid).toBe(true)
      expect(result.error).toBeNull()
    })
  })
})
