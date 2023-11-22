<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-lists">
          <div class="footer-list" v-for="list of lists" :key="list.title">
            <h5 class="footer-heading">{{ list.title }}</h5>
            <ul class="footer-list__ul">
              <li
                class="footer-list__li"
                v-for="(item, idx) of list.items"
                :key="idx"
              >
                <router-link :to="item.link" class="footer-link">{{
                  item.name
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-join">
          <h5 class="footer-join__heading">Join our mailing list</h5>
          <EmailSignUp
            style-type="secondary"
            class="footer-join__input"
          ></EmailSignUp>
        </div>
      </div>

      <hr class="footer-hr" />
      <div class="footer-info">
        <p class="footer-copyright">Copyright 2023 Avion LTD</p>
        <ul class="footer-social">
          <li
            class="footer-social-item"
            v-for="(item, idx) of social"
            :key="idx"
          >
            <a :href="item.link" class="footer-social-link">
              <component
                :is="item.iconComponent"
                class="footer-social-icon"
              ></component>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import EmailSignUp from './UI/EmailSignUp.vue'
import IconLinkedin from './icons/IconLinkedin.vue'
import IconFacebook from './icons/IconFacebook.vue'
import IconInstagram from './icons/IconInstagram.vue'
import IconSkype from './icons/IconSkype.vue'
import IconTwitter from './icons/IconTwitter.vue'
import IconPinterest from './icons/IconPinterest.vue'

const lists = {
  categories: {
    title: 'Categories',
    items: [
      {
        name: 'Crockery',
        link: '#'
      },
      {
        name: 'Furniture',
        link: '#'
      },
      {
        name: 'Homeware',
        link: '#'
      },
      {
        name: 'Plant pots',
        link: '#'
      },
      {
        name: 'Chairs',
        link: '#'
      },
      {
        name: 'Crockery',
        link: '#'
      }
    ]
  },

  menu: {
    title: 'Menu',
    items: [
      {
        name: 'New arrivals',
        link: '#'
      },
      {
        name: 'Best sellers',
        link: '#'
      },
      {
        name: 'Recently viewed',
        link: '#'
      },
      {
        name: 'Popular this week',
        link: '#'
      },
      {
        name: 'All products',
        link: '#'
      }
    ]
  },

  ourCompany: {
    title: 'Our company',
    items: [
      {
        name: 'About us',
        link: '#'
      },
      {
        name: 'Vacancies',
        link: '#'
      },
      {
        name: 'Contact us',
        link: '#'
      },
      {
        name: 'Privacy',
        link: '#'
      },
      {
        name: 'Returns policy',
        link: '#'
      }
    ]
  }
}

const social = [
  {
    iconComponent: IconLinkedin,
    link: '#'
  },
  {
    iconComponent: IconFacebook,
    link: '#'
  },
  {
    iconComponent: IconInstagram,
    link: '#'
  },
  {
    iconComponent: IconSkype,
    link: '#'
  },
  {
    iconComponent: IconTwitter,
    link: '#'
  },
  {
    iconComponent: IconPinterest,
    link: '#'
  }
]
</script>

<style lang="scss">
.footer {
  padding: 40px 0 20px 0;
  background-color: $dark-primary;
  color: $white;

  &-content {
    display: flex;
    flex-direction: column;

    @media screen and (min-width: $lg) {
      flex-direction: row;
      column-gap: 50px;
    }
  }

  &-lists {
    display: flex;
    gap: 40px 100px;
    flex-wrap: wrap;

    @media screen and (min-width: $lg) {
      flex: 1 1 50%;
      column-gap: 70px;
    }
  }

  &-list {
    display: inline-block;

    &__ul {
      display: flex;
      flex-direction: column;
      margin-top: 12px;
      row-gap: 12px;
    }
  }

  &-link {
    font-size: $body-font-size-sm;
    color: inherit;
  }

  &-join {
    margin-top: 40px;

    @media screen and (min-width: $lg) {
      margin-top: 0;
      flex: 1 1 50%;
    }

    &__input {
      margin-top: 16px;
    }
  }

  &-hr {
    margin: 16px 0;
    background-color: $primary;
    height: 1px;
    border: none;
  }

  &-info {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    @media screen and (min-width: $md) {
      margin-top: 25px;
      justify-content: space-between;
    }
  }

  &-copyright {
    margin: 0;
    text-align: center;
    font-size: $body-font-size-sm;
  }

  &-social {
    display: none;

    @media screen and (min-width: $md) {
      display: flex;
      gap: 24px;
    }

    &-item {
      display: flex;
    }

    &-link {
      &:hover {
        border-bottom: 1px solid $white;
      }
    }
  }
}
</style>
