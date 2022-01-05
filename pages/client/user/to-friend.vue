<template>
	<view class="content">
		<view class="pay-box">
			<view class="pay-item">
				<view class="item-img"><image src="@/static/img/pay-for-incon2.png" mode="aspectFit"></image></view>
				<view class="item-txt">代付订单已创建成功，发给好友帮你付款吧~</view>
				<view class="item-info">
					<view class="info-title">代付金额</view>
					<view class="info-symbol">
						￥
						<view class="info-price">{{ info.money }}</view>
					</view>
					<view class="info-transmit" @click="goShare()">发送给微信好友</view>
					<view class="info-txt">如果订单申请退款，已支付金额将原路退还给您的好友</view>
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
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			info: {},
			order_id:'',
			pay_type:''
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad(params) {
		if (params.order_id && params.pay_type) {
			this.order_id = params.order_id;
			this.pay_type = params.pay_type;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.order_id,
				pay_type: this.pay_type,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.friend_pay', formData);
			this.info = res.data;
		},
		goShare() {
			let userName = this.userInfo.username.replace(/(\d{3})\d*(\d{4})/,'$1****$2');
			let money = this.info.money;
			let shareInfo = {
				title: `${userName}向您投来期盼的眼神请您帮ta支付${money}元`,
				content: `我在法力APP上找到了厉害的律师帮我，请您助我一臂之力！`,
				imageUrl: `${this.$API_URL}/source/go.png`,
				path: `${this.$VIEW_URL}/#/pages/client/user/friend-pay?order_id=${this.order_id}&pay_type=${this.pay_type}`
			};
			console.log(shareInfo)

			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.share(JSON.stringify(shareInfo));
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('share', shareInfo, data => {
					// 处理返回数据
					console.log(data, '我走了这里');
				});
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
	.item-img {
		height: 80rpx;
		padding-top: 42rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.item-txt {
		margin: 32rpx 83rpx 36rpx;
		color: #ffffff;
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
</style>
