<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-image-txt">
				<!-- <view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view> -->
				<view class="txt-right red">请务必先征得委托人同意，再取消订单，以免引起纠纷或投诉。</view>
			</view>
			<!-- <view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right red">请确认您的手机号与您现在登录本软件的账号一致，否则将无法拨打或接听虚拟电话</view>
			</view> -->
		</view>

		<view class="match-top-box cancel-box">
			<view class=""style="display: flex;padding:50rpx 0 200rpx 0;">
				取消原因：<input type="text" value="" v-model="reason"  style="border-bottom: 1rpx #000000 solid;width:520rpx;"/>
			</view>
			
		<!-- 	<textarea class="cancel-textarea" placeholder="请输入"></textarea> -->
			<view class="service-list" ><button class="service-item active" style="width: 100%; margin-right: 0;" @click="cancel" :disabled="reason==''">我要取消</button></view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			reason: ''
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
	},
	methods: {
		async cancel() {
			let formData = {
				id: this.order_id,
				reason: this.reason,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.legal_cancel', formData);
			if (res.code == 1) {
				uni.redirectTo({
					url:'/pages/specialist/user/order-cancel?order_id='+this.order_id 
				})
				// this.jump('', { order_id: this.order_id });
			}
		}
	}
};
</script>

<style lang="scss">
.cancel-textarea {
	box-sizing: border-box;
	padding: 20rpx;
	border: 1rpx solid #eee !important;
	width: 100%;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
}
</style>
