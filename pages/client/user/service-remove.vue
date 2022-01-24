<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">您好！您的法律服务已经解除，如您需要其他法律服务，请点击以下按钮下单。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<view class="service-list">
				<button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" v-if="info.order.usergroupid" @click="navToChat(info.order.usergroupid )">办理详情</button>
				</template>
				<button class="service-item active" @click="$refs.popupApplyRefund.open()">申请退款</button>
				<button class="service-item active" @click="jump('/pages/client/user/evaluate', { order_id: order_id,lawyer_id: info.order.lawyer})">评价有礼</button>
			</view>
			<law-nav></law-nav>
		</view>
		<!-- 录音组件 -->
		<order-record v-if="Object.keys(info.order).length > 0 && info.order.serve_time == '15分钟'" :info="info" @init="init"></order-record>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 待退信息 -->
		<order-wait-return-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-return-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情" :info="info"></order-common-detail>
		<!-- 退款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.tui_pay" title="退款详情" :info="info"></order-common-detail>
		<!-- 增加服务详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.server_pay" title="增加服务" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer" :random="new Date().getTime()"></order-lawyer-intro>
		<!-- 订单详情 -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 申请退款弹出层-->
		<uni-popup ref="popupApplyRefund" type="dialog">
			<uni-popup-dialog
				type="info"
				title="申请退款"
				okTxt="确认"
				cancleTxt="取消"
				:showClose="true"
				:before-close="true"
				@confirm="confirmApplyRefund()"
				@close="closePop('popupApplyRefund')"
			>
				<view class="od-box" style="width: 100%; padding: 0;">
					<view class="od-item marginbottom10">
						<view class="item-tip require">退款金额</view>
						<view class="item-right">
							<view class="item-txt"><input type="number" class="ipt-border" placeholder="请输入" placeholder-class="placeholder" v-model="refundPrize" /></view>
						</view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require">退款理由</view>
						<view class="item-right">
							<view class="right-textarea">
								<textarea auto-height="true" class="textarea-border" placeholder="请输入" placeholder-class="placeholder" v-model="refundReason" />
							</view>
						</view>
					</view>
				</view>
				<view class="dialog-tip-line" style="padding-top: 25rpx; padding-bottom: 0;">我已与律师确认退款金额</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
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
			infoLawyer: {},

			refundPrize: '', //退款金额
			refundReason: '' //退款理由
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

			let formDataLawyer = {
				id: this.info.order.lawyer,
				token: uni.getStorageSync('token')
			};
			let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
			this.infoLawyer = resLawyer.data;
		},
		// 申请退款
		async confirmApplyRefund() {
			if (!this.refundPrize || this.refundPrize < 0.01) {
				uni.showToast({
					title: '请输入正确的金额',
					icon: 'none'
				});
				return;
			}
			if (!this.refundReason) {
				uni.showToast({
					title: '请输入退款理由',
					icon: 'none'
				});
				return;
			}
			this.$refs.popupApplyRefund.close();

			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 2,
				pay_type: '', //无付款方式
				price: this.refundPrize,
				origin: this.refundReason
			};
			let res = await this.$api('index.money', formData);
			if (res.code == 1) {
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
.nav-list {
	margin: 0 -30rpx;
}
</style>
