<template>
	<view class="od-item marginbottom20">
		<view class="item-tip">服务领域</view>
		<view class="item-right" @click="openServiceArea()">
			<view class="service-list inline-list">
				<view class="service-item active">{{ area_name }}</view>
			</view>
			<text class="cjg blue" v-if="info.product.product == '管家'" @click.stop="jump('/pages/client/order/cang')">藏经阁</text>
			<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit" v-if="info.product.product != '刑事会见' && info.product.product != '打官司'"></image></view>
		</view>
		<!-- 服务领域组件 -->
		<order-service-area ref="orderServiceArea" :info="info" v-if="Object.keys(info.product).length > 0" @confirm="confirm"></order-service-area>
	</view>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			area_name: ''
		};
	},
	created() {
		this.area_name = this.info.product.area.area_name;
	},
	methods: {
		async confirm(current_area) {
			this.area_name = current_area.area_name;
			this.$bus.$emit('changeDesc', current_area);
			this.$emit('changeMeet',current_area)
		},
		openServiceArea() {
			if (this.info.product.product != '刑事会见' && this.info.product.product != '打官司') {
				this.$refs.orderServiceArea.$refs.popupChooseServiceArea.open();
			}
		}
	}
};
</script>

<style lang="scss">
.cjg {
	padding: 0 40rpx;
	position: absolute;
	right: 0rpx;
	height: 62rpx;
	line-height: 62rpx;
}
</style>
