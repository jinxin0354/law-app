<template>
	<view>
		<view class="wait-box" v-if="info.order.jie_pend && info.order.jie_pend.length > 0">
			<!-- <view class="wait-title">待付结算投资收益</view> -->
			<view class="wait-item" v-for="(item, index) in info.order.jie_pend">
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
						我要付款
					</button>
					<template>
						<button
							class="ok-btn"
							type="default"
							@click="
								current_item = item;
								backApply();
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
			<service-popup-pay title="我要付款" btnText="我要支付" @closePop="closePop('popupWantPay')" @confirmPay="confirmPay">
				<template slot="payOption">
					<view class="od-item marginbottom20">
						<view class="item-tip require">付款金额</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ current_item.money }}</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			current_item: {}
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
			if (this.current_item.fen == 5) {
				pay_type = 3;
				order_id = this.current_item.id;
			} else if (this.current_item.fen == 6) {
				pay_type = 2;
				order_id = this.current_item.id;
			} else {
				pay_type = 1;
				order_id = this.info.order.id;
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
				type: 2
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
