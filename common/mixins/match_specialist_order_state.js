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
		// 用在委托人法务匹配中，打官司
		getOrderState(orderInfo) {
			this.status = orderInfo.order.status;
			console.log('match_specialist_order_state');
			// 1-法务接单，2-法务点法务服务完成，13-委托人点法务服务完成
			if (this.status == 1 || this.status == 2 || this.status == 13) {
				this.replace('/pages/client/user/service-specialist', {
					order_id: orderInfo.order.id
				});
			}
			// 法务点取消订单，委托人点取消订单
			
			
			
		}
	}
}
