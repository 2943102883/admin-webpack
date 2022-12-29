### router配置项
> 通过router来配置菜单

`示例`
```js
{
  path: '/home/admin',    // 路由路径
  name: 'adminIndex',     // 全局唯一标识
  component: () => import('@/views/home/adminHome'),  // 加载对应组件
  meta: {
    title: '首页',         // 菜单展示名称
    icon: 'HomeOutlined', // 图标名称
    order: 1,             // 排序值
    hide: true,           // 是否隐藏，菜单不显示在导航中，但用户依然可以访问，例如详情页
    breadcrumb: true,     // 是否隐藏，顶部面包屑
    auth: [],             // 我也不知道干嘛的，没见哪里用到过
    property: [           // 设置页面权限
      {
        name: '属性名称',
        value: '属性值',
        api: 'api地址',
        method: '请求方式（大写）'
      }
    ]
  },
  children: [],           // 子菜案
}
```