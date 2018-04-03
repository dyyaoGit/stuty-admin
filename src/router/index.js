import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: "/index",
    meta: {
      title: '视频管理'
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "教学视频上传"
        },
        name: '添加视频',
        hidden: true
      },
      {
        path: 'list',
        component: () => import("@/views/index/videoList"),
        meta: {
          title: '教学视频管理'
        },
        name: '视频管理'
      },
      {
        path: 'edit',
        component: () => import("@/views/index/index"),
        meta: {
          title: '编辑视频'
        },
        name: '编辑视频',
        hidden: true
      },
      {
        path: 'test',
        component: () => import("@/views/test/test"),
        meta: {
          title: "我是测试页"
        },
        name: "测试页"
      }
    ]
  },
  {
    path: '/videosCategory/',
    component: Layout,
    redirect: "/videosCategory/add",
    meta: {
      title: '视频分类管理'
    },
    children: [
      {
        path: "add",
        component: () => import("@/views/videosCategory/add"),
        meta: {
          title: "视频分类添加"
        },
        name: '视频分类'
      },
      {
        path: 'list',
        component: () => import("@/views/videosCategory/list"),
        meta: {
          title: "视频分类管理"
        },
        name: '视频分类管理',
      },
      {
        path: 'edit',
        component: () => import("@/views/videosCategory/add"),
        meta: {
          title: "编辑分类"
        },
        name: '编辑分类',
        hidden: true
      }
    ]
  },
  {
    path: '/slider/',
    component: Layout,
    name:'轮播图',
    meta: {
      title: '轮播图'
    },
    redirect: "/slider/list",
    children: [
      {
        path: 'list',
        component: () => import("@/views/sliderManage/list"),
        meta: {
          title: '轮播图管理'
        },
        name: '轮播图管理'
      },
      {
        path: 'add',
        component: () => import("@/views/sliderManage/add"),
        meta: {
          title: '添加轮播图'
        },
        name: '添加轮播图',
        hidden: true
      },
      {
        path: 'update',
        component: () => import("@/views/sliderManage/add"),
        meta: {
          title: '编辑轮播图'
        },
        name: '编辑轮播图',
        hidden: true
      },


    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

