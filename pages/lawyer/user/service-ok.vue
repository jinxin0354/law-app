<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的律师：</view>
			<view class="match-txt">您好！您已圆满完成法律服务，请您返回商城主页参与其他订单。感谢您的信任与支持！祝您生活愉快，身体健康。</view>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()" v-if="info.order.serve_time != '15分钟'">联系委托人</button>
				<template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" @click="navToProDetail(info.order.project_id)">项目详情</button>
				</template>
				<button class="service-item active" @click="$refs.popupOneWantPay.open()" v-if="info.order.pro_name != '问一下'">我要收款</button>
				<template v-if="info.order.price_type == '投资人支付(不用还)'">
					<button class="service-item active" @click="$refs.telephoneInvestor.$refs.popupTel.open()">联系投资人</button>
					<button class="service-item active">投资人收件信息</button>
					<button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button>
				</template>
			</view>
			<law-nav></law-nav>
		</view>
		<!-- 录音组件 -->
		<order-record v-if="Object.keys(info.order).length > 0 && info.order.serve_time == '15分钟'" :info="info" @init="init"></order-record>
		<!-- 待收信息-->
		<order-wait-receive-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-info>
		<!-- 收款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="收款详情":info="info"></order-common-detail>
		<!-- 增加服务详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.server_pay" title="增加服务" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :isBold="true" :img_src="info.order.desc_content"></order-unfold-product>
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
		<!-- 第一部分我要收款弹出层 -->
		<uni-popup ref="popupOneWantPay" type="dialog">
			<uni-popup-dialog
				type="info"
				title="我要收款"
				okTxt="确认"
				cancleTxt="取消"
				:showClose="true"
				:before-close="true"
				@confirm="
					$refs.popupOneWantPay.close();
					confirmOneWantPay();
				"
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
			onePrice: '', // 第一部分我要收款价格
			oneReason: '' // 第一部分我要收款原因
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
