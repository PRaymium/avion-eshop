<template>
  <router-link
    :to="{ name: 'product', params: { id: props.id } }"
    class="product-card"
  >
    <ProductPicture
      :title="props.title"
      :product-id="props.id"
      :is-loaded="props.isLoaded"
    />

    <component :is="props.titleTag" class="product-card__heading">
      <ContentLoader :is-loaded="props.isLoaded">{{
        props.title
      }}</ContentLoader>
    </component>
    <span class="product-card__price"
      ><ContentLoader :is-loaded="props.isLoaded" block-type="inline"
        >£{{ props.price }}
      </ContentLoader></span
    >
  </router-link>
</template>

<script setup lang="ts">
import ProductPicture from '@/components/ProductPicture.vue'
import ContentLoader from '@/components/UI/ContentLoader.vue'

interface Props {
  id?: number
  title?: string
  price?: number
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4'
  isLoaded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: 'Title',
  price: 100,
  titleTag: 'h2',
  isLoaded: true
})
</script>

<style lang="scss" scoped>
.product-card {
  display: block;
  color: $dark-primary;
  transition: 0.1s ease-in-out;

  &:focus {
    outline: 2px solid $primary;
  }

  @media screen and (min-width: $md) {
    &:hover,
    &:focus {
      outline: none;
      transform: scaleY(104%) translateY(2%);
    }
  }

  &__heading {
    font-size: $h4-font-size;
    margin-top: 24px;
    margin-bottom: 0;
  }

  &__price {
    display: inline-block;
    margin-top: 8px;
  }
}
</style>
