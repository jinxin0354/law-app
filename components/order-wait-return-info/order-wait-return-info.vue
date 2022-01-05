<template>
	<view>
		<view class="wait-box" v-if="info.order.tui_pend && info.order.tui_pend.length > 0">
			<view class="wait-title">待退信息</view>
			<view class="wait-item" v-for="(item, index) in info.order.tui_pend">
				<view class="item-money">￥{{ item.money }}</view>
				<view class="item-txt">
					<view class="txt-name">{{ item.name }}</view>
					<view class="txt-tip">{{ item.time }}</view>
				</view>
				<view class="item-btn">
					<template>
						<button
							class="ok-btn marginbottom10"
							type="default"
							@click="
								current_item = item;
								$refs.popupIsCancelReview.open();
							"
						>
							取消退款
						</button>
						<button class="ok-btn" type="default" @click="$refs.telephoneClient.$refs.popupTel.open()">催促律师付款</button>
					</template>
				</view>
			</view>
		</view>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 是否取消退款 弹出层 -->
		<uni-popup ref="popupIsCancelReview" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我确认取消退款"
				:before-close="true"
				@confirm="cancelReceiveMoney()"
				@close="closePop('popupIsCancelReview')"
			></uni-popup-dialog>
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
	created() {},
	methods: {
		async cancelReceiveMoney() {
			this.$refs.popupIsCancelReview.close();
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token')
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
