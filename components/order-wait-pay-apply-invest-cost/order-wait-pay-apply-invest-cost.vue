<template>
	<view>
		<view class="wait-box" v-if="info.order.pend_apply && info.order.pend_apply.length > 0">
			<view class="wait-title">待付信息</view>
			<view class="wait-item flex flex-vertical" v-for="(item, index) in info.order.pend_apply">
				<view class="flex flex-horizontal">
					<view class="item-money">￥{{ item.money }}</view>
					<view class=""  @click="itemClick(item)">
						<view class="txt-name">{{ item.name }}</view>
						<view class="txt-tip">{{ item.time }}</view>
					</view>
					<image class="image-r" style="width: 16rpx;height: 28rpx;margin-top: 6rpx;" src="@/static/img/right.png" mode="widthFix"></image>
				</view>
				
				<view class="item-btn flex flex-horizontal flex-center" style="margin-top: 10px;">
					<view
						class="comfir-btn flex flex-center flex1"
						type="default"
						@click="
							current_item = item;
							$refs.popupWantPay.open();
						"
					>
						我要付款
					</view>
					<view
						class="comfir-btn flex flex-center flex1"
						type="default"
						@click="
							current_item = item;
							backApply();
						"
					>
						退回申请
					</view>
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
		itemClick(item) {
			console.log(item)
			this.$emit('popupShow',item)
		},
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
				pay_type = 4;
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
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.cancel_apply', formData);
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

<style lang="scss">
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 35px;
	}
</style>
