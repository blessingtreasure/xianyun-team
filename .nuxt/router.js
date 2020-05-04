import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _197c1938 = () => interopDefault(import('../pages/air/index.vue' /* webpackChunkName: "pages/air/index" */))
const _600b48e4 = () => interopDefault(import('../pages/hotel/index.vue' /* webpackChunkName: "pages/hotel/index" */))
const _38c4bcb3 = () => interopDefault(import('../pages/map.vue' /* webpackChunkName: "pages/map" */))
const _1e55ffc8 = () => interopDefault(import('../pages/post/index.vue' /* webpackChunkName: "pages/post/index" */))
const _612f7d95 = () => interopDefault(import('../pages/air/flights.vue' /* webpackChunkName: "pages/air/flights" */))
const _0c0cb3e0 = () => interopDefault(import('../pages/air/order.vue' /* webpackChunkName: "pages/air/order" */))
const _738896ba = () => interopDefault(import('../pages/air/pay.vue' /* webpackChunkName: "pages/air/pay" */))
const _70b7b476 = () => interopDefault(import('../pages/hotel/detail.vue' /* webpackChunkName: "pages/hotel/detail" */))
const _44a543f7 = () => interopDefault(import('../pages/post/dateil.vue' /* webpackChunkName: "pages/post/dateil" */))
const _485d3c9e = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _1a1c3d2e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _197c1938,
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
    path: "/user/login",
    component: _485d3c9e,
    name: "user-login"
  }, {
    path: "/",
    component: _1a1c3d2e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
