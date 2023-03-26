<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue';

const props = defineProps({
  uid: {
    type: String,
    default: 'modal',
  },
  maxWidth: {
    type: String,
    default: '2xl',
  },
  closeable: {
    type: Boolean,
    default: true,
  },
  outsideClick: {
    type: Boolean,
    default: true,
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
});

const show = ref(false)
const emit = defineEmits(['opened', 'closed']);

watch(
    () => show.value,
    () => {
      if (show.value) {
        document.body.style.overflow = 'hidden';
        open()
      } else {
        document.body.style.overflow = null;
        close();
      }
    }
);

const close = () => {
  if (props.closeable) {
    emit('closed');
  }
};


const open = () => {
  emit('opened');
};


const closeOnEscape = (e) => {
  if (e.key === 'Escape' && show.value && props.outsideClick && props.closeOnEscape) {
    show.value =  false
  }
};

onMounted(() => {
  document.addEventListener('keydown', closeOnEscape)

  window.addEventListener("message", (event) => {
    if (event.origin === window.origin && event.data.author === 'interactive-ui-modal') {
      if (event.data.action === 'close' && event.data.uid === props.uid) {
        show.value = false;
      }

      if (event.data.action === 'open' && event.data.uid === props.uid) {

        show.value = true;
      }
    }
  }, false);

});

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape);
  document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
  return {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
  }[props.maxWidth];
});
</script>

<template>
  <teleport to="body" v-if="show">
    <transition leave-active-class="duration-200">
      <div  class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50">
        <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <div v-show="show" class="fixed inset-0 transform transition-all" @click="props.outsideClick ? show = false : null">
            <div class="absolute inset-0 bg-gray-500 opacity-75"/>
          </div>
        </transition>

        <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
              class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"
              :class="maxWidthClass"
          >
            <h1 class="text-3xl font-bold p-4" v-if="$slots.title">
              <slot name="title"/>
            </h1>

            <div class="interactive-modal-body p-4" v-if="$slots.body">
              <slot name="body"/>
            </div>
            <slot v-else/>

          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>
