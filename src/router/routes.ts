import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'calc',
        alias: [''],
        component: () => import('pages/CalcPage.vue'),
        name: 'home',
        meta: {
          menu: { label: 'Калькулятор', icon: 'calculate' },
        },
      },
      {
        path: 'data',
        component: () => import('pages/DataPage.vue'),
        name: 'data',
        meta: {
          menu: { label: 'Данные', icon: 'table_view' },
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
