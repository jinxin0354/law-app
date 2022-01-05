import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const info = new Vuex.Store({
  state: {
    //要设置的全局访问的state对象，要设置的初始属性值
    lawyerCert: {},//认证律师，律师证书
    lawyerIdCard: {}, //认证律师，身份证件
  },
  getters: {
	  //获取律师证书
        getLawCert(state){
			return state.lawyerCert
		},
		getLawCard(state){
			return state.lawyerIdCard
		}
  },
  //在mutations中定义两个函数，对应commit提交的方法
  mutations: {
      getCert(state,data){
		  state.lawyerCert=data
	  }
  },
  //Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
  actions: {
        getAddCert(context,data){
			context.commit('getCert',data)
		}
  },

});
export default info
