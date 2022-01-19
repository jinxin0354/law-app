<template>
	<view>
		<view class="wait-box" v-if="info.order.jie_pend && info.order.jie_pend.length > 0">
			<view class="wait-title">待收信息</view>
			<view class="wait-item flex flex-vertical" v-for="(item, index) in info.order.jie_pend">
				<view class="flex flex-horizontal">
					<view class="item-money">￥{{ item.money }}</view>
					<view class=""  @click="itemClick(item)">
						<view class="txt-name">{{ item.name }}</view>
						<view class="txt-tip">{{ item.time }}</view>
					</view>
					<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
				</view>
				<view class="item-btn flex flex-horizontal flex-center" style="margin-top: 10px;">
						<view v-if="item.is_shou == 0"
							class="comfir-btn flex flex-center flex1"
							type="default"
							@click="
								current_item = item;
								$refs.popupReceiveMoney.open();
							"
						>
							我要收款
						</view>
						<view v-else
							class="comfir-btn flex flex-center flex1 "
							type="default"
							@click="
								current_item = item;
								cancelReceiveMoney();
							"
						>
							取消收款
						</view>
						<view class="comfir-btn flex flex-center flex1 " type="default" @click="$refs.telephoneClient.$refs.popupTel.open()">催促委托人付款</view>
				</view>
			</view>
		</view>
		<!-- 我要收款弹出层 -->
		<uni-popup ref="popupReceiveMoney" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与委托人确认付款事宜"
				:before-close="true"
				@confirm="
					closePop('popupReceiveMoney');
					confirmReceiveMoney();
				"
				@close="closePop('popupReceiveMoney')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
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
		itemClick(item) {
			console.log(item)
			this.$emit('popupShow',item)
		},
		async confirmReceiveMoney() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				type: 1, //类型 1分期或者先用后付 2我要额外收款
				fen: this.current_item.fen
			};
			let res = await this.$api('index.lawyer_collect', formData);
			if (res.code == 1) {
				this.$emit('init');
			}
		},
		async cancelReceiveMoney() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				type: 1
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

<style lang="scss">
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 35px;
	}
</style>
