import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< HEAD
const _197c1938 = () => interopDefault(import('../pages/air/index.vue' /* webpackChunkName: "pages/air/index" */))
const _600b48e4 = () => interopDefault(import('../pages/hotel/index.vue' /* webpackChunkName: "pages/hotel/index" */))
const _38c4bcb3 = () => interopDefault(import('../pages/map.vue' /* webpackChunkName: "pages/map" */))
const _1e55ffc8 = () => interopDefault(import('../pages/post/index.vue' /* webpackChunkName: "pages/post/index" */))
const _612f7d95 = () => interopDefault(import('../pages/air/flights.vue' /* webpackChunkName: "pages/air/flights" */))
const _0c0cb3e0 = () => interopDefault(import('../pages/air/order.vue' /* webpackChunkName: "pages/air/order" */))
const _738896ba = () => interopDefault(import('../pages/air/pay.vue' /* webpackChunkName: "pages/air/pay" */))
const _70b7b476 = () => interopDefault(import('../pages/hotel/detail.vue' /* webpackChunkName: "pages/hotel/detail" */))
const _44a543f7 = () => interopDefault(import('../pages/post/dateil.vue' /* webpackChunkName: "pages/post/dateil" */))
const _2e3bef80 = () => interopDefault(import('../pages/post/post-release.vue' /* webpackChunkName: "pages/post/post-release" */))
const _485d3c9e = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _1a1c3d2e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
=======
const _6a6eea1d = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages_air_index" */))
const _7d436033 = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages_hotel_index" */))
const _4eb2f452 = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages_map" */))
const _ebfd19a6 = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages_post_index" */))
const _7e0cabe4 = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages_air_flights" */))
const _f98caace = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages_air_order" */))
const _44c5e7b3 = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages_air_pay" */))
const _79089480 = () => interopDefault(import('..\\pages\\hotel\\detail.vue' /* webpackChunkName: "pages_hotel_detail" */))
const _5df199f4 = () => interopDefault(import('..\\pages\\post\\dateil.vue' /* webpackChunkName: "pages_post_dateil" */))
const _38ac174f = () => interopDefault(import('..\\pages\\post\\post-release.vue' /* webpackChunkName: "pages_post_post-release" */))
const _fc48ab8e = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages_user_login" */))
const _2185f18d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
>>>>>>> 4b19b8ca99ae6aebd6718652bb7f6784c389950d

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
    component: _6a6eea1d,
    name: "air"
  }, {
    path: "/hotel",
    component: _7d436033,
    name: "hotel"
  }, {
    path: "/map",
    component: _4eb2f452,
    name: "map"
  }, {
    path: "/post",
    component: _ebfd19a6,
    name: "post"
  }, {
    path: "/air/flights",
    component: _7e0cabe4,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _f98caace,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _44c5e7b3,
    name: "air-pay"
  }, {
    path: "/hotel/detail",
    component: _79089480,
    name: "hotel-detail"
  }, {
    path: "/post/dateil",
    component: _5df199f4,
    name: "post-dateil"
  }, {
    path: "/post/post-release",
    component: _2e3bef80,
    name: "post-post-release"
  }, {
    path: "/user/login",
    component: _fc48ab8e,
    name: "user-login"
  }, {
    path: "/",
    component: _2185f18d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
