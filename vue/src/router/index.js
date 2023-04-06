import {createRouter, createWebHistory} from "vue-router";

import Dashboard from "../Views/Dashboard.vue";
import Survery from "../Views/Surveys.vue";
import Login from "../Views/Login.vue";
import Register from "../Views/Register.vue";
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/Authlayout.vue';
import store from "../store/index.js";
import SurveryView from "../Views/SurveryView.vue";

const routes = [
    {
        path:'/',
        redirect:'/Dashboard',
        component: DefaultLayout,
        meta:{requiresAuth:true},
        children:[
            {path:'/dashboard',name:"Dashboard", component: Dashboard},
            {path:'/survery',name:"Survery", component: Survery},
            {path:'/survery/create',name:"SurveryCreate", component: SurveryView},
            {path:'/survery/:id',name:"SurveryView", component: SurveryView},
        ]
    },
    {
        path:'/auth',
        redirect: '/login',
        name:'Auth',
        component: AuthLayout,
        meta:{isGuest:true},
        children: [
            {path:'/login', name:"Login", component: Login},
            {path:'/register', name:"Register",component: Register},
        ]
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
})

// redirection login
router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name:'Login'});
    }else if (store.state.user.token && to.meta.isGuest) {
        next({name:'Dashboard'});
    } else {
        next();
    }
})

export default router;
