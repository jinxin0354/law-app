<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">
				<view class="txt-down"></view>
				您好！法力平台正在为您匹配专业律师，请稍等片刻！我们将全心全意为您提供优质的服务！感谢您的信任与支持！
			</view>
			<view class="match-txt">
				<view class="txt-down">
					<uni-countdown
						:show-day="true"
						:day="remainTime.day"
						:hour="remainTime.hour"
						:minute="remainTime.minute"
						:second="remainTime.second"
						color="#f00"
						splitorColor="#f00"
						@timeup="timeup"
					></uni-countdown>
				</view>
				内，如未成功匹配律师的，法力平台将为您自动免费取消订单。
			</view>
			<view class="service-list">
				<button class="service-item active" style="width:250rpx; margin: auto;" @click="jump('/pages/client/user/to-cancel', { order_id: order_id })">取消订单</button>
			</view>
		</view>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情" :info="info"></order-common-detail>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'" v-if="info.order.pro_name == '打官司'"></order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 超出48小时弹出层 -->
		<uni-popup ref="popupOut" type="dialog">
			<uni-popup-dialog type="info" title="" okTxt="确认" cancleTxt="" :content="outContent" :before-close="true" @confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mixin } from '@/common/mixins/match_order_state.js';
import { share_coupon } from '@/common/mixins/share_coupon.js';
export default {
	mixins: [mixin, share_coupon],
	data() {
		return {
			remainTime: {}, //剩余时间
			outContent: '超过48小时没有匹配到律师，感谢您的使用。',
			order_id: '',
			info: {
				order: {}
			}
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

			this.$nextTick(() => {
				if (this.info.order.is_share) {
					this.$refs.orderAllDetail.$refs.popupShareConpon.open();
				}
			});

			this.getOrderState(this.info);
			
			let d_time;
			if (this.info.order.change_time) {
				d_time = this.info.order.change_time;
			} else {
				d_time = this.info.order.createtime;
			}
			let d = this.getTwoDayLater(d_time);
			this.remainTime = this.timeFn(d);
		},
		dialogConfirm() {
			this.$refs.popupOut.close();
			this.replace('/pages/client/user/auto-cancel', {
				order_id: this.order_id
			});
		},
		timeup() {
			if (Object.keys(this.remainTime) != 0) {
				this.$refs.popupOut.open();
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 30rpx;
}
</style>
