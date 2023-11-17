<template>
  <header class="header">
    <div class="container">
      <div class="header-row header-row--top">
        <div class="header-left header-btn-list">
          <button class="header-btn header-btn--search">
            <IconSearch />
          </button>
          <button class="header-btn header-btn--toggle">
            <IconBurgerMenu />
          </button>
        </div>
        <div class="header-logo">
          <router-link to="/" class="header-logo__link">Avion</router-link>
        </div>
        <div class="header-right header-btn-list">
          <button class="header-btn header-btn--cart">
            <IconShopcart />
          </button>
          <button class="header-btn header-btn--user">
            <IconUser />
          </button>
        </div>
      </div>
      <div class="header-row header-row--bottom">
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
  </header>
</template>

<script setup>
import IconSearch from './icons/IconSearch.vue'
import IconBurgerMenu from './icons/IconBurgerMenu.vue'
import IconUser from './icons/IconUser.vue'
import IconShopcart from './icons/IconShopcart.vue'

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
</script>

<style lang="scss">
.header {
  &__container {
    justify-content: space-between;
  }

  &-row {
    display: flex;
    padding: 20px 0px;

    &--top {
      justify-content: space-between;

      & > * {
        width: 33.333%;
        text-align: center;
      }

      @media screen and (min-width: $md) {
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }

    &--bottom {
      display: none;
      justify-content: center;

      @media screen and (min-width: $md) {
        display: flex;
      }
    }
  }

  &-btn-list {
    display: flex;
    column-gap: 20px;
  }

  &-left {
    justify-content: end;

    @media screen and (min-width: $md) {
      justify-content: start;
    }
  }

  &-right {
    display: none;
    justify-content: end;

    @media screen and (min-width: $md) {
      display: flex;
    }
  }

  &-logo {
    order: -1;
    text-align: left;

    @media screen and (min-width: $md) {
      order: 0;
      text-align: center;
    }

    &__link {
      font-family: $font-clash-display;
      font-size: 24px;
    }
  }

  &-btn {
    &--toggle {
      @media screen and (min-width: $md) {
        display: none;
      }
    }
  }

  &-nav {
    &__list {
      display: flex;
      column-gap: 45px;
    }
  }
}
</style>
