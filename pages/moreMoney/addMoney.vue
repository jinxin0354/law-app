<template>
	<view class="withdraw-box">
		<view class="withdraw-item">
			<view class="item-txt">充值金额</view>
			<view class="item-input">
				￥
				<input type="number" v-model="amount"  value="" placeholder="请输入充值金额" placeholder-style="font-size:28rpx;font-weight: normal;" />
			</view>
			<view class="item-blow">
				<view class="blow-txt">选择充值方式</view>
				<radio-group @change="checkboxChange">
					<label>
						<view class="blow-way">
							<view class="way-img"><image src="@/static/img/withdraw-vx.png" style="width: 42rpx;height: 42rpx;"></image></view>
							<view class="way-txt">微信</view>
							<view class="way-check-img">
								<view class="radio"><radio color="#E02E24" checked="" style="transform:scale(0.8)" value="wechat"></radio></view>
							</view>
						</view>
					</label>
					<label>
						<view class="blow-way">
							<view class="way-img"><image src="@/static/img/withdraw-zfb.png"></image></view>
							<view class="way-txt">支付宝</view>
							<view class="way-check-img">
								<view class="radio"><radio color="#E02E24" style="transform:scale(0.8)" value="alipay"></radio></view>
							</view>
						</view>
					</label>
				</radio-group>
			</view>
			<view class="item-bottom" @click="confirm"><view class="bottom-txt">确认充值</view></view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			token: uni.getStorageSync('token'),
			info: {
				user: {}
			}, //用户信息
			pay_type: 'wechat', //支付方式
			amount: '' //充值金额
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	onLoad() {
		this.init();
	},
	onShow() {
		this.init();
	},
	methods: {
		payOk(res) {
			// 安卓0 支付成功，-1 支付失败， -2取消支付
			if (res == '0') {
				this.amount = '';
				console.log(res)
				console.log("payOk")
				console.log(this.pay_type)
				if (this.pay_type == 'alipay') {
					uni.showToast({
						title: '支付成功',
						icon: 'none'
					});
				}
			}
		},
		//输入框取整
		paseMoney() {
			this.amount = parseInt(this.amount);
			console.log(this.amount);
		},
		goNext() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			});
			return;
			uni.navigateTo({
				url: '../../moreMoney/drawDetail'
			});
		},
		navBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		async init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.user', formData);
			this.info = res.data;
		},
		async confirm() {
			if (!this.amount) {
				uni.showToast({
					title: '请输入充值金额',
					icon: 'none'
				});
				return;
			}
			if(this.amount==0){
				uni.showToast({
					title: '充值金额不能为0',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '支付中...',
				mask: true
			});

			let formData = {
				token: this.token,
				type: this.pay_type,
				amount: this.amount
			};
			let res = await this.$api('index.addorder', formData);
			let params = res.data;
			uni.hideLoading();

			console.log(res.code == 1);
			console.log(this.pay_type);
			if (res.code == 1) {
				if (this.pay_type == 'wechat') {
					const nav = navigator.userAgent;
					if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
						phone.pay('wechatpay', JSON.stringify(params));
					} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						this.$bridge.callhandler('wechatpay', params, data => {
							console.log(data);
							if (data == true) {
								this.amount = '';
								uni.showToast({
									title: '支付成功',
									icon: 'none'
								});
								resolve(1);
							}
						});
					}
				} else if (this.pay_type == 'alipay') {
					const nav = navigator.userAgent;
					if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
						phone.pay('alipay', params);
					} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						this.$bridge.callhandler('alipay', params, data => {
							console.log(data);
							if (data == true) {
								this.amount = '';
								uni.showToast({
									title: '支付成功',
									icon: 'none'
								});
								resolve(1);
							}
						});
					}
				}
			} else {
				uni.showToast({
					title: '获取参数失败',
					icon: 'none'
				});
				reject(res);
			}
		},
		checkboxChange(e) {
			console.log(e);
			this.pay_type = e.detail.value;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}

.withdraw-box {
	.withdraw-item {
		.item-txt {
			padding: 50rpx 0 0 44rpx;
			font-size: 28rpx;
			font-weight: bold;
		}
		.item-input {
			border-bottom: 1rpx #dddddd solid;
			height: 112rpx;
			display: flex;
			align-items: center;
			font-size: 80rpx;
			font-weight: bold;
			margin: 20rpx 30rpx;
			input {
				flex: 1;
				font-size: 80rpx;
			}
		}
		.item-middle {
			height: 69rpx;
			font-size: 26rpx;
			line-height: 69rpx;
			color: #0086b3;
			margin-left: 475rpx;
		}
		.item-blow {
			margin: 0 21rpx 0;
			padding-bottom: 30rpx;
			.blow-txt {
				font-size: 30rpx;
				font-weight: bold;
				line-height: 36rpx;
				margin: 60rpx 0 30rpx 24rpx;
			}
			.blow-way {
				display: flex;
				padding: 30rpx 0;
				align-items: center;
				margin: 0 30rpx;
				border-bottom: 1rpx #dddddd solid;
				.way-img {
					width: 42rpx;
					height: 42rpx;
					margin-right: 20rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.way-txt {
					flex: 1;
					font-size: 30rpx;
					font-weight: bold;
					line-height: 36rpx;
					color: #000000;
				}
				.way-check-img {
					.radio {
						width: 36rpx;
						height: 36rpx;
						margin-right: 16rpx;
					}
				}
			}
			.blow-cut {
				width: 721rpx;
				height: 2rpx;
				margin-left: 29rpx;
				background-color: #efefef;
			}
		}
		.item-bottom {
			position: fixed;
			bottom: 116rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 680rpx;
			height: 80rpx;
			background-color: #70c226;
			border-radius: 40rpx;
			font-size: 32rpx;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
}
</style>
