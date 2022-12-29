import Vuex from 'vuex'
import config from '../config'

// 使用vuex-along来实现本地的状态持久化
import createVuexAlong from 'vuex-along'
import App from '@doxlab/atomleaf/module/app'
import Role from '@doxlab/atomleaf/module/role'
import User from '@doxlab/atomleaf/module/user'
import Org from '@doxlab/atomleaf/module/org'
import Code from '@doxlab/atomleaf/module/code'
import Link from '@doxlab/atomleaf/module/link'
import File from './file'
import FileList from './fileList'
import Category from '@doxlab/atomleaf/module/category'

// 自动加载文件夹下面的index.js

const modulesFiles = require.context(
  './modules',
  true,
  /^.\/[\w+\\-]+\/index.js/,
)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules = Object.assign(modules, value.default)
  return modules
}, {})

const store = new Vuex.Store({
  state: {
    LOADING: true,
  },
  getters: {
    loading: (state) => {
      return state.LOADING
    },
  },
  mutations: {
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
  },
  actions: {
    //
  },
  modules: {
    App,
    User,
    Role,
    Link,
    File,
    FileList,
    Code,
    Org,
    Category,
    ...modules,
  },
  plugins: [
    createVuexAlong({
      name: config.name,
      local: {
        list: ['App', 'User', 'Role'],
        isFilter: false,
      },
    }),
  ],
})
export default store
