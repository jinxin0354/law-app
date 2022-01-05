<template>
	<view class="od-item">
		<view class="item-tip require">付款方式</view>
		<view class="item-right">
			<view class="pay-list inline-list">
				<view class="pay-item" :class="payMethod == '微信' ? 'active' : ''" @click="payMethod = '微信'">
					<view class="image-wrapper"><image src="@/static/img/pay-icon1.png" mode="aspectFit"></image></view>
					微信
				</view>
				<view class="pay-item" :class="payMethod == '支付宝' ? 'active' : ''" @click="payMethod = '支付宝'">
					<view class="image-wrapper"><image src="@/static/img/pay-icon2.png" mode="aspectFit"></image></view>
					支付宝
				</view>
				<view class="pay-item" :class="payMethod == '余额' ? 'active' : ''" @click="payMethod = '余额'">
					<view class="pay-ye">
						<view class="image-wrapper"><image src="@/static/img/pay-icon3.png" mode="aspectFit"></image></view>
						余额
					</view>
					<view>{{ info.money }}</view>
				</view>
				<view class="pay-item" :class="payMethod == '朋友代付' ? 'active' : ''" @click="payMethod = '朋友代付'">
					<view class="image-wrapper"><image src="@/static/img/pay-icon4.png" mode="aspectFit"></image></view>
					朋友代付
				</view>
			</view>
			<view class="item-nav"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			payMethod: '微信'
		};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss">
.pay-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	.pay-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1rpx solid #eee;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		text-align: center;
		width: calc((100% - 20rpx) / 2);
		margin-bottom: 20rpx;
		&:nth-of-type(2n) {
			margin-right: 0;
		}
		&.active {
			background-color: rgba(255, 200, 1, 0.2);
			border-color: $uni-color-primary;
		}
		.image-wrapper {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			margin-right: 10rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.pay-ye {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
