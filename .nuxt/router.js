import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6c2e7a06 = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages_air_index" */))
const _34aafdda = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages_hotel_index" */))
const _0eece8f7 = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages_map" */))
const _19c2b64d = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages_post_index" */))
const _2960caee = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages_air_flights" */))
const _3a98f90e = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages_air_order" */))
const _30a07893 = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages_air_pay" */))
const _67f8b0e0 = () => interopDefault(import('..\\pages\\hotel\\detail.vue' /* webpackChunkName: "pages_hotel_detail" */))
const _119ced59 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages_user_login" */))
const _407fe6a6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _6c2e7a06,
    name: "air"
  }, {
    path: "/hotel",
    component: _34aafdda,
    name: "hotel"
  }, {
    path: "/map",
    component: _0eece8f7,
    name: "map"
  }, {
    path: "/post",
    component: _19c2b64d,
    name: "post"
  }, {
    path: "/air/flights",
    component: _2960caee,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _3a98f90e,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _30a07893,
    name: "air-pay"
  }, {
    path: "/hotel/detail",
    component: _67f8b0e0,
    name: "hotel-detail"
  }, {
    path: "/user/login",
    component: _119ced59,
    name: "user-login"
  }, {
    path: "/",
    component: _407fe6a6,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
