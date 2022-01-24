<template>
	<view class="flex flex-vertical wait-box"  v-if="(list.tui_pend && list.tui_pend.length > 0)">
		<view class="wait-item flex flex-vertical">
			<view class="wait-title">待付信息</view>
			<!-- 
				退款缺少弹窗
				弹框内容从 item.popup 读取 
			 -->
			<view class="flex flex-vertical item " v-for="item in list.tui_pend" >
				<view class="flex flex-horizontal" @click="itemClick(item)">
					<view class="item-money">¥{{item.money}}</view>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-vertical" style="width: 160px;">
							<text>{{item.new_name}}</text>
							<text>{{item.new_time}}</text>
						</view>
						<image v-if="item.type == 8 || item.type == 3 || item.type == 7 || item.type == 2" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex flex-horizontal flex-center-v btn-back">
					<view class="comfir-btn flex flex-center flex-1" 
					@click="
						current_item = item;
						$refs.popupWantPay.open();
					"
					>我要付款</view>
					<view class="comfir-btn flex flex-center flex-1"
					@click.stop="
						current_item = item;
						$refs.popupReturnReason.open();
					"
					>退回申请</view>
				</view>
			</view>
			<!-- 退回投资费用 -->
			<!-- <view class="flex flex-vertical item " v-for="item in list.pend_tui_apply" >
				<view class="flex flex-horizontal" @click="itemClick(item)">
					<view class="item-money">¥{{item.money}}</view>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-vertical" style="width: 160px;">
							<text>{{item.new_name}}</text>
							<text>{{item.new_time}}</text>
						</view>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex flex-horizontal flex-center-v btn-back">
					<view class="comfir-btn flex flex-center flex-1" 
					@click="
						current_item = item;
						$refs.popupWantPay.open();
					"
					>我要付款</view>
					<view class="comfir-btn flex flex-center flex-1"
					@click.stop="
						current_item = item;
						$refs.popupReturnReason.open();
					"
					>退回申请</view>
				</view>
			</view> -->
			
		</view>
		<!-- 取消收款弹出层 -->
		<uni-popup ref="popupCancelReceive" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="取消收款"
				:before-close="true"
				@confirm="
					closePop('popupCancelReceive');
					cancelReceiveMoney();
				"
				@close="closePop('popupCancelReceive')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 退款申请弹出层 -->
		<uni-popup ref="popupReturnApplyFee" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="退回申请"
				:before-close="true"
				@confirm="
					closePop('popupReturnApplyFee');
					returnApplyFee(0);
				"
				@close="closePop('popupReturnApplyFee')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 申请弹出层 -->
		<uni-popup ref="popupReturnApplyFee" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="退回申请"
				:before-close="true"
				@confirm="
					closePop('popupReturnApplyFee');
					returnApplyFee(0);
				"
				@close="closePop('popupReturnApplyFee')"
			></uni-popup-dialog>
		</uni-popup>
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
		<!-- 退款退回理由 -->
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
		<!-- 退回投资费用 理由 -->
		<!-- 申请弹出层 -->
		<uni-popup ref="popupReturnApplyMoney" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="退回申请"
				:before-close="true"
				@confirm="
					closePop('popupReturnApplyMoney');
					cancelReceiveMoney2();
				"
				@close="closePop('popupReturnApplyMoney')"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: ['info','list'],
	data() {
		return {
			current_item:{},
			applyReason:'',
		};
	},
	created() {
		//console.log('list.pend_tui_apply');
		//console.log(this.list.pend_tui_apply);
		/* 
		console.log('list.tui_pend');
		console.log(this.list.tui_pend);
		console.log('list.tui_pay');
		console.log(this.list.tui_pay); */
	},
	methods: {
		itemClick(item) {
			this.$emit('popupShow',item)
		},
		async cancelReceiveMoney() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.lawyer_cancel_collect', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.$emit('init');
			}
		},
		async returnApplyFee(isreduction) {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				isreduction: isreduction
			};
			let res = await this.$api('latefee.setreply', formData);
			if (res.code == 1) {
				this.$emit('init');
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
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
		},
		async cancelReceiveMoney2() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
			};
			let res = await this.$api('index.cancel_apply', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.$emit('init');
			}
		},
	}
};
</script>

<style>
	.btn-back {
		padding: 10px 0;
	}
	
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 35px;
	}
	.item {
		margin-top: 12px;
		margin-bottom: 12px;
	}
</style>

<style lang="scss"></style>
