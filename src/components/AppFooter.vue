<template>
  <footer class="footer">
    <div class="container">
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
        <h5 class="footer-heading">Join our mailing list</h5>
        <EmailSignUp
          style-type="secondary"
          class="footer-join__mail"
        ></EmailSignUp>
      </div>
      <hr class="footer-hr" />
      <p class="footer-copyright">Copyright 2023 Avion LTD</p>
    </div>
  </footer>
</template>

<script setup>
import EmailSignUp from './UI/EmailSignUp.vue'

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
</script>

<style lang="scss">
.footer {
  padding: 40px 0 20px 0;
  background-color: $dark-primary;
  color: $white;

  &-lists {
    display: flex;
    gap: 40px 100px;
    flex-wrap: wrap;
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

    &__mail {
      margin-top: 16px;
    }
  }

  &-hr {
    margin: 16px 0;
    background-color: $primary;
    height: 1px;
    border: none;
  }

  &-copyright {
    margin-top: 20px;
    margin-bottom: 0px;
    text-align: center;
    font-size: $body-font-size-sm;
  }
}
</style>
