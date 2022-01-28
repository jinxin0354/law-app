<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的律师：</view>
			<view class="match-txt">您好！您的法律服务已经解除，请您返回商城主页参与其他订单。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button>
				<button class="service-item active" @click="$refs.telephoneInvestor.$refs.popupTel.open()">联系投资人</button>
				<button class="service-item active" @click="$refs.investInboxMessage.$refs.popupInbo.open()">投资人收件信息</button>
				<button class="service-item active" @click="jumpToWeb">债权投资合同</button>
				<template v-if="info.order.pro_name != '问一下'">
					 <button class="service-item active" v-if="info.order.usergroupid" @click="navToChat(info.order.usergroupid)">办理详情</button>
				</template>
				<!-- <button class="service-item active" @click="$refs.popupPayToLaw.open()">退款</button> -->
			</view>
			<law-nav></law-nav>
		</view>
		<!-- 录音组件 -->
		<order-record v-if="Object.keys(info.order).length > 0 && info.order.serve_time == '15分钟'" :info="info" @init="init"></order-record>
		<!-- 待收信息-->
		<!-- <order-wait-receive-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-info> -->
		<!-- 待付退款信息 -->
		<!-- <order-wait-pay-return-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-return-info> -->
		<!-- 收款详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="收款详情" :info="info"></order-common-detail> -->
		<!-- 退款详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.tui_pay" title="退款详情" :info="info"></order-common-detail> -->
		<!-- 待收信息 -->
		<order-detail-payment v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-payment>
		<!-- 收款详情 -->
		<order-detail-collection v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-collection>
		<!-- 待付信息 -->
		<order-detail-pay v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-pay>
		<!-- 付款详情 -->
		<order-detail-nopay v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-nopay>
		<!-- 增加服务详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.server_pay" title="增加服务" :info="info"></order-common-detail> -->
		<!-- 续费详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail> -->
		<!-- 发票列表组件-->
		<order-invoice-invest v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-invest>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :isBold="true" :img_src="info.order.desc_content"></order-unfold-product>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 退款 弹出层-->
		<uni-popup ref="popupPayToLaw">
			<service-popup-pay title="退款" btnText="我要退款" @closePop="closePop('popupPayToLaw')" @confirmPay="confirmPayToLaw">
				<template slot="payOption">
					<view class="od-box" style="width: 100%; padding: 0;">
						<view class="od-item marginbottom10">
							<view class="item-tip require">退款金额</view>
							<view class="item-right">
								<view class="item-txt"><input type="number" class="ipt-border" placeholder="请输入" placeholder-class="placeholder" v-model="payToPrice" /></view>
							</view>
						</view>
						<view class="od-item marginbottom10">
							<view class="item-tip require">退款理由</view>
							<view class="item-right">
								<view class="item-txt"><textarea auto-height="true" class="textarea-border" placeholder="请输入" placeholder-class="placeholder" v-model="payToReason" /></view>
							</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
		<!-- 投资人收件信息组件 -->
		<order-invest-inbox-message ref="investInboxMessage" :infoInbo="infoInbo"></order-invest-inbox-message>
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
			infoInbo: {},
			order_id: '',
			payToPrice: '',
			payToReason: ''
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
			if(this.info.order.investor_id){
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
		// 退款-支付
		async confirmPayToLaw(payMethod) {
			if (!this.payToPrice || this.payToPrice < 0.01) {
				uni.showToast({
					title: '请输入正确的金额',
					icon: 'none'
				});
				return;
			}
			if (!this.payToReason) {
				uni.showToast({
					title: '请输入退款理由',
					icon: 'none'
				});
				return;
			}
			
			this.$refs.popupPayToLaw.close();
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 7, //1 = 付费给投资人 2= 投资人退款请求 3 = 投资人请求结算 4 添加服务 5 包年包月的续费 6付款给律师 7律师退款
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
.service-item {
		border-radius: 50rpx;
	}
</style>
