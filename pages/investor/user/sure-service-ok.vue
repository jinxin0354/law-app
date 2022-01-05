<template>
	<view class="content">
		<view class="why-box">
			<view class="why-title">诉讼结果</view>
		</view>
		<view class="service-list fixed" style="padding: 20rpx;  background-color: #FFFFFF;">
			<button class="service-item active flex1 marginbottom0" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
			<button class="service-item active flex1 margin0" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
		</view>

		<!-- 确认服务完成弹出层 -->
		<uni-popup ref="popupSureServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我确认服务已经完成"
				:before-close="true"
				@confirm="sureServiceOk(1, 'popupSureServiceOk')"
				@close="closePop('popupSureServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 不确认服务完成弹出层 -->
		<uni-popup ref="popupNoSureServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我不确认服务已经完成"
				:before-close="true"
				@confirm="sureServiceOk(2, 'popupNoSureServiceOk')"
				@close="closePop('popupNoSureServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: ''
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
	},
	methods: {
		radio(e) {
			this.check = e;
		},
		radioChange(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.detail.value) {
					this.current = i;
					break;
				}
			}
		},
		async sureServiceOk(status, pop) {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				status: status
			};
			let res = await this.$api('index.t_sureOrder', formData);
			if (res.code == 1) {
				if (pop == 'popupSureServiceOk') {
					this.closePop('popupNoSureServiceOk');
					this.replace('/pages/investor/user/service-ok', { order_id: this.order_id });
				} else if (pop == 'popupNoSureServiceOk') {
					this.closePop('popupNoSureServiceOk');
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					prevPage.$vm.disableServiceOk = true;
					prevPage.$vm.disableRemoveEntrust = true;
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
};
</script>

<style lang="scss">
.content {
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-radio {
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.why-txt {
		}
		.why-ipt-box {
			flex: 1;
			border-bottom: 1rpx solid #eee;
			vertical-align: bottom;
			margin-left: 20rpx;
			padding-bottom: 4rpx;
		}
	}
}
</style>
