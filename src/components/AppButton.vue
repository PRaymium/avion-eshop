<template>
  <button
    class="btn"
    :class="[buttonType, `btn_${buttonSize}`]"
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  buttonType: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'white', 'opaque', 'ghost'].includes(
        value
      )
    }
  },

  buttonSize: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium'].includes(value)
    }
  },

  isDisabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.btn {
  transition: 0.1s ease-in-out;

  &_medium {
    padding: 16px 32px;
  }

  &_small {
    padding: 12px 24px;
  }

  &:focus {
    outline: 1px solid $primary;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.primary {
  color: $white;
  background-color: $dark-primary;

  &:hover {
    filter: contrast(1.14);
  }
}

.secondary {
  color: $dark-primary;
  background-color: $light-gray;

  &:hover {
    background-color: $border-gray;
  }
}

.white {
  color: $dark-primary;
  background-color: $white;

  &:hover {
    background-color: $light-gray;
  }
}

.opaque {
  color: $white;
  background-color: rgba($color: #f9f9f9, $alpha: 0.15);

  &:hover {
    background-color: rgba($color: #f9f9f9, $alpha: 0.3);
  }
}

.ghost {
  color: $dark-primary;
  background-color: transparent;

  &:hover {
    background-color: $border-gray;
  }
}
</style>
