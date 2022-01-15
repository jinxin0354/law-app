<template>
	<view class="flex flex-vertical wait-box" v-if="list.length > 0 ">
		<view class="wait-item flex flex-vertical" >
			<view class="wait-title">待付信息</view>
			<view class="flex flex-vertical item " v-for="item in list" >
				<view class="flex flex-horizontal" @click="itemClick(item)">
					<view class="item-money">¥{{item.money}}</view>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-vertical" style="width: 160px;">
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<image v-if="item.type == 8 || item.type == 3 || item.type == 7" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex flex-horizontal flex-center-v btn-back">
					<view class="comfir-btn flex flex-center flex-1" 
					@click="
						current_item = item;
						$refs.popupCancelReceive.open();
					"
					>取消收款</view>
					<view class="comfir-btn flex flex-center flex-1"
					@click.stop="
						current_item = item;
						$refs.popupReturnApplyFee.open();
					"
					>退回申请</view>
				</view>
			</view>
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
		<!-- 退回申请弹出层 -->
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
		
		
	</view>
</template>

<script>
export default {
	props: ['info','list'],
	data() {
		return {
			current_item:{}
		};
	},
	created() {},
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
