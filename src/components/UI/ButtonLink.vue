<template>
  <button
    v-if="type === 'button'"
    :class="buttonsClass"
    :disabled="props.isDisabled"
    @click="toggleActive"
  >
    <slot></slot>

    <span v-if="iconVisible" class="btn__icon">
      <IconBase :class="iconClass" :width="16" :height="16" icon-name="arrow"
        ><IconArrow
      /></IconBase>
    </span>
  </button>
  <router-link v-else :to="linkComputed" :class="buttonsClass">
    <slot></slot>
  </router-link>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconArrow from '@/components/icons/IconArrow.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'link'].includes(value)
    }
  },

  link: {
    type: String,
    default: ''
  },

  linkObj: {
    type: Object,
    default: () => {}
  },

  styleType: {
    type: String,
    default: 'primary',
    validator(value) {
      return [
        'primary',
        'secondary',
        'secondary-border',
        'white',
        'opaque',
        'ghost'
      ].includes(value)
    }
  },

  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium'].includes(value)
    }
  },

  isWideOnMobile: {
    type: Boolean,
    default: false
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  iconVisible: {
    type: Boolean,
    default: false
  },

  iconIsActive: {
    type: Boolean,
    default: false
  }
})

const iconIsActive = ref(props.iconIsActive)

const buttonsClass = computed(() => ({
  btn: true,
  [`btn--${props.styleType}`]: true,
  [`btn--${props.size}`]: true,
  'btn--wide': props.isWideOnMobile
}))

const iconClass = computed(() => ({
  'btn__icon-svg': true,
  'btn__icon-svg--active': iconIsActive.value
}))

const linkComputed = computed(() => {
  if (props.linkObj) {
    return {
      name: props.linkObj.name ?? undefined,
      query: props.linkObj.query ?? {},
      params: props.linkObj.params ?? {}
    }
  } else return props.link
})

function toggleActive() {
  iconIsActive.value = !iconIsActive.value
}

watch(
  () => props.iconIsActive,
  (newVal) => {
    iconIsActive.value = newVal
  }
)
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in-out;

  &__icon {
    display: inline-flex;
    height: 100%;
    align-items: center;

    &-svg {
      flex: 0 0 100%;

      &--active {
        transform: rotate(180deg);
      }
    }
  }

  &--primary {
    color: $white;
    background-color: $dark-primary;

    &:hover {
      filter: contrast(1.14);
    }
  }

  &--secondary {
    color: $dark-primary;
    background-color: $light-gray;

    &-border {
      border: 1px solid $primary;

      &:hover {
        background-color: $border-gray;
      }
    }

    &:hover {
      background-color: $border-gray;
    }
  }

  &--white {
    color: $dark-primary;
    background-color: $white;

    &:hover {
      background-color: $light-gray;
    }
  }

  &--opaque {
    color: $white;
    background-color: rgba($color: #f9f9f9, $alpha: 0.15);

    &:hover {
      background-color: rgba($color: #f9f9f9, $alpha: 0.3);
    }
  }

  &--ghost {
    color: $dark-primary;
    background-color: transparent;

    &:hover {
      background-color: $border-gray;
    }
  }

  &--medium {
    padding: 1rem 2rem;
    column-gap: 0.75rem;
  }

  &--small {
    padding: 0.75rem 1.5rem;
    column-gap: 0.5rem;
  }

  &--wide {
    width: 100%;
    @media screen and (min-width: $md) {
      width: auto;
    }
  }

  &:focus {
    outline: 1px solid $primary;
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
