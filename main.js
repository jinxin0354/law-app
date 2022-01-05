import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import name from '@/common/store/name'
import router from '@/common/router'
import tools from '@/common/utils/tools'
import '@/common/utils/sdk/sdk-h5.js'
import {
	API_URL
} from './env.js'
// 引入router
import {
	RouterMount
} from 'uni-simple-router'
import api from '@/common/request/index'

// 引入mixin
import commonJs from '@/common/mixins/index.js'
Vue.mixin(commonJs);

// 引入uView
import uView from 'uview-ui';
Vue.use(uView);

// 引入支付js
import faliPay from '@/common/utils/pay.js'

//引入ios
import Bridge from '@/common/bridge.js'
Vue.prototype.$bridge = Bridge

// 引入瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

// 引入VConsole
import VConsole from 'vconsole'
const vConsole = new VConsole()

// 引入瀑布流
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 全局变量
Vue.prototype.$bus = new Vue()
Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;
Vue.prototype.$API_URL = API_URL;
Vue.prototype.$pay = faliPay;
Vue.prototype.$VIEW_URL = 'https://d-falih5.bigchun.com'; //测试
//Vue.prototype.$VIEW_URL = 'https://falih5.bigchun.com'; //正式

Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
	store,
	...App
});

// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount();
// #endif
