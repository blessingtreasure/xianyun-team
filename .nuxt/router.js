import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _45489e9a = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages_air_index" */))
const _2fce4d6e = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages_hotel_index" */))
const _5b6347fe = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages_map" */))
const _74ad7f57 = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages_post_index" */))
const _2bcf2324 = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages_air_flights" */))
const _13b31da2 = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages_air_order" */))
const _9f81486e = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages_air_pay" */))
const _9955412c = () => interopDefault(import('..\\pages\\hotel\\detail.vue' /* webpackChunkName: "pages_hotel_detail" */))
const _3bdcac1c = () => interopDefault(import('..\\pages\\post\\dateil.vue' /* webpackChunkName: "pages_post_dateil" */))
const _6c87b663 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages_user_login" */))
const _5090e537 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _45489e9a,
    name: "air"
  }, {
    path: "/hotel",
    component: _2fce4d6e,
    name: "hotel"
  }, {
    path: "/map",
    component: _5b6347fe,
    name: "map"
  }, {
    path: "/post",
    component: _74ad7f57,
    name: "post"
  }, {
    path: "/air/flights",
    component: _2bcf2324,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _13b31da2,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _9f81486e,
    name: "air-pay"
  }, {
    path: "/hotel/detail",
    component: _9955412c,
    name: "hotel-detail"
  }, {
    path: "/post/dateil",
    component: _3bdcac1c,
    name: "post-dateil"
  }, {
    path: "/user/login",
    component: _6c87b663,
    name: "user-login"
  }, {
    path: "/",
    component: _5090e537,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
