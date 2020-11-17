<template>
  <div class="">
    <Ratio :ratio="3/4"
           :src="shot.preview.lg"
           class="bg-button-secondary rounded-lg">
      <div class="absolute top-0 right-0 py-1 flex">
        <IconButton v-if="shot.private"
                    size="6"
                    color="secondary"
                    rounded="md"
                    class="mx-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
        </IconButton>
        <IconButton v-if="shot.media.length > 1"
                    size="6"
                    color="secondary"
                    rounded="md"
                    class="mx-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
        </IconButton>
        <IconButton v-if="shot.blocked"
                    size="6"
                    color="destructive"
                    rounded="md"
                    class="mx-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
        </IconButton>
        <IconButton v-else-if="!shot.published"
                    size="6"
                    color="secondary"
                    rounded="md"
                    class="mx-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>
        </IconButton>
      </div>
    </Ratio>
    <div v-if="!small"
         class="flex py-2 items-center">
      <span class="font-bold text-sm flex-1 truncate">{{ shot.authorName }}</span>
      <svg class="w-4 h-4" :class="shot.isLiked && 'text-like'" :fill="shot.isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
      <span class="text-sm ml-1">{{ shot.likes }}</span>
    </div>
  </div>
</template>

<script>
import Ratio from '../components/Ratio.vue'
import IconButton from '../components/IconButton.vue'

export default {
  name: 'Shot',
  props: {
    shot: {
      type: Object,
      required: true
    },
    small: Boolean,
  },
  components: {
    Ratio,
    IconButton
  },
}
</script>


