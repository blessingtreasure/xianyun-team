import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f680c210 = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages_air_index" */))
const _463a4a4e = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages_hotel_index" */))
const _e36c7d48 = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages_map" */))
const _8c714c9c = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages_post_index" */))
const _ec1ed7ae = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages_air_flights" */))
const _c4eb4118 = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages_air_order" */))
const _2de4174e = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages_air_pay" */))
const _19620f05 = () => interopDefault(import('..\\pages\\hotel\\detail.vue' /* webpackChunkName: "pages_hotel_detail" */))
const _cc03c5be = () => interopDefault(import('..\\pages\\post\\dateil.vue' /* webpackChunkName: "pages_post_dateil" */))
const _10d87dac = () => interopDefault(import('..\\pages\\post\\post-release.vue' /* webpackChunkName: "pages_post_post-release" */))
const _9cbcde84 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages_user_login" */))
const _096f405c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _f680c210,
    name: "air"
  }, {
    path: "/hotel",
    component: _463a4a4e,
    name: "hotel"
  }, {
    path: "/map",
    component: _e36c7d48,
    name: "map"
  }, {
    path: "/post",
    component: _8c714c9c,
    name: "post"
  }, {
    path: "/air/flights",
    component: _ec1ed7ae,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _c4eb4118,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _2de4174e,
    name: "air-pay"
  }, {
    path: "/hotel/detail",
    component: _19620f05,
    name: "hotel-detail"
  }, {
    path: "/post/dateil",
    component: _cc03c5be,
    name: "post-dateil"
  }, {
    path: "/post/post-release",
    component: _10d87dac,
    name: "post-post-release"
  }, {
    path: "/user/login",
    component: _9cbcde84,
    name: "user-login"
  }, {
    path: "/",
    component: _096f405c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
