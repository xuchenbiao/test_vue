import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

// 登陆组件
import Login from "@/pages/Login";
import adminPage from "@/pages/adminPage";
import showBooks from "@/pages/showBooks";
import showUser from  "@/pages/showUser";

import userPage from "@/pages/User/UserPage";
import userShowBooks from "@/pages/User/UserShowBooks";
import userBorrowBooks from "@/pages/User/UserBorrowBooks";
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
                    redirect:"user"
                },

                {
                    path: 'user',
                    component: showUser,
                },
                {
                    path:'books',
                    component:showBooks,

                },






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
                }

            ]
        },



        //   重定向
        {
            path: "/",
            redirect: "/login",
        },



],
});

export default router;
