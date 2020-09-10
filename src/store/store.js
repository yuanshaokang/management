import Vue from "vue"			//因为是基于vue所以先配置引入vue
import Vuex from "vuex"			//之后配置引入vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    userList: [],
    showData: true,
    token: ''
  },
  mutations : {
    // showData(data) {
    //   this.state.showData = data
    // },
    // setUserList(state, data) {
    //   this.state.userList = data;
    //   // (注：如果这里的userList需要axios请求也可以把axios写在等号后面)
    // }

  },



  action :{

    // commitUserList: ({
    //   commit
    // }, userList) => commit('setUserList', userList)

  }

})
