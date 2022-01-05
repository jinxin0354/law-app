<template>
	<view class="content">
		<view class="od-box paddingbottom0">
			<view class="od-item">
				<view class="item-tip">收款人</view>
				<view class="item-right"><view class="item-txt">投资人</view></view>
			</view>
			<view class="od-item">
				<view class="item-tip require">申请事项</view>
				<view class="item-right">
					<view class="why-box">
						<checkbox-group @change="resultChange">
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue1" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												案件受理费
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="case_money" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
									</view>
								</view>
							</label>
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue2" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												公告费
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="announce_money" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
									</view>
								</view>
							</label>
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue3" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												异地被告身份查询费
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="enquire" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
									</view>
								</view>
							</label>
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue4" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												律师费用
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="lawyer" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
									</view>
								</view>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">我要退回</button></view>
		<!-- 支付弹出层 -->
		<uni-popup ref="popupWantPay">
			<service-popup-pay title="我要付款" btnText="我要支付" @closePop="closePop('popupWantPay')" @confirmPay="confirmPay">
				<template slot="payOption">
					<view class="od-item marginbottom10">
						<view class="item-tip require">付款金额</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ Number(this.case_money) + Number(this.announce_money) + Number(this.enquire) + Number(this.lawyer) }}</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			case_money: '',
			announce_money: '',
			enquire: '',
			lawyer: '',
			result: []
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
	},
	methods: {
		resultChange(e) {
			this.result = e.detail.value;
		},
		async confirm() {
			let sum = Number(this.case_money) + Number(this.announce_money) + Number(this.enquire) + Number(this.lawyer);
			if (sum < 0.01) {
				uni.showToast({
					title: '退回投资费用需大于0',
					icon: 'none'
				});
				return;
			} else {
				this.$refs.popupWantPay.open();
			}
		},
		async confirmPay(payMethod) {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				case_money: Number(this.case_money),
				announce_money: Number(this.announce_money),
				enquire: Number(this.enquire),
				lawyer: Number(this.lawyer)
			};

			let res = await this.$api('index.lawyer_back', formData);
			if (res.code == 1) {
				let formDataPay = {
					order_id: res.data.order_id,
					payMethod: payMethod,
					fen: '',
					pay_type: 4
				};

				let resPay = await this.$pay(formDataPay);
				if (resPay == 1) {
					this.$refs.popupWantPay.close();
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					prevPage.$vm.init();
					uni.navigateBack({
						delta: 1
					});
				}
			}
		},
		payOk(res) {
			// 安卓0 支付成功，-1 支付失败， -2取消支付
			if (res == '0') {
				this.$refs.popupWantPay.close();
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.init();
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 150rpx;
}
.result-ipt {
	padding-left: 10rpx;
	padding-right: 10rpx;
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-checkbox {
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.checkbox-left {
			width: 60rpx;
		}
		.checkbox-right {
			width: calc(100% - 60rpx);
			.checkbox-item {
				display: flex;
				flex-wrap: wrap;
			}
			.why-ipt-box {
				flex: 1;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				vertical-align: bottom;
				margin-left: 20rpx;
				padding-bottom: 4rpx;
			}
		}
	}
}
.arrow-right {
	margin-top: 10rpx;
	width: 100%;
	border-bottom: none;
	display: flex;
	.arrow-img {
		margin-top: 10rpx;
		width: 26rpx;
		height: 26rpx;
	}
}
</style>
