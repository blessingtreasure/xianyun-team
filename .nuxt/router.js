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
const _45489e9a = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages_air_index" */))
const _2fce4d6e = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages_hotel_index" */))
const _5b6347fe = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages_map" */))
const _74ad7f57 = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages_post_index" */))
const _2bcf2324 = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages_air_flights" */))
const _13b31da2 = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages_air_order" */))
const _9f81486e = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages_air_pay" */))
const _9955412c = () => interopDefault(import('..\\pages\\hotel\\detail.vue' /* webpackChunkName: "pages_hotel_detail" */))
const _3bdcac1c = () => interopDefault(import('..\\pages\\post\\dateil.vue' /* webpackChunkName: "pages_post_dateil" */))
const _64e83036 = () => interopDefault(import('..\\pages\\post\\post-release.vue' /* webpackChunkName: "pages_post_post-release" */))
const _6c87b663 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages_user_login" */))
const _5090e537 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
>>>>>>> c13b2950a6c2f7f0a549264aae9bc61809c6bdef

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
<<<<<<< HEAD
    component: _197c1938,
=======
    component: _45489e9a,
>>>>>>> c13b2950a6c2f7f0a549264aae9bc61809c6bdef
    name: "air"
  }, {
    path: "/hotel",
    component: _600b48e4,
    name: "hotel"
  }, {
    path: "/map",
    component: _38c4bcb3,
    name: "map"
  }, {
    path: "/post",
    component: _1e55ffc8,
    name: "post"
  }, {
    path: "/air/flights",
    component: _612f7d95,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _0c0cb3e0,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _738896ba,
    name: "air-pay"
  }, {
    path: "/hotel/detail",
    component: _70b7b476,
    name: "hotel-detail"
  }, {
    path: "/post/dateil",
    component: _44a543f7,
    name: "post-dateil"
  }, {
    path: "/post/post-release",
    component: _2e3bef80,
    name: "post-post-release"
  }, {
    path: "/user/login",
    component: _485d3c9e,
    name: "user-login"
  }, {
    path: "/",
<<<<<<< HEAD
    component: _1a1c3d2e,
=======
    component: _5090e537,
>>>>>>> c13b2950a6c2f7f0a549264aae9bc61809c6bdef
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
