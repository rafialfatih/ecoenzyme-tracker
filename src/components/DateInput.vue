<template>
  <v-date-input
    :id="id"
    :model-value="dateValue"
    @update:model-value="updateValue"
    :required="required"
    :disabled="disabled"
    :max="maxDate"
    :class="['date-input', inputClass]"
    density="comfortable"
    variant="outlined"
    hide-details="auto"
    prepend-icon=""
    color="primary"
    format="dd/MM/yyyy"
  />
</template>

<script setup>
import { computed } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  components: {
    VDateInput,
  },
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  max: {
    type: String,
    default: '',
  },
  inputClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const dateValue = computed(() => {
  if (!props.modelValue) return null
  const date = new Date(props.modelValue + 'T00:00:00')
  return isNaN(date.getTime()) ? null : date
})

const maxDate = computed(() => {
  if (!props.max) return undefined
  const date = new Date(props.max + 'T00:00:00')
  return isNaN(date.getTime()) ? undefined : date
})

const updateValue = (value) => {
  if (value && value instanceof Date) {
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    emit('update:modelValue', `${year}-${month}-${day}`)
  } else {
    emit('update:modelValue', '')
  }
}
</script>
