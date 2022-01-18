<template>
	<view>
		<view class="wait-box" v-if="info.order.pend_text && info.order.pend_text.length > 0">
			<view class="wait-title">滞纳金</view>
			<view class="wait-item" v-for="(item, index) in info.order.pend_text">
				<view class="item-item flex flex-vertical">
					<view class="flex flex-horizontal">
						<view class="item-money">￥{{ item.money }}</view>
						<view class="item-txt">
							<view class="txt-name">{{ item.name }}</view>
							<view class="txt-tip">{{ item.time }}</view>
						</view>
					</view>
					<view class="item-item" style="margin-top: 10px;" v-if="item.late_fee && Number(item.late_fee)" @click="lateFeeDetail(item)">
						<view class="item-money">
							<view>￥{{ item.late_fee }}</view>
						</view>
						<view class="item-txt">
							<view class="txt-name">
								<view class="name-tip text-ellipsis">滞纳金</view>
								<view class="txt-nav"><image src="@/static/img/right.png" mode="widthFix"></image></view>
							</view>
						</view>
					</view>
					<view class="item-btn flex flex-horizontal flex-center" style="margin-top: 10px;">
						<template v-if="!item.isapplay">
							<template v-if="item.is_shou == 0">
								<view
									class="comfir-btn flex flex-center"
									style="width: 50%;"
									@click="
										current_item = item;
										$refs.popupReceiveMoney.open();
									"
								>
									我要收款
								</view>
							</template>
							<template v-else>
								<view
									class="comfir-btn flex flex-center flex-1"
									type="default"
									@click="
										current_item = item;
										$refs.popupCancelReceive.open();
									"
								>
									取消收款
								</view>
								<view class="comfir-btn flex flex-center flex-1" type="default" @click="$refs.telephoneClient.$refs.popupTel.open()">催促委托人付款</view>
							</template>
						</template>
						<template v-else>
							<view
								class="comfir-btn flex flex-center "
								style="width: 50%;"
								@click="
									current_item = item;
									checkFeeDeatail(1);
								"
							>
								同意减免
							</view>
						</template>
						<template v-if="item.is_shou == 0">
							<view
							 v-if="!item.isapplay"
								class="comfir-btn flex flex-center flex-1"
								type="default"
								@click.stop="
									current_item = item;
									checkFeeDeatail(0);
								"
							>
								减免滞纳金
							</view>
							<view
								v-else
								class="comfir-btn flex flex-center flex-1"
								type="default"
								@click.stop="
									current_item = item;
									$refs.popupReturnApplyFee.open();
								"
							>
								退回申请
							</view>
						</template>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 我要收款弹出层 -->
		<uni-popup ref="popupReceiveMoney" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与委托人确认付款事宜"
				:before-close="true"
				@confirm="
					closePop('popupReceiveMoney');
					confirmReceiveMoney();
				"
				@close="closePop('popupReceiveMoney')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 取消收款弹出层 -->
		<uni-popup ref="popupCancelReceive" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="取消收款"
				:before-close="true"
				@confirm="
					closePop('popupCancelReceive');
					cancelReceiveMoney();
				"
				@close="closePop('popupCancelReceive')"
			></uni-popup-dialog>
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
					<view class="fee-tip">亲爱的, 滞纳金能减免就减免了吧, 立马收钱, 落袋为安~</view>
					<view class="ok-box flex flex-center"><button type="default"  style="width: 50%;border-radius: 20px;" class="ok-btn" @click="closePop('popupFeeDetail')">我知道了</button></view>
				</template>
			</order-popup-common>
		</uni-popup>
		<!-- 减免滞纳金弹出层 -->
		<uni-popup ref="popupReduceFee" type="center">
			<order-popup-common title="减免滞纳金" @closePop="closePop('popupReduceFee')">
				<template slot="popup-con">
					<scroll-view class="popup-con" scroll-y="true">
						<view class="od-box margin0 paddingbottom0">
							<view class="od-item marginbottom20" v-if="1">
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
						<view class="fee-middle-tip">我已与委托人沟通好减免事宜</view>
					</scroll-view>
					<view class="ok-box"><button type="default" class="ok-btn" @click="confirmReduceFee">我要减免</button></view>
				</template>
			</order-popup-common>
		</uni-popup>
		<!-- 查看申请滞纳金详情弹出层 -->
		<uni-popup ref="popupCheckReduceFee" type="center">
			<order-popup-common title="减免滞纳金" @closePop="closePop('popupCheckReduceFee')">
				<template slot="popup-con">
					<scroll-view class="popup-con" scroll-y="true">
						<view class="od-box margin0 paddingbottom0">
							<view class="od-item marginbottom20" v-if="1">
								<view class="item-tip require">减免时间段</view>
								<view class="item-right">
									<view class="item-jg-tip">
										<view>{{ applyFeeInfo.start_time }}</view>
									</view>
									<view class="item-jg">--</view>
									<view class="item-jg-tip">
										<view>{{ applyFeeInfo.end_time }}</view>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom20">
								<view class="item-tip">减免金额</view>
								<view class="item-right">
									<view class="item-txt">
										<text class="red">￥</text>
										<text class="red">{{ applyFeeInfo.fee }}</text>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom20">
								<view class="item-tip require">申请理由</view>
								<view class="item-right">
									<view class="item-txt">{{ applyFeeInfo.reason }}</view>
								</view>
							</view>
						</view>
						<view class="fee-middle-tip">我已与委托人沟通好减免事宜</view>
					</scroll-view>
					<view class="ok-box">
						<button
							type="default"
							class="ok-btn"
							@click="
								returnApplyFee(1);
								$refs.popupCheckReduceFee.close();
							"
						>
							我要减免
						</button>
					</view>
				</template>
			</order-popup-common>
		</uni-popup>

		<u-picker mode="time" v-model="showFeeBeginTime" confirm-color="#FFC801" @confirm="confirmFeeBeginTime"></u-picker>
		<u-picker mode="time" v-model="showFeeEndTime" confirm-color="#FFC801" @confirm="confirmFeeEndTime"></u-picker>

		<!-- 退回申请弹出层 -->
		<uni-popup ref="popupReturnApplyFee" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="退回申请"
				:before-close="true"
				@confirm="
					closePop('popupReturnApplyFee');
					returnApplyFee(0);
				"
				@close="closePop('popupReturnApplyFee')"
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
			latefeeInfo: [],
			showFeeBeginTime: false,
			showFeeEndTime: false,
			feeBeginTime: '',
			feeEndTime: '',
			feeReason: '',
			feeMoney: '',
			applyFeeInfo: '' //申请详情
		};
	},
	created() {},
	methods: {
		async confirmReceiveMoney() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				type: 1, //类型 1分期或者先用后付 2我要额外收款
				fen: this.current_item.fen
			};
			let res = await this.$api('index.lawyer_collect', formData);
			if (res.code == 1) {
				this.$emit('init');
			}
		},
		async cancelReceiveMoney() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.lawyer_cancel_collect', formData);
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
					title: `请选择减免滞纳金内的日期：${this.current_item.late_start_time}至${this.current_item.late_time}`,
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
				type: 2,
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
		async returnApplyFee(isreduction) {
			let formData = {
				id: this.current_item.isapplay,
				token: uni.getStorageSync('token'),
				isreduction: isreduction
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
		async checkFeeDeatail(isGree) {
			// 同意减免,查看申请详情
			if (isGree) {
				let formData = {
					id: this.info.order.id,
					token: uni.getStorageSync('token'),
					step: this.current_item.fen
				};
				let res = await this.$api('latefee.applay_detail', formData);
				if (res.code == 1) {
					this.applyFeeInfo = res.data;
					this.$refs.popupCheckReduceFee.open();
				}
			}
			// 减免滞纳金 所有项为空
			else {
				this.feeBeginTime = '';
				this.feeEndTime = '';
				this.feeMoney = '';
				this.feeReason = '';
				this.$refs.popupReduceFee.open();
			}
		}
	}
};
</script>

<style lang="scss"></style>
