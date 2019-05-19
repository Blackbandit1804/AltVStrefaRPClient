/* eslint-disable no-console */
/* eslint-disable no-undef */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login/Login.vue'),
            children: [
                {
                    path: '',
                    name: 'loginWindow',
                    component: () => import('@/components/Login/LoginWindow.vue')
                },
                {
                    path: 'characters',
                    name: 'characters',
                    component: () => import('@/components/Login/CharacterSelect.vue')
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        }
    ]
});
