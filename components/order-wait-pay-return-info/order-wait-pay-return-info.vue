<template>
	<view>
		<view class="wait-box" v-if="info.order.tui_pend && info.order.tui_pend.length > 0">
			<view class="wait-title">待退信息22</view>
			<view class="wait-item" v-for="(item, index) in info.order.tui_pend">
				<view class="item-money">￥{{ item.money }}</view>
				<view class="item-txt">
					<view class="txt-name">{{ item.name }}</view>
					<view class="txt-tip">{{ item.time }}</view>
				</view>
				<view class="item-btn">
					<button
						class="ok-btn marginbottom10"
						type="default"
						@click="
							current_item = item;
							$refs.popupWantPay.open();
						"
					>
						我要退款
					</button>
					<template>
						<button
							class="ok-btn"
							type="default"
							@click="
								current_item = item;
								$refs.popupReturnReason.open();
							"
						>
							退回申请
						</button>
					</template>
				</view>
			</view>
		</view>
		<!-- 支付弹出层 -->
		<uni-popup ref="popupWantPay">
			<service-popup-pay title="我要退款" btnText="我要退款" @closePop="closePop('popupWantPay')" @confirmPay="confirmPay">
				<template slot="payOption">
					<view class="od-item">
						<view class="item-tip">退款金额</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ current_item.money }}</view>
						</view>
					</view>
					<view class="od-item marginbottom20">
						<view class="item-tip">退款理由</view>
						<view class="item-right">
							<view class="item-txt">{{ current_item.origin }}</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>

		<!-- 退回理由 -->
		<uni-popup ref="popupReturnReason" type="dialog">
			<uni-popup-dialog-reason
				type="info"
				title=""
				okTxt="确认"
				cancleTxt="取消"
				:showClose="true"
				:before-close="true"
				@confirm="
					$refs.popupReturnReason.close();
					backApply();
				"
				@close="closePop('popupReturnReason')"
			>
				<view class="return-reason-box">
					<view class="return-tip">退回理由</view>

					<textarea class="textarea-border textarea-height" placeholder="请输入" placeholder-class="placeholder" v-model="applyReason" />
				</view>
			</uni-popup-dialog-reason>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			current_item: {},
			applyReason: ''
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	methods: {
		async confirmPay(payMethod) {
			let pay_type;
			let order_id;
			if (this.current_item.fen == 6) {//fen == 6付款给律师
				pay_type = 2;
				order_id = this.current_item.id;
			} else {//fen == 2 二期；fen == 3 三期；fen == 4 先用后付；fen == 5 律师点我要收款；
				pay_type = 3;
				order_id = this.current_item.id;
			}
			let formDataPay = {
				order_id: order_id,
				payMethod: payMethod,
				fen: this.current_item.fen,
				pay_type: pay_type
			};

			let resPay = await this.$pay(formDataPay);
			if (resPay == 1) {
				this.$refs.popupWantPay.close();
				this.$emit('init');
			}
		},
		payOk(res) {
			// 安卓0 支付成功，-1 支付失败， -2取消支付
			if (res == '0') {
				this.$refs.popupWantPay.close();
				this.$emit('init');
			}
		},
		async backApply() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				origin: this.applyReason,
				type:2//cancel_money接口 type:1申请人主动取消，type:2被申请人退回
			};
			let res = await this.$api('index.cancel_money', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.$emit('init');
			}
		}
	}
};
</script>

<style lang="scss"></style>
