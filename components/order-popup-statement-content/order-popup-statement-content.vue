<template>
	<view class="popup-bottom-box">
<view class="bot-con">
			<view class="od-box">
		<scroll-view scroll-top="0" scroll-y="true">
			<view class="flex-item">
				<!-- 委托人案子以什么方式处理得 -->
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="require text">委托人的案子以什么方式处理的</view>
					</view>
					<view class="item-right">
						<view class="service-list">
							<view class="service-item flex1" :class="moneyparams.chuli_type == '法院判决' ? 'active' : ''"
								@click="moneyparams.chuli_type = '法院判决'">法院判决</view>
							<view class="service-item flex1" :class="moneyparams.chuli_type == '和解/调解' ? 'active' : ''"
								@click="moneyparams.chuli_type = '和解/调解'">和解/调解</view>
							<view class="service-item flex1" :class="moneyparams.chuli_type == '其他方式' ? 'active' : ''"
								@click="moneyparams.chuli_type = '其他方式'">其他方式</view>
						</view>
					</view>
				</view>
				<!-- 委托人主张的欠款本金有多少获得支持 -->
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="require ">委托人主张的欠款本金有多少获得支持</view>
					</view>
					<view class="item-right">
						<view class="service-list">
							<view class="service-item flex1" :class="moneyparams.chuli_money == '全部支持' ? 'active' : ''"
								@click="moneyparams.chuli_money = '全部支持'">全部支持</view>
							<view class="service-item flex1" :class="moneyparams.chuli_money == '部分支持' ? 'active' : ''"
								@click="moneyparams.chuli_money = '部分支持'">部分支持</view>
							<view class="service-item flex1" :class="moneyparams.chuli_money == '全部不支持' ? 'active' : ''"
								@click="moneyparams.chuli_money = '全部不支持'">全部不支持</view>
						</view>
					</view>
				</view>
				<!-- 第二部分输入框计算内容 -->
				<view v-for="(item,index) in swit_flg(moneyparams.chuli_money)" class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<!-- swit_flg(moneyparams.chuli_money)[0] -->
						<view v-if="index==0" class="require">{{item}}
						</view>

						<view v-if="index==1" class="adi-symbol">
							<view class="adi">{{item}}</view>
							<view @click="$refs.direc.open('center')" class="symbol"></view>
						</view>

						<!-- <view class="require">委托人这次收回了多少钱</view> -->
					</view>
					<view v-if="moneyparams.chuli_money == '全部不支持'" style="color: #d4d4d4;">(包括欠款本金、利息/违约金、立案受理费、律师费等)
					</view>

					<view class="item-right" v-if="index==0">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"
								v-model="moneyparams.money" />
						</view>

					</view>
					<view class="item-right" v-if="index==1">
						<view class="computer-text">
							<text class="text-icon">¥</text>
							<view class="text-cont">
								<text v-if="!moneyparams.price"> 待计算</text>
								<text v-else class=""> {{moneyparams.price*0.3}}</text>
							</view>
						</view>
					</view>
				</view>


			</view>
			<!-- 第三部分部分支持  -->
			<view v-if="moneyparams.chuli_money =='部分支持'" class="flex-item" style="margin-top: 15rpx;">
				<view v-for="(item,index) in swit_flg1(moneyparams.chuli_type)" class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view v-if="index<1" class="require">{{item}}</view>
						<view v-if="index==1"><text>{{item}}</text><text class="red">*</text></view>
						<view v-else-if="index==2">{{item}}</view>
						<view v-else-if="index==3" class="adi-symbol">
							<view class="adi">{{item}}</view>
							<view @click="$refs.direc.open('center')" class="symbol"></view>
						</view>

					</view>
					<view class="item-right">
						<view class="item-right" v-if="index>=2">
							<view class="computer-text">
								<text class="text-icon">¥</text>
								<view class="text-cont" v-if="index==2">
									<text v-if="!moneyparams.price" style="color: #000000;">999</text>
									<text v-else class=""> {{}}</text>
								</view>
								<view class="text-cont" v-if="index==3">
									<text v-if="!moneyparams.price"> 待计算</text>
									<text v-else class=""> {{moneyparams.price*0.3}}</text>
								</view>
							</view>
						</view>
						<view v-else class="item-txt">
							<text class="input_icon">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"
								v-model="moneyparams.money" />
						</view>
					</view>
				</view>

			</view>
			<!--第四部分 违约金-->
			<view class="od-item marginbottom10 flex-item" style="margin-top: 15rpx;">
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="adi-symbol">
							<view class="adi">委托人逾期付款的违约金*(如无,请填写0)</view>
							<view @click="$refs.direc.open('center')" class="symbol">
							</view>
						</view>
					</view>
					<view class="item-right">
						<view class="item-txt" style="margin-bottom: 30rpx;">

							<text class="input_icon red1">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"
								v-model="moneyparams.weiyue_money" />

						</view>
					</view>
				</view>
			</view>
			<!-- <template slot="payOption"></template> -->

			<view class="flex-item-i">
				<!-- <uni-data-checkbox value='[1]' multiple>我已与委托人确认付款金额</uni-data-checkbox> -->
				<view @click="flg_check=!flg_check" class="checkbox-style">
					<view class="check-style">
						<view :class="flg_check?'check-style1':''">

						</view>
					</view>
					<!-- <checkbox value="" color="#ffca00" class="check-style" /> -->
					我已与委托人确认付款金额
				</view>
			</view>
			<!-- <template slot="payOption2"></template> -->

			<!-- </service-popup-statement> -->
		</scroll-view>
		<uni-popup ref="direc" type="center">
			<view class="popup-direc-box">

				<view class="bot-title">
					<view class="title-txt">计算方式说明</view>

					<view class="title-close" @click="close">

						<view class="image-wrapper">
							<image src="@/static/img/close.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="blod">委托人这次应付投资收益</view>
					</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<text class="text_icon">委托人起诉的全部金额x30%</text>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="blod">委托人应付的投资费用损失为</view>
					</view>
					<view class="item-right">
						<view class="item-txt1">
							<view class="bt1">法院判决时适用</view>
							<view class="dl1">
								<text class="input_icon">¥</text>
								<view class="text_icon">(委托人原来主张的欠款本金-法院判决支持的欠款本金)÷委托人原来主张的欠款本金×投资人已支付的投资费用</view>
							</view>
						</view>
						<view class="item-txt1">
							<view class="bt1">和解/调解时适用</view>
							<view class="dl1">
								<text class="input_icon">¥</text>
								<view class="text_icon">(委托人原来主张的欠款本金-和解时欠款方同意偿还的欠款本金)÷委托人原来主张的欠款本金×投资人已支付的投资费用</view>
							</view>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="">委托人预期付款的违约金</view>
					</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<text>委托人未付款金额×万分之六×逾期天数</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

