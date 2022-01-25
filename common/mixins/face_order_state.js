import {
	mapGetters,
	mapMutations
} from 'vuex';
export const mixin = {
	data() {
		return {
			status: '',
			isClientRemoveEntrust: false,
			isLawyerRemoveEntrust: false,
			isClientServiceOk: false,
			isLawyerServiceOk: false,
			disableServiceOk: false,
			disableRemoveEntrust: false,
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		// 用在律师服务中
		getOrderState(orderInfo) {
			console.log('face_order_state');
			this.status = orderInfo.order.status;
			if (this.status == -1) {
				this.replace('/pages/client/user/order-cancel', {
					order_id: orderInfo.order.id
				});
			}
			//初始值
			else if (this.status == 3) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = false;
			}
			// 委托人点服务解除
			if (this.status == 10) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = true;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = true;
				this.disableRemoveEntrust = false;
			}
			// 律师点服务解除
			else if (this.status == 11) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = true;
				this.isLawyerRemoveEntrust = true;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = false;
			}
			// 委托人点服务完成
			else if (this.status == 14) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = true;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = true;
			}
			// 律师点服务完成
			else if (this.status == 4) {
				this.isLawyerServiceOk = true;
				this.isClientServiceOk = false;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = true;
			}
			// 委托人和律师都点了服务完成
			else if (this.status == 16) {
				if (this.userInfo.id == orderInfo.order.user_id) { //当前用户
					this.replace('/pages/client/user/service-ok', {
						order_id: orderInfo.order.id
					});
				} else { //不是当前用户
					this.replace('/pages/lawyer/user/service-ok', {
						order_id: orderInfo.order.id
					});
				}
			}
			// 委托人和律师都点了服务解除
			else if (this.status == 17) {
				if (this.userInfo.id == orderInfo.order.user_id) { //当前用户
					this.replace('/pages/client/user/service-remove', {
						order_id: orderInfo.order.id
					});
				} else { //不是当前用户
					this.replace('/pages/lawyer/user/service-remove', {
						order_id: orderInfo.order.id
					});
				}
			}
			// 订单取消
			else if (this.status == -1) {
				this.replace('/pages/client/user/order-cancel', {
					order_id: orderInfo.order.id
				});
			}
		}
	}
}
