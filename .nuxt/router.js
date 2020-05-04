import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

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
    component: _38ac174f,
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
