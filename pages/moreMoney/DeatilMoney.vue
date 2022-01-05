<template>
	<view class="content">
		<!-- <view class="item-main">
			<view class="item-top">
				<view class="item-price">2000.00</view>
				<view class="item-txt">营销分成</view>
			</view>
			<view class="item-bottom">
				<view class="item-txt">已到账</view>
				<view class="item-no">订单号：123456789215</view>
			</view>
		</view>
		<view class="item-main">
			<view class="item-top">
				<view class="item-price">2000.00</view>
				<view class="item-txt">投资收益</view>
			</view>
			<view class="item-bottom">
				<view class="item-txt">已到账</view>
				<view class="item-no">订单号：123456789215</view>
			</view>
		</view> -->
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
		this.add
		this.init();
		console.log("aaa")
	},
	methods: {
		add(){
			console.log("add")
		},
		async init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.user', formData);
			this.info = res.data;
			console.log("init")
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
}
.content {
	
}
.item-main {
	// background-color: #0086B3;
	height: 124rpx;
	margin: 0 30rpx;
	border-bottom: 1rpx #efefef solid;
	.item-top {
		display: flex;
		padding-top: 24rpx;
		.item-price {
			font-size: 32rpx;
			color: #70c226;
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
</style>
