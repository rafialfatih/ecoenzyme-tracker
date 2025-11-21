<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
    <div class="bg-white shadow rounded-lg p-6 border-2 border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Batch</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">
            {{ props.totalBatches }}
          </p>
        </div>
        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-layer-group text-2xl text-gray-600"></i>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6 border-2 border-amber-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Produksi</p>
          <p class="text-3xl font-bold text-amber-600 mt-2">{{ props.totalVolume.toFixed(1) }} L</p>
        </div>
        <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-flask text-2xl text-amber-600"></i>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6 border-2 border-purple-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Success Rate</p>
          <p class="text-3xl font-bold text-purple-600 mt-2">{{ props.successRate }}%</p>
        </div>
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-chart-line text-2xl text-purple-600"></i>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6 border-2 border-eco-green-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Batch Aktif</p>
          <p class="text-3xl font-bold text-eco-green-600 mt-2">
            {{ props.totalActiveBatches }}
          </p>
        </div>
        <div class="w-12 h-12 bg-eco-green-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-spinner text-2xl text-eco-green-600"></i>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6 border-2 border-blue-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Batch Selesai</p>
          <p class="text-3xl font-bold text-blue-600 mt-2">
            {{ props.totalCompletedBatches }}
          </p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-check-circle text-2xl text-blue-600"></i>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6 border-2 border-red-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Batch Gagal</p>
          <p class="text-3xl font-bold text-red-600 mt-2">
            {{ props.totalFailedBatches }}
          </p>
        </div>
        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-times-circle text-2xl text-red-600"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  totalBatches: {
    type: Number,
    default: 0,
  },
  totalVolume: {
    type: Number,
    default: 0,
  },
  successRate: {
    type: Number,
    default: 0,
  },
  totalActiveBatches: {
    type: Number,
    default: 0,
  },
  totalCompletedBatches: {
    type: Number,
    default: 0,
  },
  totalFailedBatches: {
    type: Number,
    default: 0,
  },
})
</script>
