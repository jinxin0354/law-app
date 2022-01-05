<template>
	<view class="fixedTop">
		<view class="top-nav-box">
			<view class="nav-back" @click="navBack()">
				<view class="image-wrapper"><image src="@/static/img/black-back.png" mode="aspectFit"></image></view>
			</view>
			<view class="nav-txt flex1">余额</view>
			<view class="nav-right" @click="goNext()"><text style="margin: 0 auto;font-size: 26rpx;">余额明细</text></view>
			<!-- <slot></slot> -->
		</view>
		<view class="item-main">
			<view class="main-img"><image src="@/static/img/moreMoney.png" mode=""></image></view>
			<view class="main-price">￥{{user.money}}</view>
			<view class="" v-for="(item, index) in data" :key="index">
				<view class="main-add" :class="index == current ? 'active' : ''" @click="changePay(index)">{{ item }}</view>
				<!-- <view class="main-add main-up">提现</view> -->
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			data: ['充值', '提现'],
			current: 0, //当前选择支付方式
			user:''
		};
	},
	
	onLoad() {
		this.init();
	},
	onShow() {
		this.init();
		console.log("onshow")
	},
	methods: {
		async init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.user', formData);
			this.user = res.data.user;
		},
		navBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		changePay(index) {
			this.current = index;
			if (index == 1) {
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				});
				return;
				uni.navigateTo({
					url: '../client/user/withdraw'
				});
			}else if(index==0){
				uni.navigateTo({
					url: './addMoney'
				});
			}
		},
		goNext() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			});
			return;
			uni.navigateTo({
				url: './DeatilMoney'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
}
.top-nav-box {
	background: #ffffff;
	color: #303133;
	text-align: center;
	position: relative;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 32rpx;
	display: flex;
	width: 100%;
	// border-bottom: 2rpx solid #f2f2f2;
	.nav-txt {
		font-size: 32rpx;
	}
	.nav-back {
		width: 88rpx;
		height: 88rpx;
		position: absolute;
		top: 0;
		left: 0;
		.image-wrapper {
			margin-left: 14rpx;
			box-sizing: border-box;
			width: 34rpx;
			height: 34rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.nav-right {
		display: flex;
		width: 160rpx;
		height: 60rpx;
		position: absolute;
		top: 50%;
		right: 30rpx;
		line-height: 60rpx;
		transform: translateY(-50%);
		border: 2rpx solid #303133;
		border-radius: 30rpx;
	}
}
.item-main {
	.main-img {
		width: 150rpx;
		height: 150rpx;
		margin: 88rpx auto 36rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.main-price {
		font-size: 80rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 472rpx;
	}
	.main-add {
		width: 350rpx;
		height: 80rpx;
		background-color: #f2f2f2;
		//background-color: #70C226;
		color: #70c226;
		border-radius: 10rpx;
		margin: 0 auto 30rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 80rpx;
	}
	.active {
		background-color: #70c226;
		color: #ffffff;
	}
}
</style>
