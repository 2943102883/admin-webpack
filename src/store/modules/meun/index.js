// import MenuData from './menu'
import routes from '@/router/loadRoutes'
import http from '@doxlab/atomleaf/lib/http'

const RESTURL = 'menu-tree'
const URL = 'menu'

const Menu = {
  namespaced: true,
  state: {
    authRouteMode: process.env.VUE_AUTH_ROUTE_MODE,
    current: [],
    menuList: [],
  },
  getters: {
    getMenuList: (state) => {
      return state.menuList
    },
  },
  mutations: {
    setCurrent(state, name) {
      state.current = state[name]
    },
    setMenuList(state, list) {
      state.menuList = list
    },
  },
  actions: {
    create({ dispatch }, { data }) {
      return new Promise((resolve, reject) => {
        http
          .post(URL, data)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            dispatch(
              'pushError',
              {
                error,
              },
              {
                root: true,
              },
            )
            reject(error)
          })
      })
    },
    update({ dispatch }, { data }) {
      if (!data.menu) {
        data = {
          menu: data,
          isUpdateProperty: true
        }
      }
      return new Promise((resolve, reject) => {
        http
          .put(URL + '/' + data.menu.id, data)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            dispatch(
              'pushError',
              {
                error,
              },
              {
                root: true,
              },
            )
            reject(error)
          })
      })
    },
    delete({ dispatch }, { id }) {
      return new Promise((resolve, reject) => {
        http
          .delete(URL, {
            id,
          })
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            dispatch(
              'pushError',
              {
                error,
              },
              {
                root: true,
              },
            )
            reject(error)
          })
      })
    },
    one({ dispatch }, { id }) {
      return new Promise((resolve, reject) => {
        http
          .get(URL + '/' + id)
          .then((res) => {
            const u = res.data || res
            resolve(u)
          })
          .catch((error) => {
            dispatch(
              'pushError',
              {
                error,
              },
              {
                root: true,
              },
            )
            reject(error)
          })
      })
    },
    query({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        http
          .get(RESTURL, params)
          .then((res) => {
            const sortTree = (tree) => {  // 根据sort排序
              tree.sort((a, b) => {
                return a.sort - b.sort
              })
              tree.forEach((item) => {
                if (item.children.length > 0) {
                  sortTree(item.children)
                }
              })
            }
            const methodTree = (tree) => {  // 将没有子节点的children属性删除
              tree.forEach((item) => {
                if(item.children.length === 0) {
                  delete item.children
                } else {
                  methodTree(item.children)
                }
              })
            }
            if (res.tree !== null) {
              sortTree(res.tree)
              methodTree(res.tree)
              resolve({ data: res.tree, total: res.tree.length })
            }
            else resolve({ data: [], total: 0 })
          })
          .catch((error) => {
            dispatch(
              'pushError',
              {
                error,
              },
              {
                root: true,
              },
            )
            reject(error)
          })
      })
    },
    getUserMenu({ dispatch, commit }, params) {
      return new Promise((resolve, reject) => {
        http
          .get(`role/${params.id}/permission`, params)
          .then((res) => {
            console.log('getMenu---', res)
            // dispatch(setUser)
            // commit('setMenuList', menu)

            resolve(res)
          })
          .catch((error) => {
            dispatch(
              'pushError',
              {
                error,
              },
              {
                root: true,
              },
            )
            reject(error)
          })
      })
    },
    setCurrent({ commit }, name) {
      commit('setCurrent', name)
    },
    async initDynamicRoute({ commit, dispatch, state }) {
      console.log('state', state)
      let menu = await dispatch('getUserMenu', { id: 'admin' })
      commit('setMenuList', menu)
    },
    initStaticRoute({ commit }) {
      let menu = routes
      commit('setMenuList', menu)
    },

    async initAuthRoute({ commit, dispatch }) {
      const isDynamicRoute = process.env.VUE_AUTH_ROUTE_MODE === 'dynamic'
      if (isDynamicRoute) {
        await dispatch('initDynamicRoute')
      } else {
        await dispatch('initStaticRoute')
      }
    },
  },
}

export default {
  Menu,
}
