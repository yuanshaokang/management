// "use strict";//js严格模式

import Vue from 'vue';
import axios from "axios";
import router from '../router/index.js'

// ajax配置
axios.defaults.baseURL = 'http://10.12.204.208:10688/'; 
axios.defaults.headers.common["token"] = localStorage.getItem("token");  // 设置请求头为 Authorization
//axios拦截器，目的是为了在请求头上带上token
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code == '401') {
    router.push('/')
    localStorage.clear()
    console.log(2, '401')
  } else {
    return response;
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.prototype.axios = axios;

