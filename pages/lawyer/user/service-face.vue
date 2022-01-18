<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的律师：</view>
			<view class="match-txt">您好！请先与委托人联系一下，避免委托人长时间等待，影响服务感受。感谢您的信任与支持！祝您圆满成功！</view>
			<template v-if="info.order.price_type == '自费'">
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">
						请在接单后15分钟内，审查案件的管辖地是否在您的执业区域内；如不在，请及时告知委托人更换律师。如委托人愿意继续委托您代理的，请与委托人沟通好异地办案的差旅费用等相关事宜。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">请及时审查案件的诉讼时效、反诉期、管辖权异议期、举证期、保证期间、抵押期间等，避免相关法定期间在您接案后过期，导致赔偿。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">如需查询异地被告的身份证明，请下载“无讼”app，在“律师协作-异地查档”里办理。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">您接单后15分钟内，如委托人没有更换律师的，平台将自动在“办公”页面，为您和委托人创建本订单的项目和群聊，方便您和委托人沟通。</view>
				</view>
			</template>

			<template v-else>
        <view class="match-image-txt" v-if="info.order.pro_name == '问一下'&&info.order.server_type != '线上电话'">
          <view class="txt-left">
            <view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
          </view>
          <view class="txt-right red">您接单后15分钟内，如委托人没有更换律师的，法力平台将在“办公”页面自动为您创建本案的项目和群聊，方便您和委托人沟通。</view>
        </view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">请先与委托人签署委托代理合同</view>
				</view>
				<view class="match-image-txt" v-if="info.order.pro_name != '问一下'">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right red">您接单后15分钟内，如委托人没有更换律师的，平台将自动在“办公”页面，为您和委托人创建本订单的项目和群聊，方便您和委托人沟通。</view>
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
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button>
				<template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" @click="navToProDetail(info.order.project_id)">项目详情</button>
				</template>
				<button class="service-item active" @click="$refs.popupOneWantPay.open()" v-if="info.order.pro_name != '问一下'">我要收款</button>
				<button class="service-item active" :disabled="isLawyerServiceOk || isClientServiceOk || disableServiceOk" @click="$refs.popupServiceOk.open()">服务完成</button>
				<button class="service-item active" :disabled="isClientRemoveEntrust || isLawyerRemoveEntrust || disableRemoveEntrust" @click="removeEntrust">解除委托</button>
        <button class="service-item active" v-if="info.order.lawyergroupid" @click="navToChat(info.order.lawyergroupid)">办理详情</button>
        <button class="service-item active" v-if="isLawyerServiceOk" style="width: 100%; margin-right: 0;" @click="$refs.telephoneClient.$refs.popupTel.open()">
					催促委托人确认完成
					<uni-countdown
						:show-day="true"
						:day="remainTime.day"
						:hour="remainTime.hour"
						:minute="remainTime.minute"
						:second="remainTime.second"
						color="#f00"
						splitorColor="#f00"
						backgroundColor="#FFC801"
						@timeup="timeup"
					></uni-countdown>
				</button>
				<button class="service-item active" v-if="isLawyerRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.telephoneClient.$refs.popupTel.open()">
					催促委托人确认解除
				</button>
				<button class="service-item active" v-if="isLawyerServiceOk || isLawyerRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.popupCancelServiceApply.open()">
					取消申请
				</button>
			</view>
			<template v-if="isClientRemoveEntrust">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureRemoveEntrust.open()">确认解除委托</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureRemoveEntrust.open()">不确认解除委托</button>
				</view>
			</template>
			<template v-if="isClientServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 待收信息-->
		<order-wait-receive-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-info>
		<!-- 收款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="收款详情" :info="info"></order-common-detail>
		<!-- 增加服务详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.server_pay" title="增加服务" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'" v-if="info.order.pro_name == '打官司'"></order-case>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :isBold="true" :img_src="info.order.desc_content"></order-unfold-product>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 解除委托-未付款弹出层 -->
		<uni-popup ref="popupRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" title="" okTxt="我知道了" cancleTxt="" content="" :before-close="true" @confirm="closePop('popupRemoveEntrust')">
				<view class="warm-tip-box">
					<view class="warm-tip-item">为保障您及您好友推荐本平台应得的奖励，请按照以下流程解除和退款：</view>
					<view class="warm-tip-item">
						<view class="item-left">1</view>
						<view class="item-right">在本平台“办公”→“信息”→本订单“委托人协作团队”群聊里，与委托人确定解除事宜，保留聊天记录；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">2</view>
						<view class="item-right">在“待收信息”里，收齐剩余律师费用；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">3</view>
						<view class="item-right">再次点击“解除委托”按钮，发起解除；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">4</view>
						<view class="item-right">联系委托人，确认解除委托；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">5</view>
						<view class="item-right">委托人确认后，您将进入“服务解除”页面。如需退款的，可在该页面点击“退款”按钮办理。</view>
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

					<textarea class="textarea-border textarea-height" placeholder="请输入" placeholder-class="placeholder" v-model="reason" />
				</view>

				<view class="entrust-tip">我已与委托人确认解除委托</view>
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
				content="我已与委托人确认服务完成"
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
		<!-- 第一部分我要收款弹出层 -->
		<uni-popup ref="popupOneWantPay" type="dialog">
			<uni-popup-dialog
				type="info"
				title="我要收款"
				okTxt="确认"
				cancleTxt="取消"
				:showClose="true"
				:before-close="true"
				@confirm="confirmOneWantPay()"
				@close="closePop('popupOneWantPay')"
			>
				<view class="od-box" style="width: 100%; padding: 0;">
					<view class="od-item marginbottom10">
						<view class="item-tip">付款人</view>
						<view class="item-right"><view class="item-txt">委托人</view></view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require">请款金额</view>
						<view class="item-right">
							<view class="item-txt"><input type="number" class="ipt-border" placeholder="请输入" placeholder-class="placeholder" v-model="onePrice" /></view>
						</view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require">请款事由</view>
						<view class="item-right">
							<view class="item-txt"><textarea auto-height="true" class="textarea-border" placeholder="请输入" placeholder-class="placeholder" v-model="oneReason" /></view>
						</view>
					</view>
				</view>
				<view class="dialog-tip-line" style="padding-top: 25rpx; padding-bottom: 0;">我已与委托人确认付款事宜</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 取消申请弹出层 -->
		<uni-popup ref="popupCancelServiceApply" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:content="info.order.status == 4 ? '取消服务完成申请' : '取消服务解除申请'"
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
export default {
	mixins: [mixin],
	data() {
		return {
			info: {
				order: {}
			},
			order_id: '',
			reason: '',
			onePrice: '', // 第一部分我要收款价格
			oneReason: '', // 第一部分我要收款原因
			remainTime: {} //剩余时间
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.orderDetail', formData);
			this.info = res.data;
			this.status = res.data.order.status;
			this.getOrderState(this.info);
			if (this.info.order.lawyer_finish) {
				this.remainTime = this.timeFn(this.info.order.lawyer_finish);
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
			let res = await this.$api('index.lawyer_remove', formData);
			if (res.code == 1) {
				this.init();
			}
		},
		async sureRemoveEntrust(status, pop) {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				status: status
			};
			let res = await this.$api('index.lawyer_sure_remove', formData);
			if (res.code == 1) {
				if (pop == 'popupSureRemoveEntrust') {
					this.closePop('popupSureRemoveEntrust');
					this.init();
				} else if (pop == 'popupNoSureRemoveEntrust') {
					this.closePop('popupNoSureRemoveEntrust');
					this.init();
				}
			}
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
			let res = await this.$api('index.lawyer_sure', formData);
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
			let res = await this.$api('index.lawyer_sure_over', formData);
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
		// 第一部分我要收款
		async confirmOneWantPay() {
			if (!this.onePrice || this.onePrice < 0.01) {
				uni.showToast({
					title: '请输入正确的金额',
					icon: 'none'
				});
				return;
			}
			if (!this.oneReason) {
				uni.showToast({
					title: '请输入请款事由',
					icon: 'none'
				});
				return;
			}
			this.$refs.popupOneWantPay.close();
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 2,
				price: this.onePrice,
				reason: this.oneReason
			};
			let res = await this.$api('index.lawyer_collect', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.init();
			}
		},
		// 委托人取消申请服务完成，服务解除
		async cancleApplyService() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let url = '';
			// 律师点服务完成
			if (this.info.order.status == 4) {
				url = 'index.lawyer_cancel';
			}
			// 律师点服务解除
			else if (this.info.order.status == 11) {
				url = 'index.lawyer_cancel_remove';
			}
			let res = await this.$api(url, formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.init();
			}
		},
		timeup() {
			this.init();
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
