<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的法务专员：</view>
			<view class="match-txt">您好！您已圆满完成法律服务，请您返回商城主页参与其他订单。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<law-nav></law-nav>
		</view>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'"></order-case>
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
export default {
	data() {
		return {
			info: {
				order: {}
			},
			order_id: ''
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
		},
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 30rpx;
}
.nav-list {
	margin: 0 -30rpx;
}

</style>
