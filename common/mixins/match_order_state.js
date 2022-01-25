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
			isSpecialistServiceOk: false,
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		// 用在委托人律师匹配中，除了打官司外的产品
		getOrderState(orderInfo) {
			this.status = orderInfo.order.status;
			console.log('match_order_state');
			if (
				this.status == 3 ||
				this.status == 14 ||
				this.status == 4 ||
				this.status == 10 ||
				this.status == 11
			) {
				
				if (orderInfo.order.pro_name == '打官司') {
					this.replace('/pages/client/user/service-investor', {
						order_id: orderInfo.order.id
					});
				} 
				else if (orderInfo.order.serve_time == '15分钟') {
					this.replace('/pages/client/user/service-minute', {
						order_id: orderInfo.order.id
					});
				} else if (orderInfo.order.serve_time == '连续包月') {
					this.replace('/pages/client/user/service-month', {
						order_id: orderInfo.order.id
					});
				} else if (orderInfo.order.serve_time == '包年') {
					this.replace('/pages/client/user/service-year', {
						order_id: orderInfo.order.id
					});
				}else {
					this.replace('/pages/client/user/service-face', {
						order_id: orderInfo.order.id
					});
				}
			} else if (this.status == 16) {
				this.replace('/pages/client/user/service-ok', {
					order_id: orderInfo.order.id
				});
			} else if (this.status == 17) {
				this.replace('/pages/client/user/service-remove', {
					order_id: orderInfo.order.id
				});
			} else if (this.status == -1) {
				this.replace('/pages/client/user/order-cancel', {
					order_id: orderInfo.order.id
				});
			}
		}
	}
}
