<template>
  <div>
    <label v-if="label"
           class="block mb-1 text-sm font-medium leading-5 text-secondary">
      {{ label }}
    </label>
    <div class="relative rounded-md">
      <textarea aria-label=""
                ref="input"
                rows="4"
                :value="modelValue"
                class="appearance-none rounded-lg border-solid border bg-input py-3 resize-none focus:outline-none h-12 px-5 placeholder-muted block w-full sm:text-sm leading-6"
                :class="[
                   valid ? 'border-input focus:border-accent focus:shadow-accent' :
                     'border-destructive focus:border-destructive focus:shadow-destructive'
                 ]"
                :placeholder="placeholder"
                @input="resize" />
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
    modelValue: String,
    placeholder: String,
    label: String,
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.style.height = "auto";
      this.$refs.input.style.height = `${this.$refs.input.scrollHeight + 10}px`;
    });
  },
  methods: {
    resize(event) {
      this.$emit('update:modelValue', event.target.value)
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight + 10}px`;
    }
  }
}
</script>


