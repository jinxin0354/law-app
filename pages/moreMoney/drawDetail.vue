<template>
	<view class="content">
		<!-- <view class="itm-box">
			<view class="item-all">
				<view class="item-main">
					<view class="item-top">
						<view class="item-price">2000.00</view>
						<view class="item-txt">营销分成</view>
					</view>
					<view class="item-bottom">
						<view class="item-txt">已到账</view>
						<view class="item-no">订单号：123456789215</view>
					</view>
				</view>
				<view class="item-fee">
					<view class="item-cricle"></view>
					<view class="item-txt">扣除税费20%、支付宝支付通道费用16.2</view>
				</view>
				<view class="item-fee">
					<view class="item-cricle"></view>
					<view class="item-txt">
						可提现
						<text class="item-color">￥1582.00</text>
					</view>
				</view>
			</view>
			<view class="item-all">
				<view class="item-main">
					<view class="item-top">
						<view class="item-price">2000.00</view>
						<view class="item-txt">营销分成</view>
					</view>
					<view class="item-bottom">
						<view class="item-txt">已到账</view>
						<view class="item-no">订单号：123456789215</view>
					</view>
				</view>
				<view class="item-fee">
					<view class="item-cricle"></view>
					<view class="item-txt">扣除税费20%、支付宝支付通道费用16.2</view>
				</view>
				<view class="item-fee">
					<view class="item-cricle"></view>
					<view class="item-txt">
						可提现
						<text class="item-color">￥1582.00</text>
					</view>
				</view>
			</view>
			<view class="item-all">
				<view class="item-main">
					<view class="item-top">
						<view class="item-price">2000.00</view>
						<view class="item-txt">营销分成</view>
					</view>
					<view class="item-bottom">
						<view class="item-txt">已到账</view>
						<view class="item-no">订单号：123456789215</view>
					</view>
				</view>
				<view class="item-fee">
					<view class="item-cricle"></view>
					<view class="item-txt">扣除税费20%、支付宝支付通道费用16.2</view>
				</view>
				<view class="item-fee">
					<view class="item-cricle"></view>
					<view class="item-txt">
						可提现
						<text class="item-color">￥1582.00</text>
					</view>
				</view>
			</view>
		</view> -->
	
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		this.init();
	},
	methods: {
		async init() {}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}
.content {
}
.item-all {
	border-radius: 20rpx;
	background-color: #ffffff;
	margin-top: 20rpx;
	padding-bottom: 26rpx;
}
.item-main {
	height: 124rpx;
	margin: 0 30rpx;
	border-bottom: 1rpx #efefef solid;
	.item-top {
		display: flex;
		padding-top: 24rpx;
		.item-price {
			font-size: 32rpx;
			color: #e02e24;
		}
		.item-txt {
			font-size: 28rpx;
			color: #999999;
			flex: 1;
			display: flex;
			flex-direction: row-reverse;
		}
	}
	.item-bottom {
		display: flex;
		margin-top: 6rpx;
		.item-txt {
			color: #999999;
			font-size: 26rpx;
		}
		.item-no {
			flex: 1;
			display: flex;
			flex-direction: row-reverse;
			font-size: 26rpx;
			color: #999999;
		}
	}
}
.item-fee {
	display: flex;
	align-items: center;
	margin: 16rpx 30rpx 0;
	.item-cricle {
		width: 10rpx;
		height: 10rpx;
		background-color: #999999;
		border-radius: 50%;
	}
	.item-txt {
		font-size: 28rpx;
		color: #999999;
		margin-left: 10rpx;
		.item-color {
			color: #70c226;
		}
	}
}
</style>
