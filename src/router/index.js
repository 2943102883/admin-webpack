import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@doxlab/atomleaf/lib/util'
import routes from './routes'

import config from '../config'

import store from '../store'

const routerHistory = createWebHistory(process.env.VUE_APP_PUBLIC_PATH || '/')

const router = createRouter({
  history: routerHistory,
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const token = getToken()

  if (token === false && to.name !== config.loginName) {
    next({
      name: config.loginName,
    })
  }
  if (token) {
    store.dispatch('Menu/initAuthRoute')
  }

  if (token && to.name === config.loginName) {
    next({
      name: config.homeName,
    })
  } else {
    const path = to.path
    const names = path.split('/', 2)
    let name = ''

    if (names.length === 1) {
      name = names[0]
    } else if (names.length === 2) {
      name = names[1]
    }

    next()
  }
  // 未登录的状态
  // 获取系统配置
  // 如果没有配置获取系统配置
})
export default router
