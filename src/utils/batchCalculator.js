/**
 * Calculate ingredients based on volume using 3:1:10 ratio
 * @param {number} volume - Volume in liters
 * @returns {Object} Object containing calculated ingredients
 */
export function calculateIngredients(volume) {
  if (volume < 0) {
    throw new Error('Volume cannot be negative')
  }

  return {
    organic_waste: {
      weight: Math.round(volume * 300),
      unit: 'gram',
    },
    sugar: {
      weight: Math.round(volume * 100),
      unit: 'gram',
    },
    water: {
      volume: volume,
      unit: 'liter',
    },
  }
}

/**
 * Calculate target end date (90 days from start date)
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @returns {string} Target end date in YYYY-MM-DD format
 */
export function calculateTargetEndDate(startDate) {
  const parsed = new Date(startDate)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid date format')
  }
  parsed.setDate(parsed.getDate() + 90)
  return parsed.toISOString().split('T')[0]
}

/**
 * Validate volume input
 * @param {number} volume - Volume to validate
 * @returns {Object} Validation result with isValid and error message
 */
export function validateVolume(volume) {
  if (volume < 0) {
    return {
      isValid: false,
      error: 'Volume cannot be negative',
    }
  }

  if (volume === 0) {
    return {
      isValid: false,
      error: 'Volume must be greater than 0',
    }
  }

  if (typeof volume !== 'number' || isNaN(volume)) {
    return {
      isValid: false,
      error: 'Volume must be a valid number',
    }
  }

  return {
    isValid: true,
    error: null,
  }
}
