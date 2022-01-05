<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">
				<view class="txt-down"></view>
				您好！法力平台正在为您匹配法务专员，请稍等片刻！我们将全心全意为您提供优质的服务，感谢您的信任与支持！
			</view>
			<view class="service-list">
				<button class="service-item active" style="width:250rpx; margin: auto;" @click="jump('/pages/client/user/to-cancel', { money: info.order.money, order_id: order_id })">
					取消订单
				</button>
			</view>
		</view>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情" :info="info"></order-common-detail>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mixin } from '@/common/mixins/match_specialist_order_state.js';
import { share_coupon } from '@/common/mixins/share_coupon.js';
export default {
	mixins: [mixin, share_coupon],
	data() {
		return {
			order_id: '',
			info: {
				order: {}
			}
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.orderDetail', formData);
			this.info = res.data;
			this.getOrderState(this.info);
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 30rpx;
}
</style>
