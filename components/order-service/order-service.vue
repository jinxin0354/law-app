<template>
	<uni-popup ref="popupEnsure" type="bottom">
		<order-pop-common title="服务保障" @closePop="closePop('popupEnsure')">
			<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
				<view class="con-item" >
				<image src="@/static/img/order-service.png" mode="widthFix"></image>
				</view>
			</scroll-view>
			<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="closePop('popupEnsure')">朕知道了</button></view>
		</order-pop-common>
	</uni-popup>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
	// 弹出层
	.popup-con {
		max-height: 800rpx;
		.con-item {
			padding: 0 30rpx;
			margin-bottom: 10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
