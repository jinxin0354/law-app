<template>
	<view class="content">
		<law-top-nav title="邀请好友"></law-top-nav>
		<view class="invite-box">
			<view class="item-box">
				<view class="image-wrapper">
					<view class="item-roll">
						<u-notice-bar color="#000000" class="roll-item" font-size="28rpx" type="none" mode="vertical" :list="list" :volume-icon="false"></u-notice-bar>
					</view>
					<view class="item-main">
						<view class="main-top">
							<image class="main-top-image" src="@/static/img/invite-icon7.png" mode="widthFix"></image>
							<view class="main-top-txt">
								<view>您的专属领券邀请码</view>
								<view class="your-code">{{ inviteCode }}</view>
								<view class="your-copy" type="primary" @click="copy">复制</view>
							</view>
						</view>

						<view class="item-share">
							<view class="item-er" @click="goVxinvite()">
								<image src="@/static/img/invite-icon8.png" mode=""></image>
								<view class="er-txt">保存二维码</view>
							</view>
							<view class="item-er" @click="goShare()">
								<image src="@/static/img/invite-icon5.png" mode=""></image>
								<view class="er-txt">微信邀请</view>
							</view>
						</view>
						<view class="item-step"><image src="@/static/img/invite-icon20.png" mode="aspectFit"></image></view>
					</view>
					<view class="item-bottom">
						<view class="item-top"><image src="@/static/img/invite-icon11.png" mode="aspectFit"></image></view>
						<view class="item-box">
							<view class="item-title">学法辨是非 知法明荣辱 用法止纷争</view>
							<view class="item-txt">邀请朋友注册成功后，朋友即可随时随地，一 键轻松聘请专业人士为其答疑解惑，排忧解难， 舒筋活血。</view>
						</view>
						<view class="item-content">
							<view class="item-title">
								一重奖 新人注册奖励
								<text style="margin-left: 20rpx;font-weight: normal;">> > > > ></text>
							</view>
							<view class="item-txt">
								邀请1名朋友注册成功并登录法力app后，您即可获得人民币
								<text class="color">200元</text>
								的红包优惠券，受邀朋友亦可获得人民币
								<text class="color">1000元</text>
								的新人红包优惠券，优惠券均可转赠给其他朋友使用，礼轻情意重
							</view>
						</view>
						<view class="item-content">
							<view class="item-title">
								二重奖 推广奖励
								<text style="margin-left: 20rpx;font-weight: normal;">> > > > > > ></text>
							</view>
							<view class="item-txt" style="height: 166rpx;">
								邀请1名朋友注册成功并登录法力app后， 受邀朋友在法力平台的任何下单，您可永 久获得订单付费金额高达
								<text class="color">20%</text>
								的推广奖励 (可提现，不封顶) 轻松实现躺赢人生
							</view>
						</view>
						<view class="item-content">
							<view class="item-title">
								三重奖 服务奖励
								<text style="margin-left: 20rpx;font-weight: normal;">> > > > > > ></text>
							</view>
							<view class="item-txt">
								邀请1名朋友注册成功并登录法力app后，受邀朋友在法力平台下单，订单累计付费金额每达到人民币
								<text class="color">1万元</text>
								的，您可额外获得现金人民币
								<text class="color">200元</text>
								的服务奖励(可提现，不封顶) 多劳多得。细水长流，口红不愁
							</view>
						</view>
						<view class="item-content">
							<view class="item-title">
								四重奖 合伙人奖励
								<text style="margin-left: 20rpx;font-weight: normal;">> > > > > > ></text>
							</view>
							<view class="item-txt">
								邀请1名朋友注册成功并登录法力app后，受邀朋友即成为您的合伙人。和受邀朋友 一起推广，您可永久额外获得该朋友推广的订单付费金额
								<text class="color">3%</text>
								的合伙人奖励(可提现,不封顶) 互助互利，携手共进,合作共赢
							</view>
						</view>
					</view>
					<!-- 	短信邀请弹窗 -->
					<view class="item-popup" v-if="show">
						<view class="item-img" @click="changeShow()"><image src="@/static/img/invite-icon12.png" mode=""></image></view>
						<view class="item-input"><input type="text" value="" v-model="sendMobile" maxlength="11" placeholder="请输入邀请手机号码" /></view>
						<view class="item-btn" @click="send()">我要发短信</view>
					</view>
					<!-- 微信邀请弹窗 -->
					<uni-popup ref="popup" type="bottom">
						<view class="popup-item">
							<view class="item-top">选择要分享到的平台</view>
							<view class="item-pt">
								<view class="pt-item">
									<view class="item-img">
										<image src="@/static/img/invite-icon13.png" mode=""></image>
										<view class="item-txt">微信</view>
									</view>
									<view class="item-img">
										<image src="@/static/img/invite-icon14.png" mode=""></image>
										<view class="item-txt">微信朋...</view>
									</view>
									<view class="item-img">
										<image src="@/static/img/invite-icon15.png" mode=""></image>
										<view class="item-txt">微信收藏</view>
									</view>
								</view>
							</view>
							<view class="item-btn"><u-button @click="cancel()">取消分享</u-button></view>
						</view>
					</uni-popup>
				</view>
			</view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import uniCopy from '@/common/utils/js_sdk/xb-copy/uni-copy.js';
