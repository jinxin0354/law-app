<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的法务专员：</view>
			<view class="match-txt">您好！您的法律服务已经免费取消，如您需要其他法律服务，请点击以下按钮下单。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<law-nav></law-nav>
		</view>
		<!-- 订单详情 -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
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
		}
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
