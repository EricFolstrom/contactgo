import { createRouter, createWebHistory } from 'vue-router'
import ContactList from "../views/ContactList.vue"
import CreateContactVue from '@/views/CreateContact.vue'
import EditContactVue from "@/views/EditContact.vue"
import ShowContactVue from "@/views/ShowContact.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ContactList,
      children: []
    },
    {
      path: '/create',
      name: 'create',
      component: CreateContactVue,
      children: [

      ]
    },
    {
      path: '/edit/:contactId',
      name: 'edit',
      component: EditContactVue,
      children: [

      ]
    },
    {
      path: '/show/:contactId',
      name: 'show',
      component: ShowContactVue,
      children: [

      ]
    }
  ]
})

export default router
