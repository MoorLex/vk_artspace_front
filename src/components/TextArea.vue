<template>
  <div>
    <label v-if="label"
           class="block mb-1 text-sm font-medium leading-5 text-secondary">
      {{ label }}
    </label>
    <div class="relative rounded-md">
      <textarea aria-label=""
                ref="input"
                :rows="rows"
                :value="modelValue || value"
                :maxlength="maxLength"
                class="appearance-none rounded-lg border-solid border bg-input py-3 resize-none focus:outline-none h-12 px-5 placeholder-muted block w-full sm:text-sm leading-6"
                :class="[
                  inputClass,
                   valid ? 'border-input focus:border-accent focus:shadow-accent' :
                     'border-destructive focus:border-destructive focus:shadow-destructive'
                 ]"
                :placeholder="placeholder"
                @input="$emit('update:modelValue', $event.target.value)" />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    valid: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 4
    },
    maxLength: Number,
    modelValue: String,
    placeholder: String,
    inputClass: String,
    label: String,
    value: String,
  },
  watch: {
    modelValue() {
      this.$nextTick(() => {
        this.resize()
      })
    },
    value() {
      this.$nextTick(() => {
        this.resize()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.style.height = "auto";
      this.$refs.input.style.height = `${this.$refs.input.scrollHeight + 2}px`;
    });
  },
  methods: {
    resize() {
      this.$refs.input.style.height = "auto";
      this.$refs.input.style.height = `${this.$refs.input.scrollHeight + 2}px`;
    }
  }
}
</script>


