<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">您好！您的法律服务已经完成。如您需要其他法律服务，请点击以下按钮下单。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<!-- 功能按钮 -->
			<template v-if="Object.keys(info.order).length > 0">
				<view class="service-list">
					<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()" v-if="info.order.serve_time != '15分钟'">联系律师</button>
					<!-- <button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button> -->
					<template v-if="info.order.pro_name != '问一下'">
						<button class="service-item active" v-if="info.order.usergroupid" @click="navToChat(info.order.usergroupid )">办理详情</button>
					</template>
					<template v-if="info.order.pro_name != '问一下' && info.order.pro_name != '打官司'">
						<button class="service-item active" @click="$refs.popupPayToLaw.open()">付款给律师</button>
					</template>
					<template v-if="info.order.price_type == '投资人支付(不用还)'">
						<button class="service-item active" @click="$refs.telephoneInvestor.$refs.popupTel.open()">联系投资人</button>
						<button class="service-item active" @click="$refs.investInboxMessage.$refs.popupInbo.open()">投资人收件信息</button>
						<!-- <button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button> -->
						<button class="service-item active" @click="jumpToWeb">债权投资合同</button>
					</template>
					<button class="service-item active" v-if="info.order.pro_name !='打官司'" @click="jump('/pages/client/user/evaluate', { order_id: order_id,lawyer_id: info.order.lawyer})">评价有礼</button>
				</view>
			</template>
			<law-nav></law-nav>
		</view>
		<!-- 录音组件 -->
		<order-record v-if="Object.keys(info.order).length > 0 && info.order.serve_time == '15分钟'" :info="info" @init="init"></order-record>
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
		<!-- 债券投资合同组件-->
		<order-invest-contact ref="investContact"></order-invest-contact>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 投资人收件信息组件 -->
		<order-invest-inbox-message ref="investInboxMessage" :infoInbo="infoInbo"></order-invest-inbox-message>
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
			infoInbo: {},
			payToPrice: '', //付款给律师-金额
			payToReason: '' //付款给律师-原因
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		async jumpToWeb() {
			let url = this.info.order.zhaiquan_hetong
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.loadOffice(url);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('loadOffice', url, data => {});
			}
		},
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
		// 付款给律师-支付
		async confirmPayToLaw(payMethod) {
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