</view>
</view>
	</view>
</template>



<script>
	import {
		mixin
	} from '@/common/mixins/specialist_order_state.js';
	import {
		share_coupon
	} from '@/common/mixins/share_coupon.js';
	export default {
		mixins: [mixin, share_coupon],
		data() {
			return {
				info: {
					order: {}
				},
				order_id: '',
				remainTime: {}, //剩余时间
				isTimeOver: true, //倒计时结束
				infoLawyer: {},
				reason: '',
				isTipShow: false,
				infoInbo: {}, //投资人收件信息信息
				payToInvestorInfo: {}, //付款给投资人信息
				moneyNature: '法院判决', //款项性质
				moneyNature1: "全部支持",
				moneyparams: {
					chuli_type: "法院判决",
					chuli_money: "全部支持",
					money: "",
					price: "",
					weiyue_money: ""
				},
				flg_check: false
			};
		},
		onLoad(params) {
			if (params.order_id) {
				this.order_id = params.order_id;
				this.init();
			}
		},

		methods: {
			// direction(){

			// },
			close() {
				this.$refs.direc.close()
			},
			swit_flg(n2) {
				n2 = n2 != '全部不支持' ? '1' : '0'

				let obj = {
					'0': ['委托人起诉金额总和是多少', '委托人应付的投资收益损失为'],
					'1': ['委托人这次收回了多少钱', '委托人这次应付投资收益']
				}
				return obj[n2]
			},
			swit_flg1(n) {
				let str = '您与欠款方和解时,欠款方同意偿还的欠款本金金额是多少'
				switch (n) {
					case '法院判决':
						str = '法院判决支持的欠款本金金额是多少'
						break;
					case '和解/调解':
						str = '您与欠款方和解时,欠款方同意偿还的欠款本金金额是多少'
						// n=1;
						break;
					case '其他方式':
						n = 2;
						break;
					default:
						console.log(4);
						break;
				}
				let arr = ['您原来主张的欠款本金金额是多少',
					str,
					'投资人已支付的费用', '您应付的投资费用损失为'
				]
				return arr
			},
			async init() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.orderDetail', formData);
				this.info = res.data;
				this.getOrderState(this.info);

				let d = this.get15MinutesLater(this.info.order.lawyer_time);
				this.remainTime = this.timeFn(d);
				if (this.remainTime.hour > 0 || this.remainTime.minute > 0 || this.remainTime.second > 0) {
					this.isTimeOver = false;
				}

				let formDataLawyer = {
					id: this.info.order.lawyer,
					token: uni.getStorageSync('token')
				};
				let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
				this.infoLawyer = resLawyer.data;

				if (this.info.order.investor_id) {
					let formDataInbo = {
						id: this.info.order.investor_id,
						token: uni.getStorageSync('token')
					};
					let resInbo = await this.$api('index.investor_address', formDataInbo);
					if (resInbo.code == 1) {
						this.infoInbo = resInbo.data;
					}
				}
			},
			confirmEntrustOk() {
				this.$refs.popupEntrustOk.close();
				this.$refs.popupReason.open();
			},
			async confirmReason() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					reason: this.reason
				};
				let res = await this.$api('index.u_remove_lawyer', formData);
				if (res.code == 1) {
					this.isClientRemoveEntrust = true;
					this.disableServiceOk = true;
					this.$refs.popupReason.close();
					this.$refs.popupEntrustOk.close();
				}
			},
			async sureRemoveEntrust(status, pop) {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.u_lawyer_remove', formData);
				if (res.code == 1) {
					if (pop == 'popupSureRemoveEntrust') {
						this.closePop('popupSureRemoveEntrust');
						this.isClientRemoveEntrust = true;
						this.isLawyerRemoveEntrust = true;
					} else if (pop == 'popupNoSureRemoveEntrust') {
						this.closePop('popupNoSureRemoveEntrust');
						this.isClientRemoveEntrust = false;
						this.isLawyerRemoveEntrust = false;
						this.disableServiceOk = false;
					}
				}
			},
			// 15分钟倒计时结束
			timeup() {
				this.isTimeOver = true;
			},
			// TODO 解除委托判断是否支付
			removeEntrust() {
				if (this.info.order.pend_text.length > 0) {
					this.$refs.popupRemoveEntrust.open();
				} else {
					this.$refs.popupEntrustOk.open();
				}
			},
			async confirmServiceOk() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.u_sure_lawyer', formData);
				if (res.code == 1) {
					this.isClientServiceOk = true;
					this.disableRemoveEntrust = true;
					this.$refs.popupServiceOk.close();
				}
			},
			async sureServiceOk(status, pop) {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.u_sure_lawyer_over', formData);
				if (res.code == 1) {
					if (pop == 'popupSureServiceOk') {
						this.closePop('popupSureServiceOk');
						this.isClientServiceOk = true;
						this.isLawyerServiceOk = true;
					} else if (pop == 'popupNoSureServiceOk') {
						this.closePop('popupNoSureServiceOk');
						this.isClientServiceOk = false;
						this.isLawyerServiceOk = false;
						this.disableRemoveEntrust = false;
						this.disableServiceOk = false;
					}
				}
			},
			async confirmPayToInvestor(payMethod) {
				this.closePop('payToInvestor');
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					type: 1, //1 = 付费给投资人 2= 投资人退款请求 3 = 投资人请求结算 4 添加服务 5 包年包月的续费 6付款给律师
					pay_type: payMethod
				};
				// TODO回款凭证
				// if (this.moneyNature == '投资收益') {
				// 	formData = {
				// 		...formData,
				// 		money: this.payToInvestorInfo.money,
				// 		price: this.payToInvestorInfo.price,
				// 		origin: '第' + this.payToInvestorInfo.origin + '次回款支付投资收益',
				// 		nature: this.moneyNature,
				// 		proof: []
				// 	};
				// } else if (this.moneyNature == '其他费用') {
				// 	formData = {
				// 		...formData,
				// 		money: '',
				// 		price: this.payToInvestorInfo.price,
				// 		origin: '第' + this.payToInvestorInfo.origin + '次回款支付投资收益',
				// 		nature: this.moneyNature,
				// 		proof: []
				// 	};
				// }

				let res = await this.$api('index.money', formData);
				if (res.code == 1) {
					let formDataPay = {
						order_id: res.data.order_id,
						payMethod: payMethod,
						fen: '',
						pay_type: 2
					};
					let resPay = await this.$pay(formDataPay);
					if (resPay == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						this.init();
					}
				}
			},
			payOk(res) {
				// 安卓0 支付成功，-1 支付失败， -2取消支付
				if (res == '0') {
					this.replace('/pages/client/user/match', {
						order_id: this.order_id
					});
				}
			}
		}
	};
