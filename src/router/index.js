import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

// 登陆组件
import Login from "@/pages/Login";
import adminPage from "@/pages/adminPage";
import showBooks from "@/pages/showBooks";
import showUser from  "@/pages/showUser";

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


        //   重定向
        {
            path: "/",
            redirect: "/login",
        },



],
});

export default router;
