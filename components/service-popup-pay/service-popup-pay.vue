<template>
	<view class="popup-bottom-box">
		<view class="bot-title">
			<view class="title-txt">{{title}}</view>
			<view class="title-close" @click="close">
				<view class="image-wrapper"><image src="@/static/img/close.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<view class="bot-con">
			<view class="od-box">
				<slot name="payOption"></slot>
				<view class="od-item">
					<view class="item-tip require">付款方式</view>
					<view class="item-right">
						<view class="pay-list" style="width: 100%; display: flex; flex-wrap: wrap;">
							<view class="pay-item" :class="payMethod == '微信' ? 'active' : ''" @click="payMethod = '微信'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon1.png" mode="aspectFit"></image></view>
								微信
							</view>
							<view class="pay-item" :class="payMethod == '支付宝' ? 'active' : ''" @click="payMethod = '支付宝'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon2.png" mode="aspectFit"></image></view>
								支付宝
							</view>
							<view class="pay-item" :class="payMethod == '余额' ? 'active' : ''" @click="payMethod = '余额'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon3.png" mode="aspectFit"></image></view>
								余额
							</view>
							<view class="pay-item" :class="payMethod == '朋友代付' ? 'active' : ''" @click="payMethod = '朋友代付'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon4.png" mode="aspectFit"></image></view>
								朋友代付
							</view>
						</view>
					</view>
				</view>
				<slot name="payOption2"></slot>
			</view>
		</view>
		<view class="ok-box"><button type="default" class="ok-btn" @click="confirmPay" style="margin: -30rpx 100rpx 0;">{{btnText}}</button></view>
	</view>
</template>

<script>
export default {
	props: {
		title: '',
		btnText:{
			type:String,
			default: "确定" 
		}
	},
	data() {
		return {
			payMethod: '微信' //付款方式
		};
	},
	methods: {
		close() {
			this.$emit('closePop');
		},
		confirmPay(){
			this.$emit('confirmPay',this.payMethod)
		}
	}
};
</script>

<style lang="scss">
.service-title {
	margin-bottom: 20rpx;
	position: relative;
	font-weight: bold;
	&.require::after {
		content: '*';
		position: absolute;
		color: #f00;
		font-weight: normal !important;
		font-size: 30rpx;
	}
}
.popup-bottom-box {
	background-color: #ffffff;
	overflow: auto;
	border-radius: 26rpx;
	.bot-title {
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
	.bot-con {
		width: 660rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		.service-list {
			margin-bottom: 20rpx;
		}
		.od-box {
			padding: 0;
		}
	}
}
.pay-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	.pay-item {
		display: flex;
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
	}
}
.item-tip{
	margin-top: 12rpx;
}
</style>
