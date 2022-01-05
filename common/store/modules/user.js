// 用户数据模块
import api from '@/common/request/index'
import store from '@/common/store'
import router from '@/common/router.js'

const state = {
	userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
	navProduct: uni.getStorageSync('navProduct') ? uni.getStorageSync('navProduct') : [],
	timeOut: false,
	bgBanner:uni.getStorageSync('bgBanner') ? uni.getStorageSync('bgBanner') : [],
	lawyerCert:''
}

const getters = {
	userInfo: (state) => {
		return state.userInfo
	},
	navProduct: (state) => {
		return state.navProduct
	},
	timeOut: (state) => {
		return state.timeOut
	},
	bgBanner: (state) => {
		return state.bgBanner
	},
	lawyerCert:(state)=>{
		return state.lawyerCert
	},
}
// 同步函数
const mutations = {
	get_lawCert(state,data){
		state.lawyerCert=data
		console.log(state.lawyerCert)
	},
	out_login(state) {
		uni.removeStorageSync('token');
		uni.removeStorageSync('userInfo');
		state.userInfo = {};
	},
	in_login(state, data) {
		uni.setStorageSync('userInfo', data);
		state.userInfo = data;
	},
	setNavProduct(state, data) {
		uni.setStorageSync('navProduct', data);
		state.navProduct = data;
	},
	setIsTimeOut(state) {
		uni.showToast({
			title: '网络异常，请稍后再试',
			icon: 'none'
		})
		state.timeOut = true;
	},
	setNoTimeOut(state) {
		state.timeOut = false;
	},
	setBgBanner(state,data){
		uni.setStorageSync('bgBanner', data);
		state.bgBanner = data;
	},
	setBack(){
		const nav = navigator.userAgent;
		if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
			phone.onBackPress();
		} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			this.$bridge.callhandler('onBackPress', {}, res => {});
		}
	}
	
}
// 异步函数
const actions = {}


export default {
	state,
	mutations,
	actions,
	getters
}
