import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/memberLogin',
    // name: 'memberAdd',
    hidden: true,
    component: () => import('@/views/member/memberLogin')
    // meta: { title: '添加会员', icon: 'dashboard' }
  },

  {
    path: '/memberAdd',
    // name: 'memberAdd',
    hidden: true,
    component: () => import('@/views/member/member-add')
    // meta: { title: '添加会员', icon: 'dashboard' }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/show',
    component: Layout,
    redirect: '/show',
    children: [{
      path: 'show',
      name: 'show',
      component: () => import('@/views/show/index'),
      meta: { title: '图表查看', icon: 'dashboard' }
    }]
  },

  {
    path: '/record',
    component: Layout,
    redirect: '/record',
    children: [{
      path: 'record',
      name: 'record',
      component: () => import('@/views/record/index'),
      meta: { title: '停车记录', icon: 'dashboard' }
    }]
  },

  {
    path: '/space',
    component: Layout,
    redirect: '/space',
    children: [{
      path: 'space',
      name: 'space',
      component: () => import('@/views/space/index'),
      meta: { title: '车位管理', icon: 'dashboard' }
    },
    {
      path: 'spaceAdd',
      name: 'spaceAdd',
      hidden: true,
      component: () => import('@/views/space/space-add'),
      meta: { title: '添加车位', icon: 'dashboard' }
    }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member',
    children: [{
      path: 'member',
      name: 'member',
      component: () => import('@/views/member/index'),
      meta: { title: '会员管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/role',
    component: Layout,
    redirect: '/role',
    children: [{
      path: 'role',
      name: 'role',
      component: () => import('@/views/role/index'),
      meta: { title: '管理员管理', icon: 'dashboard' }
    }, {
      path: 'userAdd',
      name: 'userAdd',
      component: () => import('@/views/role/user-add'),
      hidden: true
    }, {
      path: 'userUpdate',
      name: 'userUpdate',
      component: () => import('@/views/role/user-update'),
      hidden: true
    }, {
      path: 'alterPassword',
      name: 'alterPassword',
      component: () => import('@/views/role/alter-password'),
      hidden: true
    }]
  },

  // {
  //   path: '/info',
  //   component: Layout,
  //   redirect: '/info',
  //   children: [{
  //     path: 'info',
  //     name: 'info',
  //     component: () => import('@/views/info/index'),
  //     meta: { title: '系统信息', icon: 'dashboard' }
  //   }]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
