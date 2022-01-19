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
				<view style="margin-top: 20rpx;">
					<view class="item-tip" style="margin-bottom: 10rpx;">付款方式<span style="color: #FF0000;">*</span></view>
					<view class="item-right">
						<view class="pay-list" style="width: 100%; display: flex; flex-wrap: wrap;">
							<view class="pay-item" :style="payMethod == '微信' ? 'border:1rpx solid #F9B804;' : ''" @click="payMethod = '微信'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon1.png" mode="aspectFit"></image></view>
								微信
							</view>
							<view class="pay-item" :style="payMethod == '余额' ? 'border:1rpx solid #F9B804;' : ''" @click="payMethod = '余额'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon3.png" mode="aspectFit"></image></view>
								余额<span style="color: #777777;font-size: 20rpx;margin-left: 10rpx;">{{money}}</span>
							</view>
							<view class="pay-item" :style="payMethod == '支付宝' ? 'border:1rpx solid #F9B804;' : ''" @click="payMethod = '支付宝'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon2.png" mode="aspectFit"></image></view>
								支付宝
							</view>
							
							<view class="pay-item" :style="payMethod == '朋友代付' ? 'border:1rpx solid #F9B804;' : ''" @click="payMethod = '朋友代付'">
								<view class="image-wrapper"><image src="@/static/img/pay-icon4.png" mode="aspectFit"></image></view>
								朋友代付
							</view>
						</view>
					</view>
				</view>
				<slot name="payOption2"></slot>
			</view>
		</view>
		<view class="pays">
			<view class="total">
				合计 <span style="color: #FF0000;font-weight: bold;">￥{{total}}</span>
			</view>
			<view class="btn" @click="confirmPay">{{btnText}}</view>
			<!-- <button type="default" class="ok-btn" @click="confirmPay" style="margin: -30rpx 100rpx 0;">{{btnText}}</button> -->
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: '',
		btnText:{
			type:String,
			default: "确定" 
		},
		money:'',
		total:0
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
	background-color: #F5F5F5;
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
			background: none;
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
		border-radius: 50rpx;
		padding: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		text-align: center;
		width: calc((100% - 20rpx) / 2);
		margin-bottom: 20rpx;
		background: white;
		&:nth-of-type(2n) {
			margin-right: 0;
		}
		&.active {
			// background-color: rgba(255, 200, 1, 0.2);
			border-color: #F9B804;
			border: 1rpx solid #F9B804;
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
.pays{
	margin-left: 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 30rpx;
	margin-bottom: 40rpx;
}
.btn{
	width: 300rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 38rpx;
	background: #FFC900;
	color: white;
	text-align: center;
	font-weight: 300;
	letter-spacing: 1rpx;
}
.total{
	color: #000000;
	font-size: 28rpx;
}
</style>
