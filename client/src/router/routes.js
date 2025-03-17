export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/loginView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    redirect: '/home/index',
    children: [
      //默认首页
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/home/defalutView.vue'),
      },
      //上传衣服页面
      {
        path: 'upload',
        name: 'upload',
        component: () => import('../views/home/uploadView.vue'),
      },
      //衣橱页面
      {
        path: 'wardrobe',
        name: 'wardrobe',
        component: () => import('../views/wardrobe/index.vue'),
      },
      //衣服信息页面
      {
        path: 'details',
        name: 'clothesDetails',
        component: () => import('../views/wardrobe/clothesDetailsView.vue'),
      },
      //衣服搭配页面
      {
        path: 'clothesMatch',
        name: 'clothesMatch',
        component: () => import('../views/clothesMatch/index.vue')
      },
      //编辑搭配页面
      {
        path: 'diyCanvas',
        name: 'diyCanvas',
        component: () => import('../views/clothesMatch/diyClothesView.vue')
      },
      //设置页面
      // {
      //   path: 'setting',
      //   name: 'setting',
      //   component: () => import('../components/index.vue')
      // },
    ],
    // meta: { requiresAuth: true }
  }
]