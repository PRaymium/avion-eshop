<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-lists">
          <div class="footer-list" v-for="list of lists" :key="list.title">
            <span class="h5 footer-list__heading">{{ list.title }}</span>
            <ul class="footer-list__ul">
              <li
                class="footer-list__li"
                v-for="(item, idx) of list.items"
                :key="idx"
              >
                <router-link :to="item.link" class="footer-list__link">{{
                  item.name
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-join">
          <span class="h5 footer-join__heading">Join our mailing list</span>
          <EmailSignUp
            style-type="secondary"
            class="footer-join__input"
          ></EmailSignUp>
        </div>
      </div>

      <hr class="footer-hr" />
      <div class="footer-info">
        <span class="footer-copyright">Copyright 2023 Avion LTD</span>
        <ul class="footer-social">
          <li
            class="footer-social__item"
            v-for="(item, idx) of social"
            :key="idx"
          >
            <a
              :href="item.link"
              class="footer-social__item-link"
              :aria-label="item.name"
            >
              <IconBase
                class="footer-social__item-icon"
                :width="24"
                :height="24"
                :icon-name="item.name"
                ><component :is="item.iconComponent"></component
              ></IconBase>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import EmailSignUp from '@/components/EmailSignUp.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconSkype from '@/components/icons/IconSkype.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconPinterest from '@/components/icons/IconPinterest.vue'

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
    name: 'linkedIn',
    link: '#'
  },
  {
    iconComponent: IconFacebook,
    name: 'facebook',
    link: '#'
  },
  {
    iconComponent: IconInstagram,
    name: 'instagram',
    link: '#'
  },
  {
    iconComponent: IconSkype,
    name: 'skype',
    link: '#'
  },
  {
    iconComponent: IconTwitter,
    name: 'twitter',
    link: '#'
  },
  {
    iconComponent: IconPinterest,
    name: 'pinterest',
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

    &__link {
      font-size: $body-font-size-sm;
      color: inherit;

      &:hover {
        border-bottom: 1px solid $white;
      }
    }
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
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 20px;
    row-gap: 15px;

    @media screen and (min-width: $md) {
      margin-top: 25px;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &-copyright {
    margin: 0;
    text-align: center;
    font-size: $body-font-size-sm;
  }

  &-social {
    display: flex;
    gap: 24px;

    &__item {
      display: flex;

      &-link {
        color: $white;
        border-bottom: 1px solid transparent;
        transition: border-bottom 0.1s ease-in-out;

        &:hover {
          border-bottom: 1px solid $white;
        }
      }
    }
  }
}
</style>
