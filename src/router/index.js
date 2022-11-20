import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
import axios from  'axios';
// 登陆组件

import Login from "@/pages/Login";
import adminPage from "@/pages/adminPage";
import showBooks from "@/pages/showBooks";
import showUser from  "@/pages/showUser";
import homePage from  "@/pages/homePage";
import showHistory from "@/pages/showHistory";


import userPage from "@/pages/User/UserPage";
import userShowBooks from "@/pages/User/UserShowBooks";
import userBorrowBooks from "@/pages/User/UserBorrowBooks";
import userShowCar from "@/pages/User/UserShowCar";
import userShowHistory from "@/pages/User/UserShowHistory";
const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: Login,
        },

        {
            path: "/admin",
            component: adminPage,
            children:[
                {
                    path:'',
                    redirect:"home"
                },

                {
                    path: 'user',
                    component: showUser,
                },
                {
                    path:'books',
                    component:showBooks,

                },

                {
                    path: 'home',
                    component: homePage,
                },

                {
                    path: 'history',
                    component: showHistory,
                }





            ]
        },

        {
            path:'/user',
            component:userPage,
            children:[
                {
                    path: '',
                    redirect: 'books',
                },

                {
                    path:'books',
                    component:userShowBooks,
                },

                {
                    path: 'borrow',
                    component: userBorrowBooks,
                },

                {
                    path:'car',
                    component: userShowCar,
                },

                {
                    path: 'history',
                    component: userShowHistory,
                },

              

            ]
        },



        //   重定向
        {
            path: "/",
            redirect: "/login",
        },



],

});


//路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === "/login") return next();

    const local_token = localStorage.token;

    if (!local_token) return next("/login");



        axios.get('http://localhost:8080/api/adminis').then(
            res => {
                console.log(res.data);
                if (res.data.flag === true) {
                    return next();
                } else {
                    alert("身份过期,请重新登陆!");
                    return next("/login");
                }
            }
        )








    next();
});


export default router;
