<template>
  <button
    v-if="type === 'button'"
    :class="[
      'btn',
      `btn--${styleType}`,
      `btn--${size}`,
      { 'btn--wide': isWideOnMobile }
    ]"
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="link"
    :class="[
      'btn',
      `btn--${styleType}`,
      `btn--${size}`,
      { 'btn--wide': isWideOnMobile }
    ]"
  >
    <slot></slot>
  </router-link>
</template>

<script setup>
defineProps({
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
  }
})
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  transition: 0.1s ease-in-out;

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
  }

  &--small {
    padding: 12px 24px;
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
