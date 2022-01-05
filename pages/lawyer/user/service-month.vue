<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的律师：</view>
			<view class="match-txt">您好！请先与委托人联系一下，避免委托人长时间等待，影响服务感受。感谢您的信任与支持！祝您圆满成功！</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/time-green.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right">
					还可咨询
					<text class="red">{{ info.order.day }}</text>
					天
				</view>
			</view>

			<view class="service-list"><button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button></view>
		</view>
		<!-- 待收信息-->
		<order-wait-receive-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-info>
		<!-- 收款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="收款详情" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :isBold="true" :img_src="info.order.desc_content"></order-unfold-product>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mixin } from '@/common/mixins/face_order_state.js';
export default {
	mixins: [mixin],
	data() {
		return {
			info: {
				order: {}
			},
			order_id: '',
			status: -200 //订单状态
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
.ok-box {
	padding: 0;
}
.service-list {
	padding-top: 20rpx;
	margin-bottom: -10px;
}
</style>
