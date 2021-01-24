import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import PostsDetailsPage from './pages/PostsDetailsPage'

// NOTE If you are unable to access pages accordingly, it is possible that you might need to remove the api/blog fro
function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: loadPage('HomePage')
  }, {
    path: '/blogs/:id',
    name: 'PostsDetails',
    component: PostsDetailsPage
  }, {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/:catchAll(.*)*',
    redirect: 'Home',
    component: null
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
