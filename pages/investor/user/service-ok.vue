<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的投资人：</view>
			<view class="match-txt">您好！本案法律服务已经完成。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button>
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<button class="service-item active" @click="$refs.investInboxMessage.$refs.popupInbo.open()">投资人收件信息</button>
				<!-- <button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button> -->
				<button class="service-item active" @click="jumpToWeb">债权投资合同</button>
			</view>
			<law-nav></law-nav>
		</view>
		<!--待收信息-->
		<order-wait-receive-investor-settle-accounts v-if="Object.keys(info.order).length > 0" :info="info"
			@init="init" @popupShow="popupShow"></order-wait-receive-investor-settle-accounts>
			
		<!--待付信息-->
		<order-wait-pay-apply-invest-cost v-if="Object.keys(info.order).length > 0" :info="info" @init="init" 
		@popupShow="popupShow">
		</order-wait-pay-apply-invest-cost>
		<!--收款详情-->
		<order-invest-detail v-if="Object.keys(info.order.jie_pay).length > 0 || Object.keys(info.order.pay_text).length > 0 || Object.keys(info.order.pend_tui_apply).length > 0"  :detailLIst="info.order.jie_pay" title="收款详情"
			:info="info" @popupShow="popupShow"></order-invest-detail>
		<!-- <order-invest-tuihui v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_tui_apply" :info="info"
		@popupShow="popupShow"
		></order-invest-tuihui> -->
		<!--付款详情-->
		<order-invest-pay v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_apply" title="付款详情"
		@popupShow="popupShow"
			:info="info"></order-invest-pay>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer" :random="new Date().getTime()"></order-lawyer-intro>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'"></order-case>
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
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
		<!--结算投资收益-->
		<!-- <invest-shouyi ref="investShouyi" :item="current_item"></invest-shouyi> -->
		<end-invest-profit ref="investShouyi" :item="current_item"></end-invest-profit>
		<!-- 结算投资人奖励 -->
		<settlement-popup ref="settlement" :item="current_item"></settlement-popup>
		<!-- 申请投资费用 -->
		<lawyer-apply-cost ref="lawyerApply" :item="current_item"></lawyer-apply-cost>
		<!-- 退回投资费用弹窗 -->
		<return-cost ref="returnCostTip" :item="current_item"></return-cost>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {
				order: {}
			},
			order_id: '',
			infoLawyer: {},
			infoInbo: {},
			current_item:{},
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		popupShow(item) {
			// console.log('post');
			// console.log(item);
			if (item.type == 8) {
				this.current_item = item
				this.$refs.returnCostTip.$refs.returnCost.open()
			} else if (item.type == 3 || item.type == 1) {
				this.current_item = item
				this.$refs.investShouyi.$refs.investShou.open()
				// this.current_item = item
				// this.$refs.investShouyi.$refs.investShou.open()
			} else if (item.type == 7) {
				this.current_item = item.popup
				this.$refs.lawyerApply.$refs.lawyerApply.open()
			} else if (item.type == 2) {
				// 退款弹窗
				this.current_item = item.popup
				this.$refs.lawyerTui.$refs.lawyerApply.open()
			} else if (item.shou_type == 2) {
				this.current_item = item 
				this.$refs.lawyerQing.$refs.lawyerApply.open()
			}
		},
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
