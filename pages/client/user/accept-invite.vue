<template>
	<view class="content">
		<view class="accept-box">
			<image class="inv-top" src="@/static/img/invite-top.png" mode="widthFix"></image>
			<view class="inv-con">
				<view class="item-phone">您的好友{{ mobile }}为您推荐法力</view>
				<view class="inv-bot-ipt-box">
					<input type="number" v-model="acceptMobile" maxlength="11" placeholder="请输入您的手机号码" placeholder-style="font-size:24rpx" />
					<view class="item-txt" @click="changeShow()">我要领券</view>
				</view>
				<view class="coupon-new"><image src="@/static/img/coupon-new.png" mode="widthFix"></image></view>
			
			</view>
			<image class="inv-top" src="@/static/img/invite-bot.png" mode="widthFix"></image>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
	data() {
		return {
			inviteCode: '',
			mobile: '',
			acceptMobile: '',
			time: ''
		};
	},
	onLoad(options) {
		let routes = getCurrentPages();
		let curParam = routes[routes.length - 1].options;
		this.inviteCode = curParam.invite;
		this.init();
	},

	methods: {
		async init() {
			this.getMobile();
			// wx配置
			let res = await this.$api('index.share');
			let sign = res.data;
			wx.config({
				debug: false,
				appId: sign.appId,
				timestamp: sign.timestamp,
				nonceStr: sign.nonceStr,
				signature: sign.signature,
				jsApiList: sign.jsApiList
			});

			wx.ready(() => {
				// 朋友圈
				wx.updateTimelineShareData({
					title: '快来领取1000元新人红包限时大放送！！！', // 标题
					link: `${this.$VIEW_URL}/#/pages/client/user/accept-invite?invite=${this.inviteCode}`, //分享链接
					imgUrl: `${this.$API_URL}/source/go.png` // 分享图标
				});
				// 发送给朋友
				wx.updateAppMessageShareData({
					title: '快来领取1000元新人红包限时大放送！！！', // 标题
					desc: '打赏律师 想问就问 事成才结款 效果有保障 邀朋友 解烦忧 赚收益', // 分享描述
					link: `${this.$VIEW_URL}/#/pages/client/user/accept-invite?invite=${this.inviteCode}`, //分享链接
					imgUrl: `${this.$API_URL}/source/go.png` // 分享图标
				});
			});
		},
		async getMobile() {
			let res = await this.$api('index.my_inviteCode', { invite: this.inviteCode });
			this.mobile = res.data.mobile;
		},
		changeShow() {
			if (!/(^1[0-9]{10}$)/.test(this.acceptMobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			this.$api('index.add_reg', { invite: this.inviteCode, mobile: this.acceptMobile }).then(res => {
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
.content {
	background-color: #52886f;
}
.accept-box {
	width: 100%;
	height: 100%;
	.inv-top {
		width: 100%;
	}
	.inv-con {
		padding: 40rpx 80rpx;
		box-sizing: border-box;
		.item-phone {
			color: #fff;
			font-size: 30rpx;
			text-align: center;
			font-weight: bold;
			text-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.4);
			margin-bottom: 30rpx;
		}
		.inv-bot-ipt-box {
			box-sizing: border-box;
			position: relative;
			height: 70rpx;
			display: flex;
			background-color: #ffffff;
			border-radius: 10rpx;
			border: 6rpx solid #0d0409;
			margin-bottom: 30rpx;
			.item-txt {
				height: 70rpx;
				line-height: 60rpx;
				box-sizing: border-box;
				position: absolute;
				top: -6rpx;
				right: -6rpx;
				padding: 0 20rpx;
				border: 6rpx solid #0d0409;
				border-radius: 10rpx;
				color: #ffffff;
				text-align: center;
				background: linear-gradient(to right, #9730E9, #5100B8);
			}
			input {
				font-size: 28rpx;
				padding: 10rpx;
			}
		}
	}
}
.coupon-new{
			width: 400rpx;
			margin: 0 auto 10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
</style>
