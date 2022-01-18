<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">您好！{{ infoLawyer.address }}{{ infoLawyer.lawyer }}律师很荣幸接受您的委托，我们将全心全意为您提供优质的服务！感谢您的信任与支持！</view>
      <template v-if="info.order.pro_name == '问一下'&&info.order.server_type != '线上电话'">
        <view class="match-image-txt">
          <view class="txt-left">
            <view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
          </view>
          <view class="txt-right red">匹配律师成功后15分钟内，如您没有更换律师的，平台将自动在“办公”页面，为您和律师创建本订单的项目和群聊，方便您和律师沟通。</view>
        </view>
      </template>
      <view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right red">请详细阅读律师给您的委托代理合同，如有疑问， 请随时联系律师为您解答清楚。</view>
			</view>

			<template v-if="info.order.pro_name != '问一下'">
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">匹配律师成功后15分钟内，如您没有更换律师的，平台将自动在“办公”页面，为您和律师创建本订单的项目和群聊，方便您和律师沟通。</view>
				</view>
			</template>
			<template v-if="info.order.pro_name == '管家'">
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/time-green.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right">
						还可咨询
						<text class="red">{{ info.order.day }}天</text>
					</view>
				</view>
			</template>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active" @click="$refs.orderAddService.$refs.popupAddService.open()" v-if="info.order.pro_name != '打官司'">增加服务</button>
				<template v-if="info.order.pro_name == '管家'">
					<button class="service-item active" @click="$refs.orderButlerRenew.$refs.popupRenew.open()">管家续期</button>
				</template>
				<template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" @click="$refs.popupPayToLaw.open()">付款给律师</button>
				</template>
				<button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<button class="service-item active" :disabled="isClientServiceOk || isLawyerServiceOk || disableServiceOk" @click="$refs.popupServiceOk.open">服务完成</button>
				<button class="service-item active" :disabled="isClientRemoveEntrust || isLawyerRemoveEntrust || disableRemoveEntrust" @click="removeEntrust">解除委托</button>
        <button class="service-item active" v-if="info.order.usergroupid" @click="navToChat(info.order.usergroupid )">办理详情</button>
        <template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" @click="navToProDetail(info.order.project_id)">项目详情</button>
				</template>

				<button class="service-item active" style="width: 100%; margin-right: 0;" v-if="!isTimeOver && remainTime" @click="$refs.orderChangeLawyer.$refs.popupChangeLawyer.open()">
					<uni-countdown
						:show-day="false"
						:hour="remainTime.hour"
						:minute="remainTime.minute"
						:second="remainTime.second"
						color="#f00"
						splitorColor="#f00"
						backgroundColor="#FFC801"
						@timeup="timeup"
					></uni-countdown>
					无理由更换律师
				</button>
				<button class="service-item active" v-if="isClientServiceOk" style="width: 100%; margin-right: 0;" @click="$refs.telephoneLawyer.$refs.popupTel.open()">
					催促律师确认完成
				</button>
				<button class="service-item active" v-if="isClientRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.telephoneLawyer.$refs.popupTel.open()">
					催促律师确认解除
				</button>
				<button class="service-item active" v-if="isClientServiceOk || isClientRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.popupCancelServiceApply.open()">
					取消申请
				</button>
			</view>

			<template v-if="isLawyerRemoveEntrust">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureRemoveEntrust.open()">确认解除委托</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureRemoveEntrust.open()">不确认解除委托</button>
				</view>
			</template>
			<template v-if="isLawyerServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情" :info="info"></order-common-detail>
		<!-- 增加服务详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.server_pay" title="增加服务" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer" :random="new Date().getTime()"></order-lawyer-intro>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'" v-if="info.order.pro_name == '打官司'"></order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 解除委托-未付款弹出层 -->
		<uni-popup ref="popupRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" title="" okTxt="我知道了" cancleTxt="" content="" :before-close="true" @confirm="closePop('popupRemoveEntrust')">
				<view class="warm-tip-box">
					<view class="warm-tip-item">为保障您及您好友推荐本平台应得的奖励，请按照以下流程解除和退款：</view>
					<view class="warm-tip-item">
						<view class="item-left">1</view>
						<view class="item-right">在本平台“办公”→“信息”→本订单“委托人协作团队”群聊里，与律师确定解除和退款事宜，保留聊天记录；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">2</view>
						<view class="item-right">在“待付信息”里，付清剩余律师费用；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">3</view>
						<view class="item-right">再次点击“解除委托”按钮，发起解除；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">4</view>
						<view class="item-right">联系律师，确认解除委托；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">5</view>
						<view class="item-right">律师确认后，您将进入“服务解除”页面。如需退款的，可在该页面点击“申请退款”按钮办理。</view>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 解除委托 弹出层-->
		<uni-popup ref="popupRemoveEntrustReason" type="dialog">
			<uni-popup-dialog-reason
				type="info"
				title=""
				okTxt="确认"
				cancleTxt="取消"
				:showClose="true"
				:before-close="true"
				@confirm="
					$refs.popupRemoveEntrustReason.close();
					confirmReason();
				"
				@close="closePop('popupRemoveEntrustReason')"
			>
				<view class="return-reason-box">
					<view class="return-tip">解除原因</view>

					<textarea class="textarea-border textarea-height" placeholder="把解除原因告诉律师吧，让律师改进工作！" placeholder-class="placeholder" v-model="reason" />
				</view>

				<view class="entrust-tip">我已与律师确认解除委托</view>
			</uni-popup-dialog-reason>
		</uni-popup>

		<!-- 确认解除委托弹出层 -->
		<uni-popup ref="popupSureRemoveEntrust" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:before-close="true"
				@confirm="sureRemoveEntrust(1, 'popupSureRemoveEntrust')"
				@close="closePop('popupSureRemoveEntrust')"
			>
				<view class="dialog-tip">解除委托原因：</view>
				<view class="dialog-tip">{{ info.order.lawyer_remove }}</view>
				<view class="dialog-tip-line">我确认解除委托</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认解除委托弹出层 -->
		<uni-popup ref="popupNoSureRemoveEntrust" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:before-close="true"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')"
				@close="closePop('popupNoSureRemoveEntrust')"
			>
				<view class="dialog-tip">解除委托原因：</view>
				<view class="dialog-tip">{{ info.order.lawyer_remove }}</view>
				<view class="dialog-tip-line">我不确认解除委托</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 服务完成弹出层 -->
		<uni-popup ref="popupServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与律师确认服务完成"
				:before-close="true"
				@confirm="confirmServiceOk"
				@close="closePop('popupServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 确认服务完成弹出层 -->
		<uni-popup ref="popupSureServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我确认服务已经完成"
				:before-close="true"
				@confirm="sureServiceOk(1, 'popupSureServiceOk')"
				@close="closePop('popupSureServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 不确认服务完成弹出层 -->
		<uni-popup ref="popupNoSureServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我不确认服务已经完成"
				:before-close="true"
				@confirm="sureServiceOk(2, 'popupNoSureServiceOk')"
				@close="closePop('popupNoSureServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 付款给律师  -->
		<uni-popup ref="popupPayToLaw">
			<service-popup-pay title="我要付款" btnText="我要支付" @closePop="closePop('popupPayToLaw')" @confirmPay="confirmPayToLaw">
				<template slot="payOption">
					<view class="od-box" style="width: 100%; padding: 0;">
						<view class="od-item marginbottom20">
							<view class="item-tip require">付款金额</view>
							<view class="item-right">
								<view class="item-txt"><input type="number" class="ipt-border" placeholder="请输入" placeholder-class="placeholder" v-model="payToPrice" /></view>
							</view>
						</view>
						<view class="od-item marginbottom20">
							<view class="item-tip require">付款备注</view>
							<view class="item-right">
								<view class="item-txt"><textarea auto-height="true" class="textarea-border" placeholder="请输入" placeholder-class="placeholder" v-model="payToReason" /></view>
							</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
		<!-- 增加服务-线下面谈 弹出层 -->
		<order-add-service ref="orderAddService" :info="info" v-if="Object.keys(info.order).length > 0" @init="init"></order-add-service>
		<!-- 管家续期组件 -->
		<order-butler-renew ref="orderButlerRenew" v-if="info.order.pro_name == '管家' && Object.keys(info.order).length > 0" :info="info" @init="init"></order-butler-renew>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 无理由更换律师组件 -->
		<order-change-lawyer ref="orderChangeLawyer" v-if="Object.keys(info.order).length > 0" :info="info"></order-change-lawyer>
		<!-- 取消申请弹出层 -->
		<uni-popup ref="popupCancelServiceApply" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:content="info.order.status == 14 ? '取消服务完成申请' : '取消服务解除申请'"
				:before-close="true"
				@confirm="
					closePop('popupCancelServiceApply');
					cancleApplyService();
				"
				@close="closePop('popupCancelServiceApply')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mixin } from '@/common/mixins/face_order_state.js';
