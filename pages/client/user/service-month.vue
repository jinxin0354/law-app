<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">您好！{{ infoLawyer.address }}{{ infoLawyer.lawyer }}律师很荣幸接受您的委托，我们将全心全意为您提供优质的服务！感谢您的信任与支持！</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/time-green.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right">
					还可咨询
					<text class="red">{{ info.order.day }}天</text>
				</view>
			</view>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<button
					class="service-item active"
					@click="
						$refs.popupRenew.open();
						initHandpay();
					"
				>
					手动续费
				</button>
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
			</view>
		</view>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer" :random="new Date().getTime()"></order-lawyer-intro>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 包月手动续费弹出层 -->
		<uni-popup ref="popupRenew">
			<service-popup-pay title="包月手动续费" btnText="确认" @closePop="closePop('popupRenew')" @confirmPay="confirmRenew">
				<template slot="payOption">
					<view class="od-item marginbottom10">
						<view class="item-tip">月费标准</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ addInfo.standard }}</view>
						</view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require">续费月数</view>
						<view class="item-right"><uni-number-box :min="1" v-model="num"></uni-number-box></view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip">律师费用</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ addInfo.bazhe }}（8折）</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 无理由更换律师组件 -->
		<order-change-lawyer ref="orderChangeLawyer" v-if="Object.keys(info.order).length > 0" :info="info"></order-change-lawyer>
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
			addInfo: {}, //续费信息
			num: 1 //续费月数
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
	watch: {
		num() {
			if (this.addInfo.bazhe) {
				this.initHandpay();
			}
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

				let d = that.get15MinutesLater(that.info.order.lawyer_time);
				this.remainTime = this.timeFn(d);
				if (this.remainTime.hour > 0 || this.remainTime.minute > 0 || this.remainTime.second > 0) {
					this.isTimeOver = false;
				}
			}

			let formDataLawyer = {
				id: this.info.order.lawyer,
				token: uni.getStorageSync('token')
			};
			let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
			this.infoLawyer = resLawyer.data;
		},
		// 15分钟倒计时结束
		timeup() {
			this.isTimeOver = true;
		},
		// 包月手动续费-初始化
		async initHandpay() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				product_name_id: this.info.order.server_name_id,
				type: 2, //包年年月续费的时候 传 2，，，其他传1 或者不传都可以
				num: this.num
			};
			let res = await this.$api('index.add_list', formData);
			if (res.code == 1) {
				this.addInfo = res.data.add[0];
			}
		},
		// 包月手动续费-支付
		async confirmRenew(payMethod) {
			this.$refs.popupRenew.close();
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 5, //1 = 付费给投资人 2= 投资人退款请求 3 = 投资人请求结算 4 添加服务 5 包年包月的续费 6付款给律师
				pay_type: payMethod,
				price: this.addInfo.bazhe,
				origin: `月费标准:${this.addInfo.standard},续费月数:${this.num},付款方式:${payMethod}`
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
