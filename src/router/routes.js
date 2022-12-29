import Main from '../components/main'
import Login from '../views/login'
import loadRoutes from './loadRoutes'

/** 根路由: / */
export const ROOT_ROUTE = {
  name: 'root',
  path: '/',
  redirect: process.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root',
  },
}

export default [
  ROOT_ROUTE,
  {
    path: '',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/NavFrame',
    name: 'NavFrame',
    component: Main,
    redirect: '/credit-supervision',
    children: loadRoutes,
  },
]