import { share_coupon } from '@/common/mixins/share_coupon.js';
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
			payToPrice: '', //付款给律师-金额
			payToReason: '', //付款给律师-原因
			timeing: false //是否正在倒计时
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		async init() {
			let that = this;
			let formData = {
				id: that.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await that.$api('index.orderDetail', formData);
			if (res.code == 1) {
				that.info = res.data;
				this.getOrderState(this.info);

				// 如果已经存在倒计时，不再走这个
				if (!this.timeing) {
					let d = that.get15MinutesLater(that.info.order.lawyer_time);
					this.remainTime = this.timeFn(d);
					if (this.remainTime.hour > 0 || this.remainTime.minute > 0 || this.remainTime.second > 0) {
						this.isTimeOver = false;
					}
					this.timeing = true;
				}
			}

			let formDataLawyer = {
				id: this.info.order.lawyer,
				token: uni.getStorageSync('token')
			};
			let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
			this.infoLawyer = resLawyer.data;
		},
		// 解除委托
		async confirmReason() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				reason: this.reason
			};
			let res = await this.$api('index.u_remove_lawyer', formData);
			if (res.code == 1) {
				this.init();
			}
		},
		removeEntrust() {
			if (this.info.order.pend_text.length > 0) {
				this.$refs.popupRemoveEntrust.open();
			} else {
				this.$refs.popupRemoveEntrustReason.open();
			}
		},
		// 确认解除委托
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
					this.replace('/pages/client/user/service-remove', {
						order_id: this.order_id
					});
				} else if (pop == 'popupNoSureRemoveEntrust') {
					this.closePop('popupNoSureRemoveEntrust');
					this.init();
				}
			}
		},
		// 15分钟倒计时结束
		timeup() {
			this.isTimeOver = true;
		},
		removeEntrust() {
			if (this.info.order.pend_text.length > 0) {
				this.$refs.popupRemoveEntrust.open();
			} else {
				this.$refs.popupRemoveEntrustReason.open();
			}
		},
		async confirmServiceOk() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.u_sure_lawyer', formData);
			if (res.code == 1) {
				this.$refs.popupServiceOk.close();
				this.init();
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
					this.init();
				} else if (pop == 'popupNoSureServiceOk') {
					this.closePop('popupNoSureServiceOk');
					this.init();
				}
			}
		},
		// 付款给律师-支付
		async confirmPayToLaw(payMethod) {
			if (this.payToPrice < 0.01) {
				uni.showToast({
					title: '请输入正确的金额',
					icon: 'none'
				});
				return;
			}
			if (!this.payToReason) {
				uni.showToast({
					title: '请输入付款备注',
					icon: 'none'
				});
				return;
			}
			this.$refs.popupPayToLaw.close();
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 6,
				origin: this.payToReason,
				pay_type: payMethod,
				price: this.payToPrice
			};
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
		// 增加服务-支付
		async confirmAddService(payMethod) {
			this.$refs.popupAddService.close();
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 4,
				pay_type: payMethod,
				serve_time: this.serviceDuration,
				price: this.lawPrice,
				origin: '线下面谈' + this.serviceDuration
			};
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
				this.init();
			}
		},
		// 委托人取消申请服务完成，服务解除
		async cancleApplyService(){
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let url = '';
			// 委托人点服务完成
			if(this.info.order.status == 14){
				url = 'index.u_cancel_sure_lawyer';
			}
			// 委托人点服务解除
			else if(this.info.order.status == 10){
				url = 'index.u_cancel_remove_lawyer';
			}
			let res = await this.$api(url, formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.init();
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 30rpx;
}
.ok-box {
	padding: 0;
}
.service-list {
	padding-top: 20rpx;
	margin-bottom: -10px;
}
</style>
