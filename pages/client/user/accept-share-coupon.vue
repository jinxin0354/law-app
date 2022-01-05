<template>
	<view class="content">
		<view class="accept-box">
			<image class="inv-top" src="@/static/img/inv-top2.png" mode="widthFix"></image>
			<view class="item-phone">您的好友{{ mobile }}为您推荐法力</view>
			<image class="inv-bot" src="@/static/img/inv-bot.png" mode="aspectFit"></image>
			<view class="coupon-new"><image src="@/static/img/coupon-share.png" mode="widthFix"></image></view>
			<view class="inv-bot-ipt-box">
				<input type="number" v-model="acceptMobile" maxlength="11" placeholder="请输入您的手机号码" placeholder-style="font-size:24rpx" />
				<view class="item-txt" @click="changeShow()">我要领券</view>
			</view>
		</view>
		<view class="ad-box">
			<image style="" src="https://oss.bigchun.com/fali/uploads/20210810/1e3090c20c10401cfbea14fc0ea0ce94.jpg" mode="widthFix"></image>
			<image style="" src="https://oss.bigchun.com/fali/uploads/20210810/e5916edbace66c01bfeed8588dd3fe18.jpg" mode="widthFix"></image>
			<image style="" src="https://oss.bigchun.com/fali/uploads/20210810/1d8278ccdfcd7dc9d11db680b3af2dbe.jpg" mode="widthFix"></image>
			<image style="" src="https://oss.bigchun.com/fali/uploads/20210810/ddc1a90257bcc997c5272c62fc96fb54.jpg" mode="widthFix"></image>
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
			mobile: '',
			acceptMobile: ''
		};
	},
	onLoad(options) {
		let routes = getCurrentPages();
		let curParam = routes[routes.length - 1].options;
		this.order_id = curParam.order_id;
		this.getInvite();
	},

	methods: {
		getInvite() {
			let formData = {
				id: this.order_id,
				type: 2
			};
			this.$api('index.my_inviteCode', formData).then(res => {
				this.mobile = res.data.mobile;
			});
		},
		changeShow() {
			if (!/(^1[0-9]{10}$)/.test(this.acceptMobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			this.$api('index.get_coupon', { id: this.order_id, mobile: this.acceptMobile }).then(res => {
				if (res.code == 1) {
					uni.showToast({
						title: '您已领劵，快下载APP咨询律师吧',
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				setTimeout(() => {
					window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.lifakeji.lark.business.law';
				}, 2000);
			});
		}
	}
};
</script>

<style lang="scss">
.accept-box {
	width: 100%;
	height: 100%;
	background-color: #e11b3c;
	padding-bottom: 120rpx;
	width: 100%;
	.inv-top {
		width: 100%;
	}
	.inv-bot {
		display: block;
		margin: 60rpx auto;
		height: 60rpx;
	}
	.item-phone {
		color: #ffffff;
		font-size: 30rpx;
		margin-top: 40rpx;
		text-align: center;
		font-weight: bold;
		text-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.4);
	}
	.inv-bot-ipt-box {
		display: flex;
		margin: 0 auto;
		width: calc(100% - 160rpx);
		background-color: #ffffff;
		border-radius: 10rpx;
		align-items: center;
		input {
			flex: 1;
			font-size: 28rpx;
			padding: 10rpx;
		}
		.item-txt {
			padding: 15rpx 20rpx;
			border-radius: 10rpx;
			color: #ffffff;
			text-align: center;
			background: linear-gradient(to right, #9730E9, #5100B8);
		}
	}
}
.ad-box {
	width: 750rpx;
	background-image: url(https://oss.bigchun.com/fali/uploads/20210810/85da656fb99f0dded7b5ce93e16cc177.jpg);
	image {
		width: 640rpx;
		padding: 55rpx;
	}
}
.coupon-new{
			width: 400rpx;
			margin: 0 auto 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
</style>
