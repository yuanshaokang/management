import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MainPage from './components/app.vue'
import router from './router/index'
import './assets/css/style.css'
import './plugins/axios.js'
import commit from './commit/commit'

import moment from 'moment'
import axios from 'axios'
import qs from "qs"
import store from './store/store'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.prototype.$commit = commit;
Vue.prototype.qs = qs;

// Vue.component('v-distpicker', VDistpicker)
Vue.use(moment);
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用

Vue.prototype.$axios= axios
Vue.use(ElementUI);


 new Vue({
  el: '#app',
  router,
  store,
  render: h => h(MainPage),
});
