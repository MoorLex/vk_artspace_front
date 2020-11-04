<template>
  <div class="relative rounded-md overflow-hidden flex bg-input">
    <button class="h-12 w-12 flex justify-center items-center text-header-tint rounded-md focus:outline-none"
            @click="$refs.input.focus()">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </button>
    <input aria-label=""
           :value="modelValue || value"
           ref="input"
           @input="$emit('update:modelValue', $event.target.value)"
           class="flex-1 bg-input h-12 px-0 border-none focus:outline-none appearance-none focus:shadow-none placeholder-muted block w-full sm:text-sm sm:leading-5"
           :placeholder="placeholder">
    <button v-if="modelValue || value"
            @click="$emit('update:modelValue', '')"
            class="h-12 w-12 flex opacity-50 justify-center items-center text-header-tint rounded-md focus:outline-none">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: 'Поиск...'
    },
    modelValue: String,
    value: String
  },
}
</script>


