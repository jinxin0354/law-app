<template>
	<view class="popup-bottom-box">
		<view class="bot-title">
			<view class="title-txt">请选择打赏金额</view>
			<!-- 关闭图标 -->
			<view class="title-close" @click="close">
				<view class="image-wrapper"><image src="@/static/img/close.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<view class="bot-con">
			<view class="money-box">
				<view class="money-item active" @click="confirm(5)">￥5</view>
				<view class="money-item active" @click="confirm(10)">￥10</view>
				<view class="money-item active" @click="confirm(15)">￥15</view>
				<view class="money-item active" @click="isSelfShow = true">自定义</view>
			</view>
			<view class="money-box" v-if="isSelfShow">
				<view class="money-code">￥</view>
				<view class="money-item"><input type="number" v-model="moneySelf" /></view>
				<view class="money-item active" style="margin-right: 0;" @click="confirmBottom">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			isSelfShow: false,
			moneySelf:""
		};
	},
	methods: {
		close() {
			this.$emit('closePop');
		},
		confirm(money){
			this.$emit('rewardConfirm',money);
		},
		confirmBottom(){
			if(!this.moneySelf){
				uni.showToast({
					title:"请输入金额",
					icon:'none'
				})
				return;
			}
			if(this.moneySelf < 1){
				uni.showToast({
					title:"打赏金额不能小于1元",
					icon:'none'
				})
				return;
			}
			this.$emit('rewardConfirm',this.moneySelf);
		}
	}
};
</script>

<style lang="scss">
.service-title {
	margin-bottom: 20rpx;
}
.popup-bottom-box {
	background-color: #ffffff;
	overflow: auto;
	border-top-left-radius: 26rpx;
	border-top-right-radius: 26rpx;
	.bot-title {
		display: flex;
		align-items: center;
		.title-txt {
			flex: 1;
			text-align: center;
			padding: 20rpx;
			font-weight: bold;
		}
		.title-close {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			.image-wrapper {
				width: 26rpx;
				height: 26rpx;
				vertical-align: middle;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.bot-con {
		padding: 0 30rpx;
		.money-box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			.money-code {
				flex: 1;
				text-align: right;
				padding-top: 10rpx;
				margin-right: 20rpx;
				color: #f00;
			}
			.money-item {
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				width: calc((100% - 60rpx) / 4);
				border: 1rpx solid #eee;
				border-radius: 40rpx;
				padding: 10rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				text-align: center;
				&:nth-of-type(4n) {
					margin-right: 0;
				}
				&.active {
					background-color: $uni-color-primary;
					color: #ffffff;
					border-color: $uni-color-primary;
				}
			}
		}
	}
}
</style>
