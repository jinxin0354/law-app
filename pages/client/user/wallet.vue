<template>
	<view class="content">
		<law-top-nav title="钱包"></law-top-nav>
		<view class="wallet-box">
			<view class="wallet-item" @click="jump('/pages/moreMoney/moreMoney')">
				<view class="item-img"><image src="@/static/img/wallet-money.png" mode="aspectFit"></image></view>
				<view class="item-txt">余额</view>
				<view class="item-num">¥{{ info.user.money }}</view>
				<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				<view class="item-border"></view>
			</view>
			<!-- <view class="wallet-item" @click="jump('/pages/client/user/withdraw')">
				<view class="item-img"><image src="@/static/img/wallet-money.png" mode="aspectFit"></image></view>
				<view class="item-txt">可提现金额</view>
				<view class="item-num">¥{{ info.user.money }}</view>
				<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				<view class="item-border"></view>
			</view> -->
			<view class="wallet-item" @click="jump('/pages/client/user/my_coupon')">
				<view class="item-img"><image src="@/static/img/wallet-coupon.png" mode="aspectFit"></image></view>
				<view class="item-txt">我的优惠券</view>
				<view class="item-num">{{ info.user.coupon }}</view>
				<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				<view class="item-border"></view>
			</view>
			<!-- <view class="wallet-item" @click="jump('/pages/client/user/waitWithdraw')">
				<view class="item-img"><image src="@/static/img/wallet-earnings.png" mode="aspectFit"></image></view>
				<view class="item-txt">待结算收益</view>
				<view class="item-white"></view>
				<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				<view class="item-border"></view>
			</view> -->
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {
				user: {}
			}
		};
	},
	
	onLoad() {
		this.init();
	},
	onShow() {
		this.init();
	},
	methods: {
		async init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.user', formData);
			this.info = res.data;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.content {
	padding-top: 88rpx;
}
.wallet-box {
	.wallet-item {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
		font-size: 28rpx;
		.item-img {
			width: 37rpx;
			line-height: 50rpx;
			padding: 0 16rpx 0 35rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.item-txt {
			line-height: 100rpx;
		}
		.item-num {
			flex: 1;
			text-align: right;
			line-height: 100rpx;
			margin-right: 20rpx;
			color: #e02e24;
		}
		.item-white {
			flex: 1;
			width: 100%;
			height: 2rpx;
		}
		.item-nav {
			width: 16rpx;
			line-height: 100rpx;
			margin-right: 20rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.item-border {
			width:100%;
			height: 2rpx;
			margin: 0 30rpx;
			background-color: #efefef;
		}
	}
}
</style>