export default {
	data() {
		return {
			list: ['132*****963 已经成功邀请5个朋友'],
			show: false,
			inviteCode: '',
			sendMobile: '',
			shareInfo: ''
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		goShare() {
			let shareInfo = {
				title: '快来领取1000元新人红包限时大放送！！！',
				content: '打赏律师 想问就问 事成才结款 效果有保障 邀朋友 解烦忧 赚收益',
				imageUrl: `${this.$API_URL}/source/go.png`,
				path: `${this.$VIEW_URL}/#/pages/client/user/accept-invite?invite=${this.inviteCode}`
			};
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.share(JSON.stringify(shareInfo));
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('share', shareInfo, data => {
					// 处理返回数据
					console.log(data, '我走了这里');
				});
			}
		},

		cancel() {
			this.$refs.popup.close();
		},
		//复制
		copy() {
			uniCopy({
				content: this.inviteCode,
				success: res => {
					uni.showToast({
						title: res,
						icon: 'none'
					});
				},
				error: e => {
					uni.showToast({
						title: e,
						icon: 'none',
						duration: 3000
					});
				}
			});
		},
		init() {
			let that = this;
			let formData = {
				token: uni.getStorageSync('token')
			};
			that.$api('index.my_invite', formData).then(res => {
				this.inviteCode = res.data.inviteCode;
				let banner = res.data.banner;
				banner.forEach(item => {
					if (item.mobile) {
						this.list.push(item.mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2') + ' 已经成功邀请' + item.children + '个人了');
					}
				});
			});
		},
		//微信邀请
		vxsend() {
			this.$refs.popup.open('bottom');
		},
		//短信邀请
		send() {
			let formData = {
				token: uni.getStorageSync('token'),
				mobile: this.sendMobile
			};
			if (!/(^1[0-9]{10}$)/.test(this.sendMobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			this.$api('index.sms', formData).then(res => {
				uni.showToast({
					title: '短信已发送',
					icon: 'none'
				});
			});
		},
		goAccept() {
			uni.navigateTo({
				url: '/pages/client/user/accept-invite?invite=' + this.inviteCode
			});
		},
		goVxinvite() {
			uni.navigateTo({
				url: '/pages/client/user/invite-vx'
			});
		},
		dxInvite() {
			this.show = true;
		},
		changeShow() {
			this.show = false;
			this.sendMobile = '';
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-top: 88rpx;
}
.item-box {
	.image-wrapper {
		width: 750rpx;
		height: 3073rpx;
		padding-top: 160rpx;
		background-image: url(@/static/img/invite-icon1.png);
		background-repeat: no-repeat;
		background-size: 750rpx 3073rpx;
		image {
			width: 100%;
			height: 100%;
		}
		.item-my {
			display: flex;
			flex-direction: row-reverse;
			font-size: 28rpx;
			color: #fb110b;
			text-shadow: 5rpx 5rpx 4rpx #ff8484;
			padding: 68rpx 40rpx 0 0;
		}
	}
}
.item-roll {
	width: 614rpx;
	margin: auto;
}
.item-main {
	width: 696rpx;
	height: 800rpx;
	background-image: url(@/static/img/invite-icon6.png);
	background-repeat: no-repeat;
	background-size: 696rpx 800rpx;
	margin: 345rpx auto 0;
	.item-title {
		font-size: 30rpx;
		text-align: center;
		padding-top: 76rpx;
	}
	.main-top {
		padding-top: 80rpx;
		.main-top-image {
			display: block;
			margin: 0 auto;
			width: 500rpx;
		}
		.main-top-txt{
			margin: 0 auto;
			width: 500rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			line-height: 42rpx;
			color: #666;
			.your-code {
				padding: 0 8rpx;
				font-size: 32rpx;
				color: #ff0000;
			}
			.your-copy {
				padding: 2rpx 4rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #666666;
				color: #ffffff;
				width: 70rpx;
				background-color: #ff8f2c;
				font-weight: normal;
				border-radius: 8rpx;
				text-align: center;
			}
		}
	}

	.item-txt {
		display: flex;
		font-size: 24rpx;
		justify-content: center;
	}
}
.item-share {
	display: flex;
	justify-content: space-around;
	width: 400rpx;
	margin: 20rpx auto;
	.item-er {
		text-align: center;
		font-size: 30rpx;
		image {
			width: 70rpx;
			height: 70rpx;
		}
	}
}
.item-step {
	width: 630rpx;
	height: 140rpx;
	margin: 20rpx auto 0;
	display: flex;
	justify-content: center;
	image {
		width: 100%;
		height: 100%;
	}
}
.item-bottom {
	margin: 20rpx auto 0;
	width: 682rpx;
	height: 1630rpx;
	background-image: url(@/static/img/invite-icon10.png);
	background-repeat: no-repeat;
	background-size: 682rpx 1630rpx;
	image {
		width: 100%;
		height: 100%;
	}
	.item-top {
		width: 310rpx;
		height: 90rpx;
		margin: 0 auto;
		image {
			margin: 72rpx auto 0;
			width: 100%;
			height: 100%;
		}
	}
	.item-box {
		.item-title {
			text-align: center;
			margin-top: 88rpx;
			font-size: 34rpx;
		}
		.item-txt {
			width: 504rpx;
			height: 106rpx;
			margin: 16rpx auto 0;
			font-size: 24rpx;
			line-height: 36rpx;
		}
	}
	.item-content {
		margin-top: 24rpx;
		.item-title {
			width: 460rpx;
			height: 60rpx;
			background-color: #ffac4d;
			background: linear-gradient(to right, #f9612b, #f98b2b);
			color: #ffffff;
			padding-left: 32rpx;
			line-height: 60rpx;
			font-weight: bold;
			font-size: 26rpx;
		}
		.item-txt {
			width: 520rpx;
			height: 208rpx;
			margin: 20rpx auto 0;
			font-size: 28rpx;
			color: #333333;
			line-height: 42rpx;
		}
		.color {
			color: #eb0a0a;
			font-size: 28rpx;
		}
	}
}
.item-popup {
	width: 460rpx;
	height: 252rpx;
	background-color: #eeeeee;
	border-radius: 20rpx;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	.item-img {
		float: right;
		width: 26rpx;
		height: 26rpx;
		margin: 20rpx 20rpx 0 0;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.item-input {
		display: flex;
		align-items: center;
		width: 360rpx;
		height: 64rpx;
		margin: 60rpx auto 20rpx;
		border-radius: 10rpx;
		padding-left: 26rpx;
		background-color: #ffffff;
	}
	.item-btn {
		background-color: #ffc900;
		width: 360rpx;
		height: 60rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		color: #ffffff;
		font-size: 30rpx;
		line-height: 60rpx;
		text-align: center;
	}
}
.popup-item {
	height: 400rpx;
	background-color: #eff8fc;
	.item-top {
		text-align: center;
		padding-top: 20rpx;
		font-size: 36rpx;
	}
	.item-pt {
		.pt-item {
			display: flex;
			margin-top: 50rpx;
			justify-content: space-around;
			.item-img {
				width: 100rpx;
				height: 100rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.item-txt {
				width: 120rpx;
				text-align: center;
				margin-left: -10rpx;
				margin-top: 16rpx;
			}
		}
	}
	.item-btn {
		margin-top: 100rpx;
	}
}
</style>
