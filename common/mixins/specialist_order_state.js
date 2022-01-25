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
			disableApproveServiceOk: false,//审批服务完成
			disableApproveRemoveEntrust: false,//审批服务解除
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		// 用在法务服务中和律师服务中
		getOrderState(orderInfo) {
		
			console.log('specialist_order_state');
			this.status = orderInfo.order.status;
			console.log('this.status'+this.status);
			// 订单取消
			if (this.status == -1) {
				this.replace('/pages/client/user/order-cancel', {
					order_id: orderInfo.order.id
				});
			}
			// 打官司法务服务中
			//法务接单初始状态
			else if (this.status == 1) {
				this.isSpecialistServiceOk = false;
				this.isClientServiceOk = false;
			}
			//法务点法务服务完成
			else if (this.status == 2) {
				this.isSpecialistServiceOk = true;
				this.isClientServiceOk = false;
			}
			// 委托人点法务服务完成
			else if (this.status == 13) {
				this.isSpecialistServiceOk = false;
				this.isClientServiceOk = true;
			} 
			//法务服务完成
			else if (this.status == 15) {
				if (this.userInfo.id == orderInfo.order.user_id) { //委托人
					this.replace('/pages/client/user/match', {
						order_id: orderInfo.order.id
					});
				} else { //不是委托人
					this.replace('/pages/specialist/user/service-ok', {
						order_id: orderInfo.order.id
					});
				}
			} 
			else if (this.status == 3) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = false;
				this.disableApproveServiceOk = true;
				this.disableApproveRemoveEntrust = true;
			} 
			else if (this.status == 10) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = true;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = true;
				this.disableRemoveEntrust = false;
				this.disableApproveServiceOk = true;
				this.disableApproveRemoveEntrust = true;
			} else if (this.status == 11) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = true;
				this.isLawyerRemoveEntrust = true;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = false;
				this.disableApproveServiceOk = true;
				this.disableApproveRemoveEntrust = true;
			} else if (this.status == 14) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = true;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = true;
				this.disableApproveServiceOk = true;
				this.disableApproveRemoveEntrust = true;
			} else if (this.status == 4) {
				this.isLawyerServiceOk = true;
				this.isClientServiceOk = false;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = true;
				this.disableApproveServiceOk = true;
				this.disableApproveRemoveEntrust = true;
			} else if (this.status == 16) {
				this.isLawyerServiceOk = true;
				this.isClientServiceOk = true;
				this.disableServiceOk = false;
				this.isLawyerRemoveEntrust = false;
				this.isClientRemoveEntrust = false;
				this.disableRemoveEntrust = true;
				this.disableApproveServiceOk = false;
				this.disableApproveRemoveEntrust = true;
			} else if (this.status == 17) {
				this.isLawyerServiceOk = false;
				this.isClientServiceOk = false;
				this.disableServiceOk = true;
				this.isLawyerRemoveEntrust = true;
				this.isClientRemoveEntrust = true;
				this.disableRemoveEntrust = false;
				this.disableApproveServiceOk = true;
				this.disableApproveRemoveEntrust = false;
			}
			// 投资人确认完成
			else if (this.status == 6) {
				if (this.userInfo.id == orderInfo.order.user_id) { //委托人
					this.replace('/pages/client/user/service-ok', {
						order_id: orderInfo.order.id
					});
				} else if(this.userInfo.user_type == 3) { //律师
					this.replace('/pages/lawyer/user/service-ok', {
						order_id: orderInfo.order.id
					});
				}else if(this.userInfo.user_type == 4) { //投资人
					this.replace('/pages/investor/user/service-ok', {
						order_id: orderInfo.order.id
					});
				}
			}
			// 投资人确认解除服务
			else if (this.status == 12) {
				console.log(this.userInfo.is_touziren+'--');
				if (this.userInfo.id == orderInfo.order.user_id) { //委托人
					if(orderInfo.order.pro_name == '打官司'){
						this.replace('/pages/client/user/service-jiechu', {
							order_id: orderInfo.order.id
						});
					}else{
						this.replace('/pages/client/user/service-remove', {
							order_id: orderInfo.order.id
						});
					}
				} else if(this.userInfo.user_type == 3) { //律师
					if(orderInfo.order.pro_name == '打官司'){
						this.replace('/pages/lawyer/user/service-jiechu', {
							order_id: orderInfo.order.id
						});
					}else{
						this.replace('/pages/lawyer/user/service-remove', {
							order_id: orderInfo.order.id
						});
					}
					
				}else if(this.userInfo.is_touziren == 1) { //投资人
					this.replace('/pages/investor/user/service-remove', {
						order_id: orderInfo.order.id
					});
				}
			}
		}
	}
}
