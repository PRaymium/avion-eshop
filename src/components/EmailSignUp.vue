<template>
  <form action="#" class="form-email" name="email-form">
    <input
      type="email"
      name="email"
      placeholder="your@email.com"
      autocomplete="true"
      :class="['form-email__input', `form-email__input--${styleType}`]"
    />
    <ButtonLink
      class="form-email__btn"
      :style-type="styleType === 'primary' ? 'primary' : 'white'"
      >Sign up</ButtonLink
    >
  </form>
</template>

<script setup>
import ButtonLink from './UI/ButtonLink.vue'

defineProps({
  styleType: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-email {
  display: flex;

  &__input {
    width: 100%;
    padding-left: 32px;
    border: none;

    &::placeholder {
      opacity: 0.5;
    }

    &:focus {
      outline: 1px solid currentColor;
    }

    &--secondary {
      color: $white;
      background-color: rgba($color: $white, $alpha: 0.15);

      &::placeholder {
        color: $white;
        opacity: 1;
      }
    }
  }

  &__btn {
    text-wrap: nowrap;
  }
}
</style>
