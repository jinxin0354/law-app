<template>
	<view class="content">
		<view class="od-box paddingbottom0">
			<view class="od-item flex flex-horizontal flex-center-v">
				<view class="item-tip">收款人</view>
				<view class="item-right"><view class="item-txt" style="margin-left: 38px;">投资人</view></view>
			</view>
			<view class="od-item">
				<view class="item-tip" style="margin-top: 5px;">退回事项<text style="color: red;">*</text></view>
				<view class="item-right">
					<view class="why-box">
						<checkbox-group @change="resultChange">
							<view class="flex flex-horizontal flex-center-v">
								<label>
									<view class="flex flex-horizontal flex-center-v" >
										<image v-if="result.indexOf('checkValue1') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
										<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
										<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue1" checked="" />
									</view>
								</label>
								<view class="flex flex-horizontal flex-center-v" style="margin-left: 15px;">
									<view class="flex flex-horizontal flex-center-v flex-1" style="white-space:nowrap;" >
										案件受理费
										<text>￥</text>
									</view>
									<view class="input-border">
										<input class="why-ipt" type="number" v-model="case_money" :disabled="result.indexOf('checkValue1') == -1" placeholder="请输入" placeholder-class="placeholder" />
									</view>
								</view>
							</view>
							<view class="flex flex-horizontal flex-center-v item">
								<label>
									<view class="flex flex-horizontal flex-center-v">
										<image v-if="result.indexOf('checkValue2') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
										<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
										<checkbox color="#FFC801" style="transform: scale(0.7);display: none;"  value="checkValue2" checked="false" />
									</view>
								</label>
								<view class="flex flex-horizontal flex-center-v" style="margin-left: 15px;">
									<view class="why-txt">
										公告费
										<text>￥</text>
									</view>
									<view class="input-border"><input class="why-ipt" type="number" v-model="announce_money" :disabled="result.indexOf('checkValue2') == -1" placeholder="请输入" placeholder-class="placeholder" /></view>
								</view>
							</view>
							<view class="flex flex-horizontal flex-center-v item">
								<label>
									<view class="flex flex-horizontal flex-center-v">
										<image v-if="result.indexOf('checkValue3') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
										<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
										<checkbox color="#FFC801" style="transform: scale(0.7);display: none;"  value="checkValue3"  checked="false" />
									</view>
								</label>
								<view class="checkbox-right flex flex-horizontal">
									<view class=" flex flex-horizontal flex-center-v flex-1"  style="margin-left: 15px;">
										<view class="why-txt" style="white-space:nowrap;">
											异地被告身份查询费
											<text>￥</text>
										</view>
										<view class="input-border">
											<input class="why-ipt" type="number" v-model="enquire" placeholder="请输入" :disabled="result.indexOf('checkValue3') == -1" placeholder-class="placeholder" />
										</view>
									</view>
								</view>
							</view>
							<view class="flex flex-horizontal flex-center-v item">
								<label>
									<view class="flex flex-horizontal flex-center-v">
									<image v-if="result.indexOf('checkValue4') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
										<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
										<checkbox color="#FFC801" style="transform: scale(0.7);display: none;"  value="checkValue4"  checked="false" />
									</view>
								</label>
								<view class="checkbox-right flex flex-horizontal">
									<view class=" flex flex-horizontal flex-center-v flex-1"  style="margin-left: 15px;">
										<view class="why-txt" style="white-space:nowrap;">
											律师费
											<text>￥</text>
										</view>
										<view class="">
											<input class="why-ipt" type="number" v-model="lawyer" placeholder="请输入" disabled="" placeholder-class="placeholder" />
										</view>
									</view>
								</view>
							</view>
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
							<view class="item-txt red">￥{{ Number(this.case_money) + Number(this.announce_money) + Number(this.enquire) + (result.indexOf('checkValue4') == -1 ? 0 : Number(this.lawyer))}}</view>
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
			lawyer: '1500',
			result: [
				'checkValue1',
				'checkValue2',
				'checkValue3'
			]
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
			let sum = Number(this.case_money) + Number(this.announce_money) + Number(this.enquire) +  (this.result.indexOf('checkValue4') == -1 ? 0 : Number(this.lawyer));
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
				lawyer:(this.result.indexOf('checkValue4') == -1 ? 0 : Number(this.lawyer))
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
	.item {
		height: 30px;
	}
	.input-border {
		border-bottom: 1rpx solid #eee;
		vertical-align: bottom;
		margin-left: 20rpx;
		padding-bottom: 4rpx;
	}
	
	.check-img {
		width: 15px;
		height: 15px;
		margin-left: 7.5px;
		margin-top:4px;
	}
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
