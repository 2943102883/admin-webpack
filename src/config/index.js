let baseWebURL = '/'
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseWebURL = '/' // 多加一个api是后台那边统一拦截处理视项目情况而定加不加
} else if (process.env.NODE_ENV === 'test') {
  // 测试环境
  baseWebURL = '/'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  baseWebURL = '/'
}
const cfg = {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '',

  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 100,
  timeout: 10000,
  /**
   *  vuex-along 本地存储的名称，用于区分其他前端服务,每个项目请修改这个名称
   */
  localStoreName: 'atom-antd',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: process.env.VUE_APP_SERVER_URL,
    test: process.env.VUE_APP_SERVER_URL,
    // 修改成读取环境变量，环境变量为空则默认为localhost:3333,在vue.config.js注入
    // pro: "https://edu.ysbus.com:3005",
    pro: process.env.VUE_APP_SERVER_URL,
  },

  baseWebURL: baseWebURL,

  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'Home',
  loginName: 'login',
  loginOut: 'logout',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true, // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    },
  }
}

export const MenuHide = (item) => {
  const Path = {
    ADMIN: 'admin',           // 管理员端
    CATERING: 'catering',     // 餐饮端
    GOVERNMENT: 'government', // 政府端
    ORG: 'org',               // 机构端
    SCHOOL: 'school',         // 学校端
  }
  return Path[process.env.VUE_APP_MENU] !== Path[item]
}
export const HomeIndex = () => {
  const index = {
    ADMIN: 'adminIndex',           // 管理员端
    CATERING: 'cateringIndex',     // 餐饮端
    GOVERNMENT: 'governmentIndex', // 政府端
    ORG: 'orgIndex',               // 机构端
    SCHOOL: 'schoolIndex',         // 学校端
  }
  return index[process.env.VUE_APP_MENU]
}

export default cfg