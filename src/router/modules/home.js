import { h, resolveComponent } from 'vue'

export default {
  // 首页 路由配置
  path: '/home',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '首页',
    icon: 'HomeOutlined',
    order: 1,
    auth: [],
  },
}
