import Vue from 'vue';
import VueRouter from 'vue-router';

import homePage from '../components/homePage/homePage.vue';   //主页
import login from '../components/login/login.vue';   //登录
import header from '../components/header.vue';
import brandManage from '../components/brandManagement/brandManage.vue';  //品牌管理
import commodityManage from '../components/brandManagement/commodityManage.vue';  //品牌管理
import InventoryList from '../components/mallManagement/InventoryList.vue';   //库存列表
import ListDetails from '../components/mallManagement/ListDetails.vue'     //查看详情
import addInventory from '../components/mallManagement/addInventory.vue'    //新增产品
import InventoryRecords from '../components/mallManagement/InventoryRecords.vue'   //出入库记录
import mallOrderDelivery from '../components/mallManagement/mallOrderDelivery.vue'   //商城订单列表
import orderSent from '../components/mallManagement/orderSent.vue'   //订单派发

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: login,
            meta: {
                title: '登陆',
                /* keepAlive:true*/
            },
            component: login
        },
        {
            path: '/', redirect: { name: 'login' }
        },

        {
            path: '/homePage',
            name: 'homePage',
            component: homePage,
            children: [
                {
                    path: '/',
                    name: 'brandManage',
                    meta: {
                        title: '品牌管理',
                        /*keepAlive:true*/
                    },
                    component: brandManage
                },
                {
                    path: 'commodityManage', //品牌管理
                    name: 'commodityManage',
                    meta: {
                        title: '商品管理',
                        /*keepAlive:true*/
                    },
                    component: commodityManage
                },
                {
                    path: 'InventoryList', //库存列表
                    name: 'InventoryList',
                    meta: {
                        title: '库存列表',
                        /*keepAlive:true*/
                    },
                    component: InventoryList
                },
                {
                    path: 'ListDetails', //查看详情
                    name: 'ListDetails',
                    meta: {
                        title: '查看详情',
                        /*keepAlive:true*/
                    },
                    component: ListDetails
                },
                {
                    path: 'addInventory', //新增产品
                    name: 'addInventory',
                    meta: {
                        title: '新增产品',
                        /*keepAlive:true*/
                    },
                    component: addInventory
                },
                {
                    path: 'InventoryRecords', //出入库记录
                    name: 'InventoryRecords',
                    meta: {
                        title: '出入库记录',
                        /*keepAlive:true*/
                    },
                    component: InventoryRecords
                },
                {
                    path: 'mallOrderDelivery', //商城订单列表
                    name: 'mallOrderDelivery',
                    meta: {
                        title: '商城订单列表',
                        /*keepAlive:true*/
                    },
                    component: mallOrderDelivery
                },
                {
                    path: 'orderSent', //商城订单列表
                    name: 'orderSent',
                    meta: {
                        title: '订单派发',
                        /*keepAlive:true*/
                    },
                    component: orderSent
                },

            ]
        },

    ]
})

//全局路由守卫
router.beforeEach((to, from, next) => {
    /*路由发生变化修改页面title*/
    if (to.meta.title) {
        document.title = to.meta.title
        // 获取 JWT Token
    }
    next()
})

export default router;

