<template>
	<view>
		<view class="wait-box" style="margin-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;" v-if="info.order.pend_text && info.order.pend_text.length > 0">
			<view class="wait-title">待付信息</view>
			<!--
				问题1.
					律师请款需要弹窗
				item.money 请款金额
				item.reason 请款事由
				
				问题2.
					结算投资收益需要弹弹窗
					
			-->
			<view class="wait-item"  v-for="(item, index) in info.order.pend_text">
				<view class="item-item flex flex-vertical">
					<view class="flex flex-horizontal " @click="itemClick(item)">
						<view class="item-money">
							<view>￥{{ item.money }}</view>
						</view>
						<view class="" >
							<view class="txt-name">{{ item.name }}</view>
							<view class="txt-tip">{{ item.time }}</view>
						</view>
						<image v-if="item.shou_type == 2" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
						
					</view>
					<view class="item-btn flex flex-horizontal flex-center " style="margin-top: 10px;">
						<view
							class="comfir-btn flex flex-1 flex-center"
							type="default"
							style="max-width: 50%;"
							@click="
								current_item = item;
								$refs.popupWantPay.open();
							"
						>
							我要付款
						</view>
						<template v-if="item.is_shou == 1">
							<view
								class="comfir-btn flex flex-1 flex-center"
								type="default"
								@click="
									current_item = item;
									$refs.popupReturnReason.open();
								"
							>
								退回申请
							</view>
						</template>
					</view>
				</view>
				<view class="item-item" v-if="item.late_fee && Number(item.late_fee)" @click="lateFeeDetail(item)">
					<view class="item-money">
						<view>￥{{ item.late_fee }}</view>
					</view>
					<view class="item-txt">
						<view class="txt-name">
							<view class="name-tip text-ellipsis">滞纳金</view>
							<view class="txt-nav"><image src="@/static/img/right.png" mode="widthFix"></image></view>
						</view>
					</view>
					<view class="item-btn">
						<template v-if="item.is_shou == 0">
							<button
								v-if="!item.isapplay"
								class="ok-btn marginbottom10"
								type="default"
								@click.stop="
									feeBeginTime = '';
									feeEndTime = '';
									feeMoney = '';
									feeReason = '';
									current_item = item;
									getCurrentFeeList();
									$refs.popupReduceFee.open();
								"
							>
								减免滞纳金
							</button>
							<button
								v-else
								class="ok-btn marginbottom10"
								type="default"
								@click.stop="
									current_item = item;
									$refs.popupCancelReduceFee.open();
								"
							>
								取消申请
							</button>
						</template>
					</view>
				</view>
			</view>
		</view>
		<!-- 支付弹出层 -->
		<uni-popup ref="popupWantPay">
			<service-popup-pay title="我要付款" btnText="我要支付" @closePop="closePop('popupWantPay')" @confirmPay="confirmPay">
				<template slot="payOption">
					<view class="od-item marginbottom20">
						<view class="item-tip require" style="margin-top: 8rpx;">付款金额</view>
						<view class="item-right">
							<view class="item-txt red" v-if="current_item.final_money">￥{{ current_item.final_money }}</view>
							<view class="item-txt red" v-else>￥{{ current_item.money }}</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
		<!-- 退回申请弹出层 -->
		<uni-popup ref="popupReturnReason" type="dialog">
			<uni-popup-dialog-reason
				type="info"
				title=""
				okTxt="确认"
				cancleTxt="取消"
				:showClose="true"
				:before-close="true"
				@confirm="
					$refs.popupReturnReason.close();
					backApply();
				"
				@close="closePop('popupReturnReason')"
			>
				<view class="return-reason-box">
					<view class="return-tip">退回理由</view>

					<textarea class="textarea-border textarea-height" placeholder="请输入" placeholder-class="placeholder" v-model="applyReason" />
				</view>
			</uni-popup-dialog-reason>
		</uni-popup>
		<!-- 滞纳金详情弹出层 -->
		<uni-popup ref="popupFeeDetail" type="center">
			<order-popup-common title="滞纳金明细" @closePop="closePop('popupFeeDetail')">
				<template slot="popup-con">
					<scroll-view class="popup-con" scroll-y="true">
						<view class="wait-box margin0">
							<view class="wait-item" v-for="(item, index) in latefeeInfo" style="border:none" :class="{ textOver: item.isreduction == 1 }">
								<view class="item-item">
									<view class="item-money">
										<view>￥{{ item.fee }}</view>
									</view>
									<view class="item-txt">
										<view class="txt-name">
											<view class="name-tip text-ellipsis">{{ item.feestr }}</view>
										</view>
									</view>
									<view class="item-btn">
										<view class="item-btn-txt">{{ item.steptime }}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="fee-tip">亲爱的, 尽快付款哦, 不要让律师躺赚滞纳金~</view>
					<view class="ok-box"><button type="default" class="ok-btn" @click="closePop('popupFeeDetail')">朕知道了</button></view>
				</template>
			</order-popup-common>
		</uni-popup>
		<!-- 减免滞纳金弹出层 -->
		<uni-popup ref="popupReduceFee" type="center">
			<order-popup-common title="减免滞纳金" @closePop="closePop('popupReduceFee')">
				<template slot="popup-con">
					<scroll-view class="popup-con" scroll-y="true">
						<view class="od-box margin0 paddingbottom0">
							<view class="od-item marginbottom20">
								<view class="item-tip">已产生滞纳金时间段</view>
								<view class="item-right">
									<view class="item-txt">
										<view class="gray">{{ current_item.late_start_time }}至{{ current_item.late_time }}</view>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom20" v-if="current_fee_list.length > 0">
								<view class="item-tip">已申请时间段</view>
								<view class="item-right">
									<view class="item-txt">
										<view class="gray" v-for="current_fee_item in current_fee_list">{{ current_fee_item.start_time }}至{{ current_fee_item.end_time }}</view>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom20">
								<view class="item-tip require">减免时间段</view>
								<view class="item-right">
									<view class="item-jg-tip" @click="showFeeBeginTime = true">
										<view v-if="feeBeginTime">{{ feeBeginTime.year + '-' + feeBeginTime.month + '-' + feeBeginTime.day }}</view>
										<view v-else>开始时间</view>
										<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
									</view>
									<view class="item-jg">--</view>
									<view class="item-jg-tip" @click="showFeeEndTime = true">
										<view v-if="feeEndTime">{{ feeEndTime.year + '-' + feeEndTime.month + '-' + feeEndTime.day }}</view>
										<view v-else>截止时间</view>
										<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom20">
								<view class="item-tip">减免金额</view>
								<view class="item-right">
									<view class="item-txt">
										<text class="red">￥</text>
										<text class="red" v-if="feeMoney">{{ feeMoney }}</text>
										<text class="gray" v-else>请选择减免时间段</text>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom20">
								<view class="item-tip require">申请理由</view>
								<view class="item-right">
									<view class="item-txt"><input type="text" class="ipt-border" placeholder="请输入" placeholder-class="placeholder" v-model="feeReason" /></view>
								</view>
							</view>
						</view>
						<view class="fee-middle-tip">我已与律师沟通好减免事宜</view>
					</scroll-view>
					<view class="ok-box"><button type="default" class="ok-btn" @click="confirmReduceFee">我要减免</button></view>
				</template>
			</order-popup-common>
		</uni-popup>

		<u-picker mode="time" v-model="showFeeBeginTime" confirm-color="#FFC801" @confirm="confirmFeeBeginTime"></u-picker>
		<u-picker mode="time" v-model="showFeeEndTime" confirm-color="#FFC801" @confirm="confirmFeeEndTime"></u-picker>
		<!-- 取消申请滞纳金弹出层 -->
		<uni-popup ref="popupCancelReduceFee" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="取消申请滞纳金"
				:before-close="true"
				@confirm="
					closePop('popupCancelReduceFee');
					confirmCancelReduceFee();
				"
				@close="closePop('popupCancelReduceFee')"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			current_item: {},
			applyReason: '',
			latefeeInfo: [],
			showFeeBeginTime: false,
			showFeeEndTime: false,
			feeBeginTime: '',
			feeEndTime: '',
			feeReason: '',
			feeMoney: '',
			current_fee_list: []
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	methods: {
		itemClick(item) {
			this.$emit('popupShow',item)
		},
		async confirmPay(payMethod) {
			let pay_type;
			let order_id;
			if (this.current_item.fen == 6) {
				//fen == 6付款给律师
				pay_type = 2;
				order_id = this.current_item.id;
			} else {
				//fen == 2 二期；fen == 3 三期；fen == 4 先用后付；fen == 5 律师点我要收款；
				pay_type = 3;
				order_id = this.current_item.id;
			}
			let formDataPay = {
				order_id: order_id,
				payMethod: payMethod,
				fen: this.current_item.fen,
				pay_type: pay_type
			};

			let resPay = await this.$pay(formDataPay);
			if (resPay == 1) {
				this.$refs.popupWantPay.close();
				this.$emit('init');
			}
		},
		payOk(res) {
			// 安卓0 支付成功，-1 支付失败， -2取消支付
			if (res == '0') {
				this.$refs.popupWantPay.close();
				this.$emit('init');
			}
		},
		async backApply() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				origin: this.applyReason
			};
			let res = await this.$api('index.user_back', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.$emit('init');
			}
		},
		// 滞纳金详情
		async lateFeeDetail(item) {
			let formData = {
				id: this.info.order.id,
				step: item.fen,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('latefee.detail', formData);
			this.latefeeInfo = res.data;
			this.$refs.popupFeeDetail.open();
		},
		// 开始时间确认
		confirmFeeBeginTime(e) {
			let time1 = Date.parse(new Date(this.current_item.late_start_time.replace(/-/g, '/')));
			let time2 = Date.parse(new Date(this.current_item.late_time.replace(/-/g, '/')));

			let t = `${e.year}-${e.month}-${e.day}`;
			let time = Date.parse(new Date(t.replace(/-/g, '/')));

			if (time <= time2 && time >= time1) {
				this.feeBeginTime = e;
				this.calcFee();
			} else {
				uni.showToast({
					title: `请选择减免滞纳金内的日期：${this.current_item.late_start_time}至${this.current_item.late_time}`,
					icon: 'none'
				});
			}
		},
		// 结束时间确认
		confirmFeeEndTime(e) {
			let time1 = Date.parse(new Date(this.current_item.late_start_time.replace(/-/g, '/')));
			let time2 = Date.parse(new Date(this.current_item.late_time.replace(/-/g, '/')));

			let t = `${e.year}-${e.month}-${e.day}`;
			let time = Date.parse(new Date(t.replace(/-/g, '/')));

			if (time <= time2 && time >= time1) {
				this.feeEndTime = e;
				this.calcFee();
			} else {
				uni.showToast({
					title: `请选择减免滞纳金内的日期： ${this.current_item.late_start_time}至${this.current_item.late_time}`,
					icon: 'none'
				});
			}
		},
		// 减免金额计算
		async calcFee() {
			if (!this.feeBeginTime) {
				uni.showToast({
					title: '请选择开始时间',
					icon: 'none'
				});
				return;
			}
			if (!this.feeEndTime) {
				uni.showToast({
					title: '请选择截止时间',
					icon: 'none'
				});
				return;
			}
			let formData = {
				start_time: this.feeBeginTime.timestamp,
				end_time: this.feeEndTime.timestamp,
				money: this.current_item.money,
				reason: this.feeReason,
				token: uni.getStorageSync('token'),
				id: this.info.order.id,
				step: this.current_item.fen
			};
			let res = await this.$api('latefee.calculation', formData);
			if (res.code == 1) {
				this.feeMoney = res.data.fee;
			}
		},

		// 我要减免
		async confirmReduceFee() {
			if (!this.feeReason) {
				uni.showToast({
					title: '请输入申请理由',
					icon: 'none'
				});
				return;
			}
			if (!this.feeBeginTime) {
				uni.showToast({
					title: '请选择开始时间',
					icon: 'none'
				});
				return;
			}
			if (!this.feeEndTime) {
				uni.showToast({
					title: '请选择截止时间',
					icon: 'none'
				});
				return;
			}

			this.closePop('popupReduceFee');

			let formData = {
				id: this.info.order.id,
				step: this.current_item.fen,
				fee: this.feeMoney,
				start_time: this.feeBeginTime.timestamp,
				end_time: this.feeEndTime.timestamp,
				reason: this.feeReason,
				token: uni.getStorageSync('token'),
				type: 1,
				user_id: this.info.order.user_id
			};
			let res = await this.$api('latefee.applay_reduction', formData);
			if (res.code == 1) {
				this.$emit('init');
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		},
		// 取消申请滞纳金
		async confirmCancelReduceFee() {
			let formData = {
				id: this.current_item.isapplay,
				token: uni.getStorageSync('token'),
				isreduction: 0
			};
			let res = await this.$api('latefee.setreply', formData);
			if (res.code == 1) {
				this.$emit('init');
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		},
		async getCurrentFeeList() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				step: this.current_item.fen
			};
			let res = await this.$api('latefee.applay_list', formData);
			if (res.code == 1) {
				this.current_fee_list = res.data;
			}
		}
	}
};
</script>

<style lang="scss">
	.od-box .od-item .item-right .item-txt{
		flex-wrap: wrap;
	}
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 35px;
	}
</style>
