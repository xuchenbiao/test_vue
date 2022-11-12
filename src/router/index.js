import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

// 登陆组件
import Login from "@/pages/Login";

const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: Login,
        },


        //   重定向
        {
            path: "/",
            redirect: "/login",
        },
    ],
});

export default router;
