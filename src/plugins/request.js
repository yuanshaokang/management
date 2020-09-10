import axios from 'axios'
import router from '../router/index.js'

// 创建一个axios实例
const service = axios.create({
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  //   'token': 'one'
  // },
  // baseURL:'http://10.12.208.72:10688',  // 蓬勃

  //baseURL: 'http://localhost:10688', // 外网
  //  baseURL: 'http://10.12.204.208:10688', // 内网
  // baseURL: 'http://10.12.208.188:10688',  //少康
  // baseURL: 'http://192.168.11.128:9890', // 蓬勃
  // baseURL: 'http://10.12.208.124:10688', // 少康  
  //baseURL: 'http://mag-api.bssale.com', // 线上
  withCredentials: true,
  timeout: 8000
})
console.log(666, service)
// 添加请求拦截器
service.interceptors.request.use(config => {
  console.log(config+'开个户口')

  // console.log(5555, config, localStorage.getItem('token'))
  // 在发送请求之前做某事，比如说 设置token

  config.headers['token'] = localStorage.getItem('token');
  // this.$store.state.token
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
service.interceptors.response.use(response => {
  console.log(33, response)
  const res = response.data;
  if (res.code == '401') {
    router.push('userlogin')
    localStorage.clear()
    return
  }
  return response;
}, error => {
  return Promise.reject(error.response.data); // 返回接口返回的错误信息
})

export default service
