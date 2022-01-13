<template>
	<!-- 结算收益组件 -->
	<view class="popup-common-box">
		<view class="popup-title">
			<view class="title-txt">{{title}}</view>
			<view class="title-close" @click="close">
				<view class="image-wrapper"><image src="@/static/img/close.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<slot name="popup-con"></slot>
		<slot name="popup-btn"></slot>
	</view>
</template>

<script>
export default {
	props: {
		title:""
	},
	data() {
		return {};
	},
	methods: {
		close() {
			this.$emit('closePop');
		}
	}
};
</script>

<style lang="scss">


.popup-common-box {
	width: 660rpx;
	box-sizing: border-box;
	overflow: auto;
	border-radius: 26rpx;
		background-color: #F5f5f5;
	// 	height: 1270rpx;
	.popup-title {
		display: flex;
		align-items: center;
		.title-txt {
			flex: 1;
			text-align: center;
			padding: 20rpx;
			font-weight: bold;
		}
		.title-close {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			.image-wrapper {
				width: 26rpx;
				height: 26rpx;
				vertical-align: middle;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.od-box{
		background: red;
	}
	
}
</style>
