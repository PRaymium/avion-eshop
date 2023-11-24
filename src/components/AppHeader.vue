<template>
  <header class="header">
    <div class="container">
      <div class="header-row header-row-top">
        <div class="header-row-top__left header-btn-list">
          <button class="header-btn header-btn--search">
            <IconSearch />
          </button>
          <button
            class="header-btn header-btn--toggle"
            aria-controls="menu"
            @click="menuIsHide = !menuIsHide"
          >
            <IconBurgerMenu />
          </button>
        </div>
        <div class="header-row-top__center">
          <div class="header-logo">
            <router-link to="/" class="header-logo__link">Avion</router-link>
          </div>
        </div>
        <div class="header-row-top__right header-btn-list">
          <button class="header-btn header-btn--cart">
            <IconShopcart />
          </button>
          <button class="header-btn header-btn--user">
            <IconUser />
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
          :aria-hidden="menuIsHide"
        >
          <button
            class="header-collapse-menu__close"
            aria-controls="menu"
            @click="menuIsHide = !menuIsHide"
          >
            X
          </button>
          <nav class="header-nav">
            <ul class="header-nav__list">
              <li
                class="header-nav__item"
                v-for="(item, idx) of navItems"
                :key="idx"
              >
                <router-link class="header-nav__link" :to="item.link">{{
                  item.title
                }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import IconSearch from './icons/IconSearch.vue'
import IconBurgerMenu from './icons/IconBurgerMenu.vue'
import IconUser from './icons/IconUser.vue'
import IconShopcart from './icons/IconShopcart.vue'
import { ref } from 'vue'

const navItems = [
  {
    title: 'Plant pots',
    link: '/'
  },
  {
    title: 'Ceramics',
    link: '/'
  },
  {
    title: 'Tables',
    link: '/'
  },
  {
    title: 'Chairs',
    link: '/'
  },
  {
    title: 'Crockery',
    link: '/'
  },
  {
    title: 'Tableware',
    link: '/'
  },
  {
    title: 'Cutlery',
    link: '/'
  }
]

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

      & > * {
        width: 33.333%;
        text-align: center;
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

        @media screen and (min-width: $md) {
          order: 0;
          text-align: center;
        }
      }

      &__right {
        display: none;
        justify-content: end;

        @media screen and (min-width: $md) {
          display: flex;
        }
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
    font-size: $body-font-size-lg;
    background-color: $white;
    transform: translateX(0);
    transition: transform 0.15s ease-in-out;
    overflow-y: scroll;
    visibility: visible;

    &--hide {
      visibility: hidden;
      transform: translateX(100%);
    }

    @media screen and (min-width: $sm) {
      padding: 20px 48px;
    }

    @media screen and (min-width: $md) {
      position: static;
      flex-direction: row;
      padding: 0;
      font-size: $body-font-size-md;
      transform: translateX(0);
      overflow-y: hidden;
      visibility: visible;
    }

    &__close {
      align-self: flex-end;
      width: 1.5em;
      height: 1.5em;
      font-size: 20px;
      background-color: $border-dark;
      border-radius: 7px;

      @media screen and (min-width: $md) {
        display: none;
      }
    }
  }

  &-nav {
    &__list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      column-gap: 25px;
      row-gap: 20px;

      @media screen and (min-width: $md) {
        flex-direction: row;
      }
    }

    &__link {
      color: $nav-link;
    }
  }
}
</style>
