<template>
  <div>
    <label v-if="label"
           class="block mb-1 text-sm font-medium leading-5 text-secondary">
      {{ label }}
    </label>
    <div class="relative rounded-md">
      <input aria-label=""
             :value="modelValue || value"
             @input="$emit('update:modelValue', $event.target.value)"
             class="appearance-none rounded-lg border-solid border bg-input focus:outline-none h-12 px-5 placeholder-muted block w-full sm:text-sm sm:leading-5"
             :class="[
               valid ? 'border-input focus:border-accent focus:shadow-accent' :
                 'border-destructive focus:border-destructive focus:shadow-destructive'
             ]"
             v-bind="$attrs">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    valid: {
      type: Boolean,
      default: true
    },
    modelValue: String,
    value: String,
    label: String,
  },
}
</script>


