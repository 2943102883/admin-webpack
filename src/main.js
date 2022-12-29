import http from '@doxlab/atomleaf/lib/http'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import atomleaf from '@doxlab/atomleaf/components'
import 'ant-design-vue/dist/antd.css'
import '@doxlab/atomleaf/css/atomleaf.less'
import './assets/css/tailwindcss.css'
import * as cicons from './components/icons'
import config from './config'
import logo from './components/logo/logo.vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { setupDirectives } from './directives'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro
http.setBaseUrl(baseUrl)
// console.log("env:", process.env.NODE_ENV)
// require("./mock") // 只在开发环境中引入，生产环境不引入mock。mock文件夹与main.js同等级。
const app = createApp(App)
setupDirectives(app)
app.config.silent = true
// 初始化自定义的SVG图标
let icons = []
Object.keys(cicons).forEach((key) => {
  app.component('Icon' + key, cicons[key])
  icons.push('Icon' + key)
})
app.config.productionTip = false
app.config.globalProperties.$baseUrl = baseUrl
app.config.globalProperties.$icons = icons

app.component('DataxLogo', logo)
app.use(router)
app.use(store)
app.use(Antd)
app.use(atomleaf)
app.use(VXETable)
app.mount('#app')
