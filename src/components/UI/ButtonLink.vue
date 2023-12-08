<template>
  <button
    v-if="type === 'button'"
    :class="buttonsClass"
    :disabled="props.isDisabled"
    @click="toggleActive"
  >
    <slot></slot>
    <span v-if="iconVisible" class="btn__icon">
      <svg
        :class="iconSvgClass"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path :class="iconPathClass" d="M18 9L12 16.5L6 9H18Z" fill="#2A254B" />
      </svg>
    </span>
  </button>
  <router-link v-else :to="link" :class="buttonsClass">
    <slot></slot>
  </router-link>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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

  styleType: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'white', 'opaque', 'ghost'].includes(
        value
      )
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

const iconSvgClass = computed(() => ({
  'btn__icon-svg': true,
  'btn__icon-svg--active': iconIsActive.value
}))

const iconPathClass = computed(() => ({
  'btn__icon-path': true,
  'btn__icon-path--dark': props.styleType !== ('primary' || 'opaque')
}))

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

    &-path {
      fill: $white;

      &--dark {
        fill: $dark-primary;
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
    padding: 16px 32px;
    column-gap: 12px;
  }

  &--small {
    padding: 12px 24px;
    column-gap: 8px;
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
