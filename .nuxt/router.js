import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _27ef9ad5 = () => interopDefault(import('../pages/air/index.vue' /* webpackChunkName: "pages/air/index" */))
const _e0482a82 = () => interopDefault(import('../pages/hotel/index.vue' /* webpackChunkName: "pages/hotel/index" */))
const _6645e638 = () => interopDefault(import('../pages/map.vue' /* webpackChunkName: "pages/map" */))
const _51dc46cb = () => interopDefault(import('../pages/post/index.vue' /* webpackChunkName: "pages/post/index" */))
const _21110cc6 = () => interopDefault(import('../pages/air/flights.vue' /* webpackChunkName: "pages/air/flights" */))
const _40ba5b51 = () => interopDefault(import('../pages/air/order.vue' /* webpackChunkName: "pages/air/order" */))
const _b4a9332a = () => interopDefault(import('../pages/air/pay.vue' /* webpackChunkName: "pages/air/pay" */))
const _ad36f966 = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _3b922d4c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/air",
    component: _27ef9ad5,
    name: "air"
  }, {
    path: "/hotel",
    component: _e0482a82,
    name: "hotel"
  }, {
    path: "/map",
    component: _6645e638,
    name: "map"
  }, {
    path: "/post",
    component: _51dc46cb,
    name: "post"
  }, {
    path: "/air/flights",
    component: _21110cc6,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _40ba5b51,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _b4a9332a,
    name: "air-pay"
  }, {
    path: "/user/login",
    component: _ad36f966,
    name: "user-login"
  }, {
    path: "/",
    component: _3b922d4c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
