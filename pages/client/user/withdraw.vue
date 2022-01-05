<template>
	<view class="withdraw-box">
		<view class="top-nav-box">
			<view class="nav-back" @click="navBack()">
				<view class="image-wrapper"><image src="@/static/img/black-back.png" mode="aspectFit"></image></view>
			</view>
			<view class="nav-txt flex1">提现</view>
			<view class="nav-right" @click="goNext()"><text style="margin: 0 auto;font-size: 26rpx;">可提现明细</text></view>
			<!-- <slot></slot> -->
		</view>
		<view class="withdraw-top">
			<view class="top-txt">可提现金额（元）</view>
			<view class="top-symbol">
				￥
				<text class="top-num">{{ info.user.money }}</text>
			</view>
		</view>
		<view class="withdraw-item">
			<view class="item-upper">
				<view class="upper-txt">提现金额</view>
				<view class="upper-num">
					<view class="upper-num-symbol">￥</view>
					<input class="upper-num-input" type="text" maxlength="10" v-model="okMoney" placeholder="请输入" placeholder-style="font-size:30rpx; color:#aaa;" />
					<view class="upper-num-all" @click="allWithdraw">全部提现</view>
				</view>
			</view>
		<!-- 	<view class="item-middle">提现费用：0.1%</view> -->
			<view class="item-middle"></view>
			<view class="item-blow">
				<view class="blow-txt">提现方式{{ pay_type }}</view>

				<radio-group @change="checkboxChange">
					<label>
						<view class="blow-way">
							<view class="way-img"><image src="@/static/img/withdraw-vx.png" mode="aspectFit"></image></view>
							<view class="way-txt">微信</view>
							<view class="way-check-img">
								<view class="radio"><radio color="#E02E24" checked="" style="transform:scale(0.8)" value="1"></radio></view>
							</view>
						</view>
						<view class="account-box" v-if="pay_type == 1">
							<input type="text" class="ipt-border" placeholder="请输入微信账号" placeholder-class="placeholder" v-model="account" />
							<input type="text" class="ipt-border" placeholder="请输入姓名" placeholder-class="placeholder" v-model="name" />
						</view>
					</label>
					<label>
						<view class="blow-way">
							<view class="way-img"><image src="@/static/img/withdraw-zfb.png" mode="aspectFit"></image></view>
							<view class="way-txt">支付宝</view>
							<view class="way-check-img">
								<view class="radio"><radio color="#E02E24" style="transform:scale(0.8)" value="2"></radio></view>
							</view>
						</view>
						<view class="account-box" v-if="pay_type == 2">
							<input type="text" class="ipt-border" placeholder="请输入支付宝账号" placeholder-class="placeholder" v-model="account" />
							<input type="text" class="ipt-border" placeholder="请输入姓名" placeholder-class="placeholder" v-model="name" />
						</view>
					</label>
				</radio-group>
			</view>
			<view class="item-bottom" @click="confirm"><view class="bottom-txt">确认提现</view></view>
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
			},
			okMoney: '',
			account: '',
			name: '',
			pay_type: 1
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		goNext(){
			uni.navigateTo({
				url:'../../moreMoney/drawDetail'
			})
		},
		navBack() {
			uni.navigateBack({
				delta:1
			})
		},
		async init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.user', formData);
			this.info = res.data;
		},
		allWithdraw() {
			this.okMoney = this.info.user.money;
		},
		async confirm() {
			// uni.showToast({
			// 	title: '开发中',
			// 	icon: 'none'
			// });
			// return;
			if (!this.okMoney) {
				uni.showToast({
					title: '请输入提现金额',
					icon: 'none'
				});
				return;
			}
			if (!this.account) {
				uni.showToast({
					title: '请输入账号',
					icon: 'none'
				});
				return;
			}
			if (!this.name) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return;
			}
			let formData = {
				token: uni.getStorageSync('token'),
				money: this.okMoney,
				type: 1,
				username: this.name,
				mobile: this.account,
				pay_type: this.pay_type
			};
			let res = await this.$api('index.withdraw', formData);
			uni.showToast({
				title: res.msg,
				icon: 'none'
			});
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
	background-color: #f6f6f6;
}

.withdraw-box {
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
	.withdraw-top {
		background-image: url(@/static/img/withdraw-bg.png);
		background-repeat: no-repeat;
		margin-top: -148rpx;
		height: 516rpx;
		background-size: 100% 100%;
		color: #ffffff;
		.top-txt {
			line-height: 40rpx;
			width: 100%;
			padding: 202rpx 0 30rpx 0;
			text-align: center;
		}
		.top-symbol {
			font-size: 52rpx;
			line-height: 54rpx;
			padding: 0 0 30rpx 0;
			text-align: center;
		}
		.top-num {
			font-size: 78rpx;
			line-height: 58rpx;
		}
	}
	.withdraw-item {
		.item-upper {
			background-color: #ffffff;
			height: 210rpx;
			margin: -141rpx 21rpx 0;
			border-radius: 30rpx;
			box-shadow: 0 0 20rpx rgba($color: #838383, $alpha: 0.15);
			.upper-txt {
				font-size: 28rpx;
				line-height: 36rpx;
				padding: 43rpx 0 51rpx 40rpx;
			}
			.upper-num {
				display: flex;
				.upper-num-symbol {
					font-size: 50rpx;
					line-height: 36rpx;
					margin-left: 41rpx;
				}
				.upper-num-figure {
					font-size: 50rpx;
				}
				.upper-num-input {
					flex: 1;
					font-size: 50rpx;
					position: relative;
					margin-top: -20rpx;
				}
				.upper-num-all {
					width: 132rpx;
					height: 44rpx;
					font-size: 24rpx;
					background-color: #e02e24;
					color: #ffffff;
					text-align: center;
					line-height: 44rpx;
					margin-right: 27rpx;
					border-radius: 22rpx;
				}
			}
		}
		.item-middle {
			height: 69rpx;
			font-size: 26rpx;
			line-height: 69rpx;
			color: #999999;
			margin-left: 475rpx;
		}
		.item-blow {
			background-color: #ffffff;
			margin: 0 21rpx 0;
			border-radius: 30rpx;
			box-shadow: 0 20rpx 30rpx rgba($color: #838383, $alpha: 0.15);
			padding-bottom: 30rpx;
			.blow-txt {
				font-size: 32rpx;
				font-weight: bold;
				line-height: 36rpx;
				padding: 47rpx 0 8rpx 37rpx;
			}
			.blow-way {
				display: flex;
				padding: 30rpx 0;
				align-items: center;
				margin: 0 30rpx;
				.way-img {
					width: 36rpx;
					height: 31rpx;
					margin-right: 20rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.way-txt {
					flex: 1;
					font-size: 30rpx;
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
			margin: 30rpx 25rpx 0;
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
.account-box {
	padding: 0 30rpx;
	.ipt-border {
		margin-bottom: 20rpx;
	}
}
</style>