</script>


<style lang="scss">
	.content {
		padding-bottom: 30rpx;
	}
.bot-con {
		width: 660rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f5f5f5;
		.service-list {
			margin-bottom: 20rpx;
		}
		.od-box {
			padding: 0;
			// height: 800rpx;
			background: #f5f5f5;
		}
	}
	.popup-bottom-box {
		background-color: #F5f5f5;
		// height: 1270rpx;
		overflow: auto;
		border-radius: 26rpx;
	}

	.checkbox-style {
		// transform: scale(0.7);
		display: flex;
		align-items: center;
		// margin-top: 25rpx;
		align-content: center;

		.check-style {
			width: 30rpx;
			height: 30rpx;
			border: 1rpx solid #6b6b6b;
			position: relative;
			margin-right: 9rpx;
			margin-top: 4rpx;
			// padding: 0.4rpx;
			border-radius: 50%;

			.check-style1 {
				position: absolute;
				top: 3rpx;
				left: 3rpx;
				width: 22rpx;
				height: 22rpx;
				background: #ffca00;
				border: none;
				border-radius: 50%;
			}
		}
	}


	//第一个弹窗的内容
	.flex-item {
		flex-direction: column;
		// padding: 30rpx;
		width: 100%;
		background: #FFFFFF;
		border-radius: 24rpx;

		//每一项内容
		.flex-item-i {
			flex-direction: column;
			// margin-top: 30rpx;
			// margin-bottom: 30rpx;
			padding: 30rpx 30rpx 0 30rpx;
			//每一项内容的上部
			.flex-item-lable {
				position: relative;
				// height: 33rpx;
				display: flex;
				align-content: center;
				line-height: 33rpx;
				// height: 33rpx;
			
				// margin-bottom: 10rpx;
				//矩形图标
				.ico {
					width: 13rpx;
					height: 33rpx;
					background: #ffc900;
					border-radius: 50rpx;
					margin-right: 7rpx;
				}
			
				.text {}
			
				// 标题文字
				.adi-symbol {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: space-between;
			
					// 标题文字
					.adi {
						color: #FF5353;
						font-size: 27rpx;
					}
			
					// 问号图标
					.symbol {
						z-index: 99;
						background: url(@/static/img/question.png);
						// background: red;
						background-size: cover;
						width: 30rpx;
						height: 30rpx;
					}
				}
			
			}
			
			

			.item-right {

				//圆角选项
				.service-list {
					margin-top: 24rpx;

					.service-item {
						border-radius: 50rpx;
					}
				}

				//带付款图标的input空间
				.item-txt {
					position: relative;

					// align-content: center;
					//付款文字样式
					.input_icon {
						position: absolute;
						font-size: 18rpx;
						top: 9rpx;
						left: 10rpx;
						z-index: 8;
					}

					.ipt-border {
						flex: 1;
						margin-top: 10rpx;
						// border: none;
						height: 25rpx;
						text-indent: 24rpx;
						color: #d4d4d4;
					}
				}

				.computer-text {
					display: flex;
					position: relative;
					// margin-left: 10rpx;
					align-items: center;
					margin-bottom: 30rpx;

					// color: #d4d4d4;
					.text-icon {
						color: #f00;
						position: absolute;
						font-size: 18rpx;
						top: 16rpx;
						left: 10rpx;
						margin-right: 7rpx;
						z-index: 8;
					}

					.text-cont {
						// flex: 1;
						margin-top: 10rpx;
						// border: none;
						margin-left: 40rpx;
						// text-indent: 24rpx;
						color: #aaaaaa;
					}
				}

			}
		}
	}

	.red1 {
		color: #F00;
	}

	//第二个弹窗内容

	.popup-direc-box {
		background: #FFFFFF;
		width: 660rpx;
		padding: 30rpx;
		border-radius: 30rpx;

		.bot-title {
			display: flex;
			align-items: center;
			
			.title-txt {
				flex: 1;
				text-align: center;
				padding: 20rpx;
				font-size: 28rpx;
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

		.flex-item-i {
			flex-direction: column;
			//每一项内容的上部
			.flex-item-lable {
				position: relative;
				// height: 33rpx;
				display: flex;
				align-content: center;
				line-height: 33rpx;
				// height: 33rpx;
			
				// margin-bottom: 10rpx;
				//矩形图标
				.ico {
					width: 13rpx;
					height: 33rpx;
					background: #ffc900;
					border-radius: 50rpx;
					margin-right: 7rpx;
				}
			
				.text {}
			
				// 标题文字
				.adi-symbol {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: space-between;
			
					// 标题文字
					.adi {
						color: #FF5353;
						font-size: 27rpx;
					}
			
					// 问号图标
					.symbol {
						z-index: 99;
						background: url(@/static/img/question.png);
						// background: red;
						background-size: cover;
						width: 30rpx;
						height: 30rpx;
					}
				}
			
			}
			
			

			.item-right {
				margin-top: 10rpx;
				margin-bottom: 20rpx;
				color: #848484;
				.item-txt {
					// color: red;
					margin-left: 20rpx;
					.input_icon{
						// margin-left: 7rpx;
						margin-right: 7rpx;
					}
				}
				.item-txt1{
					margin-left: 18rpx;
					.bt1{
						
					}
					.dl1 {
						display: flex;
						// margin-left: 19rpx;
						// flex-direction: column;
						.input_icon {
							margin-left: 2rpx;
						}
						.text_icon {
							margin-left: 7rpx;
						}
					}
				}
			}
		}
	}

</style>
