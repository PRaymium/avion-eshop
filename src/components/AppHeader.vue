<template>
  <header class="header">
    <div class="container">
      <div class="header-row header-row-top">
        <div class="header-row-top__left header-btn-list">
          <button class="header-btn header-btn--search" aria-label="search">
            <IconBase :width="16" :height="16" icon-name="search"
              ><IconSearch
            /></IconBase>
          </button>
        </div>
        <div class="header-row-top__center">
          <div class="header-logo">
            <router-link to="/" class="header-logo__link">Avion</router-link>
          </div>
        </div>
        <div class="header-row-top__right header-btn-list">
          <router-link
            :to="{ name: 'cart' }"
            class="header-btn header-btn-cart"
            aria-label="cart"
          >
            <IconBase :width="16" :height="16" icon-name="cart"
              ><IconShopcart
            /></IconBase>

            <span class="header-btn-cart__counter" v-show="cart.size != 0">{{
              cart.size
            }}</span>
          </router-link>
          <button
            class="header-btn header-btn--toggle"
            aria-controls="menu"
            aria-label="open menu"
            @click="menuIsHide = !menuIsHide"
          >
            <IconBase :width="16" :height="16" icon-name="burger-menu"
              ><IconBurgerMenu
            /></IconBase>
          </button>
        </div>
      </div>
      <div class="header-row header-row-bottom">
        <div
          :class="[
            'header-collapse-menu',
            { 'header-collapse-menu--hide': menuIsHide }
          ]"
          id="menu"
          :aria-hidden="!mq.mdPlus ? menuIsHide : false"
        >
          <button
            class="header-collapse-menu__close"
            aria-controls="menu"
            aria-label="close menu"
            @click="menuIsHide = !menuIsHide"
          >
            <IconBase :width="36" :height="36" icon-name="close"
              ><IconClose
            /></IconBase>
          </button>
          <nav class="header-nav">
            <span class="header-nav__title">Collections</span>
            <ul class="header-nav__list">
              <li
                class="header-nav__item"
                v-for="item of navItems"
                :key="item.id"
              >
                <router-link
                  class="header-nav__link"
                  :to="{ name: 'catalog', query: { 'filter-type': item.id } }"
                  @click="menuIsHide = true"
                  >{{ item.name }}</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import IconBase from '@/components/icons/IconBase.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconBurgerMenu from '@/components/icons/IconBurgerMenu.vue'
import IconShopcart from '@/components/icons/IconShopcart.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { ref, inject } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductTypesStore } from '@/stores/productTypes'

const mq = inject('mq')

const cart = useCartStore()
const productTypes = useProductTypesStore()

const navItems = productTypes.items

const menuIsHide = ref(true)
</script>

<style lang="scss">
.header {
  &-btn-list {
    display: flex;
    column-gap: 20px;
  }

  &-row {
    display: flex;
    padding: 20px 0px;

    &-top {
      justify-content: space-between;
      column-gap: 20px;
      align-items: center;

      & > * {
        @media screen and (min-width: $md) {
          width: 33.333%;
          text-align: center;
        }
      }

      &__left {
        justify-content: end;

        @media screen and (min-width: $md) {
          justify-content: start;
        }
      }

      &__center {
        order: -1;
        text-align: left;
        flex-grow: 1;

        @media screen and (min-width: $md) {
          order: 0;
          text-align: center;
        }
      }

      &__right {
        display: flex;
        justify-content: end;
        align-items: center;
      }

      @media screen and (min-width: $md) {
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }

    &-bottom {
      display: flex;
      justify-content: center;
      padding: 0;

      @media screen and (min-width: $md) {
        padding: 20px 0;
      }
    }
  }

  &-logo__link {
    font-family: $font-clash-display;
    font-size: 24px;
    color: $dark-primary;
  }

  &-btn {
    display: flex;
    color: $dark-primary;

    &-cart {
      display: inline-flex;
      align-items: center;

      &__counter {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.4rem;
        margin-left: 0.2rem;
        border-radius: 50px;
        color: $white;
        background-color: $dark-primary;
      }
    }

    &--toggle {
      @media screen and (min-width: $md) {
        display: none;
      }
    }
  }

  &-collapse-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    font-size: $nav-menu-font-size;
    background-color: $white;
    transform: translateX(0);
    transition: transform 0.15s ease-in-out;
    overflow-y: scroll;
    visibility: visible;
    z-index: 5;

    &--hide {
      visibility: hidden;
      transform: translateX(100%);
    }

    @media screen and (min-width: $sm) {
      padding: 20px 48px;
    }

    @media screen and (min-width: $md) {
      position: relative;
      flex-direction: row;
      padding: 0;
      font-size: 1rem;
      transform: translateX(0);
      overflow-y: hidden;
      visibility: visible;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__close {
      align-self: flex-end;
      line-height: 0;

      @media screen and (min-width: $md) {
        display: none;
      }
    }
  }

  &-nav {
    &__title {
      display: inline-block;
      margin-bottom: 0.8em;
      border-bottom: 1px solid currentColor;

      @media screen and (min-width: $md) {
        display: none;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      column-gap: 30px;
      row-gap: 20px;
      white-space: nowrap;

      @media screen and (min-width: $md) {
        flex-direction: row;
      }
    }

    &__item {
      padding-left: 0.5em;

      @media screen and (min-width: $md) {
        padding-left: 0;
      }
    }

    &__link {
      color: $nav-link;
      border-bottom: 1px solid transparent;
      transition: border-bottom 0.1s ease-in-out;

      &:hover {
        border-bottom: 1px solid $nav-link;
      }
    }
  }
}
</style>
