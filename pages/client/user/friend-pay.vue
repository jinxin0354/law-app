<template>
	<view class="content">
		<view class="pay-box">
			<view class="pay-item">
				<view class="item-top">
					<view class="item-img"><image src="@/static/img/pay-for-incon3.png" mode="aspectFit"></image></view>
					<view class="item-txt">
						<!-- TODO 微信好友名字-->
						<view class="txt-phone">*</view>
						<view class="txt-thank">帮我付下这件商品吧，谢谢啦~</view>
					</view>
				</view>
				<view class="item-info">
					<view class="info-title">代付金额</view>
					<view class="info-symbol">
						￥
						<view class="info-price">{{ info.money }}</view>
					</view>
					<template v-if="Object.keys(info).length > 0">
						<view class="paySuc green" v-if="info.pay_status == 1">
							<image src="@/static/img/green-scu.png" mode="aspectFit"></image>
							<text>支付成功</text>
						</view>
						<view class="info-transmit" @click="confirmPay" v-else>立即支付</view>
					</template>
					<view class="info-txt">如果订单申请退款，已支付金额将原路退还给您</view>
					<view class="info-cut"></view>
					<!-- TODO 订单-->
				</view>
			</view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
	data() {
		return {
			info: {},
			order_id: '',
			pay_type: '',
			wxcode: '', //微信h5支付
			open_id: ''
		};
	},
	onLoad(options) {
		let routes = getCurrentPages();
		let curParam = routes[routes.length - 1].options;
		this.order_id = curParam.order_id;
		this.pay_type = curParam.pay_type;
	},
	onShow() {
		this.wxcode = this.getCode();
		if (!this.wxcode) {
			//去授权
			this.wx_login();
		} else {
			this.getOderId();
			this.init();
		}
	},
	methods: {
		// 微信授权登录
		async wx_login() {
			let formData = {
				url: `${this.$VIEW_URL}/#/pages/client/user/friend-pay?order_id=${this.order_id}_${this.pay_type}`
			};
			let res = await this.$api('index.wx_code', formData);
			location.href = res.data;
		},
		async init() {
			let formData = {
				id: this.order_id,
				pay_type: this.pay_type
			};
			let res = await this.$api('index.friend_pay', formData);
			this.info = res.data;
		},
		async confirmPay() {
			let formData = {
				id: this.order_id,
				pay_type: this.pay_type
			};
			// 如果点击支付，没支付，关掉页面。再次点击支付参数失效，传openid给接口
			if (this.open_id) {
				formData = {
					...formData,
					open_id: this.open_id
				};
			} else {
				formData = {
					...formData,
					code: this.wxcode
				};
			}

			let res = await this.$api('index.wx_login', formData);
			this.open_id = res.data.open_id;
			this.onBridgeReady(res.data.response);
		},
		onBridgeReady(wxpay) {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				{
					appId: wxpay.appId,
					timeStamp: wxpay.timeStamp,
					nonceStr: wxpay.nonceStr,
					package: wxpay.package,
					signType: wxpay.signType,
					paySign: wxpay.paySign
				},
				res => {
					this.init();
				}
			);
		},
		getCode() {
			let locat_href = window.location.href;
			let array1 = locat_href.split('&');
			let pair = array1[0].split('?');
			let pair2 = pair[1].split('=');
			if (pair2[0] == 'code') {
				return pair2[1];
			} else {
				return '';
			}
		},
		getOderId() {
			let locat_href = window.location.href;
			let array1 = locat_href.split('&');
			let pair = array1[1].split('?');
			let pair2 = pair[1].split('=');
			if (pair2[0] == 'order_id') {
				this.order_id = pair2[1].split('_')[0];
				this.pay_type = pair2[1].split('_')[1];
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.pay-item {
	background-image: url(@/static/img/pay-for-icon1.png);
	background-repeat: no-repeat;
	height: 360rpx;
	background-size: 100% 100%;
	.item-top {
		display: flex;
		.item-img {
			height: 120rpx;
			width: 120rpx;
			padding: 50rpx 0 0 40rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.item-txt {
			color: #ffffff;
			.txt-phone {
				font-size: 26rpx;
				padding: 62rpx 0 0 25rpx;
			}
			.txt-thank {
				background-image: url(@/static/img/pay-watch-icon1.png);
				background-repeat: no-repeat;
				height: 60rpx;
				width: 446rpx;
				font-size: 28rpx;
				line-height: 60rpx;
				text-align: center;
				margin: 26rpx 0 51rpx 25rpx;
			}
		}
	}
	.item-info {
		flex: 1;
		width: 710rpx;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 16rpx;
		.info-title {
			display: flex;
			justify-content: center;
			padding-top: 42rpx;
			font-size: 28rpx;
			font-weight: bold;
		}
		.info-symbol {
			display: flex;
			justify-content: center;
			padding-top: 41rpx;
			font-size: 34rpx;
			font-weight: bold;
			line-height: 60rpx;
			.info-price {
				font-size: 66rpx;
				line-height: 50rpx;
			}
		}
		.info-transmit {
			display: flex;
			width: 660rpx;
			height: 80rpx;
			margin: 40rpx auto 35rpx;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			font-size: 32rpx;
			background-color: #e02e24;
			border-radius: 10rpx;
		}
		.info-txt {
			display: flex;
			font-size: 26rpx;
			justify-content: center;
			color: #aaa;
		}
		.info-cut {
			height: 1rpx;
			background-color: #e9e9e9;
			margin: 39rpx 25rpx 0;
		}
		.info-bottom {
			display: flex;
			padding-bottom: 36rpx;
			.bottom-img {
				width: 120rpx;
				height: 120rpx;
				margin: 76rpx 17rpx 0 25rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.bottom-right {
				.right-txt {
					font-size: 32rpx;
					line-height: 18rpx;
					margin: 35rpx 0 14rpx;
					font-weight: bold;
				}
				.text-ellipsis {
					.tip-item {
						margin-left: 10rpx;
						font-size: 24rpx;
						color: #747474;
					}
				}
			}
		}
	}
}
.paySuc {
	margin: 20rpx;
	line-height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
}
</style>
