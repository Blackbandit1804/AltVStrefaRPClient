/* eslint-disable no-console */
/* eslint-disable no-undef */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Empty.vue'),
        },
        {
            path: '/login',
            component: () => import('./views/Login/Login.vue'),
            children: [
                {
                    path: '',
                    name: 'loginWindow',
                    component: () => import('@/components/Login/LoginWindow.vue'),
                },
                {
                    path: 'characters',
                    name: 'characters',
                    component: () => import('@/components/Login/CharacterSelect.vue'),
                    props: true,
                },
            ],
        },
        {
            path: '/bank',
            name: 'bank',
            component: () => import('./views/BankView.vue'),
            props: true,
        },
        {
            path: '/businessMenu',
            name: 'businessMenu',
            component: () => import('./views/BusinessMenuView.vue'),
            props: true,
        },
        {
            path: '/testMenu',
            name: 'testMenu',
            component: () => import('./views/TestMenuView.vue'),
            props: true,
        },
        {
            path: '/vehicleShop',
            name: 'vehicleShop',
            component: () => import('./views/VehicleShopView.vue'),
            props: true,
        },
        {
            path: '/policeMenu',
            name: 'policeMenu',
            component: () => import('./views/Empty.vue'),
            props: true,
        },
        {
            path: '/samsMenu',
            name: 'samsMenu',
            component: () => import('./views/Empty.vue'),
            props: true,
        },
        {
            path: '/townHallMenu',
            name: 'townHallMenu',
            component: () => import('./views/Empty.vue'),
            props: true,
        },
        {
            path: '/empty',
            name: 'empty',
            component: () => import('./views/Empty.vue'),
        },
    ],
});
