<template>
	<view class="content">
		<view class="datum-box">
			<view class="datum-item">
				<view class="item-title">{{ info.title }}</view>
				<view class="item-name" @click="jump('/pages/client/user/lawyer-detail', { lawyerId: info.user_id })">{{ info.lawyer }}律师</view>
				<view class="datum-img-box"><image class="item-image" :src="item.url" v-for="item in info.images" mode="widthFix"></image></view>

				<view class="right-box fixed">
					<view class="right-item" @click="collect">
						<view class="image-wrapper" v-if="info.is_zan"><image src="@/static/img/cjg-zan.png" mode="aspectFit"></image></view>
						<view class="image-wrapper" v-else><image src="@/static/img/cjg-zan-gray.png" mode="aspectFit"></image></view>
						<text>捧个人场</text>
					</view>
					<view class="right-item" @click="$refs.popupRewardPrize.open()">
						<view class="image-wrapper" v-if="info.is_log"><image src="@/static/img/cjg-shang.png" mode="aspectFit"></image></view>
						<view class="image-wrapper" v-else><image src="@/static/img/cjg-shang-gray.png" mode="aspectFit"></image></view>
						<text>捧个钱场</text>
					</view>
					<view class="right-item" @click="download()" v-if="infoContract">
						<view class="image-wrapper" v-if="info.is_down"><image src="@/static/img/cjg-upload.png" mode="aspectFit"></image></view>
						<view class="image-wrapper" v-else><image src="@/static/img/cjg-upload-gray.png" mode="aspectFit"></image></view>
						<text>下载</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 付款给律师  -->
		<uni-popup ref="popupRewardPrize">
			<service-popup-pay title="“谢谢你的打赏”" btnText="我要支付" @closePop="closePop('popupRewardPrize')" @confirmPay="confirmPayToLaw">
				<template slot="payOption">
					<view class="od-box" style="width: 100%; padding: 0;">
						<view class="od-item marginbottom10">
							<view class="item-tip require">打赏金额</view>
							<view class="item-right">
								<view style="width: 100%;">
									<view class="service-list inline-list service-list-bottom">
										<view class="service-item" :class="rewardPrize == '1' ? 'active' : ''" @click="rewardPrize = '1'">1元</view>
										<view class="service-item" :class="rewardPrize == '5' ? 'active' : ''" @click="rewardPrize = '5'">5元</view>
										<view class="service-item" :class="rewardPrize == '10' ? 'active' : ''" @click="rewardPrize = '10'">10元</view>
										<view class="service-item" :class="rewardPrize == '20' ? 'active' : ''" @click="rewardPrize = '20'">20元</view>
										<view class="service-item" :class="rewardPrize == '50' ? 'active' : ''" @click="rewardPrize = '50'">50元</view>
										<view class="service-item" :class="rewardPrize == '100' ? 'active' : ''" @click="rewardPrize = '100'">100元</view>
									</view>
								</view>

								<view class="item-txt other-reward-prize">
									<text class="other-tip">其他金额：￥</text>
									<input type="number" class="ipt-border" placeholder="" placeholder-class="placeholder" v-model="otherRewardPrize" @input="changeOtherRewardPrize()" />
								</view>
							</view>
						</view>
					</view>
				</template>
			</service-popup-pay>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: true,
			id: '',
			info: {},
			infoContract: '', //文件下载地址
			rewardPrize: '1', //打赏金额
			otherRewardPrize: ''
		};
	},
	onLoad(params) {
		if (params.id) {
			this.id = params.id;
			this.init();
		}
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 1) {
			this.goShare();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('shelf.shelfDetail', formData);
			if (res.code == 1) {
				this.info = res.data;
				this.infoContract = res.data.source;
			}
			// 获取打赏记录
			// let formDataLog = {
			// 	id: this.id,
			// 	token: uni.getStorageSync('token')
			// };
			// let resLog = await this.$api('index.shelf_log', formDataLog);
			// if (resLog.code == 1) {
			// }
		},
		change(data) {
			if (data === 1) {
				this.num = true;
			} else {
				this.num = false;
			}
		},
		async download() {
			
			let formData = {
				id: this.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.shelf_upload', formData);

			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.loadOffice(this.infoContract);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('loadOffice', this.infoContract, data => {});
			}

			this.init();
		},
		async collect() {
			let formData = {
				id: this.info.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.shelf_zan', formData);
			if (res.code == 1) {
				this.init();
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		},
		goShare() {
			let shareInfo = {
				title: '这个' + this.info.title + '写的很好，你看看有没有用。',
				content: '法力app上有很多免费的法律模板，我们工作和生活中拿来就可以用，省了不少事儿',
				imageUrl: `${this.$API_URL}/source/go.png`,
				path: `${this.$VIEW_URL}/#/pages/client/order/datum?id=${this.id}`
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
		async confirmPayToLaw(payMethod) {
			if (!this.rewardPrize || this.rewardPrize < 0.01) {
				uni.showToast({
					title: '请输入正确的金额',
					icon: 'none'
				});
				return;
			}

			this.$refs.popupRewardPrize.close();
			let formData = {
				id: this.info.id,
				token: uni.getStorageSync('token'),
				money: this.rewardPrize,
				pay_type: payMethod
			};
			let res = await this.$api('index.shelf_reward', formData);
			if (res.code == 1) {
				let formDataPay = {
					order_id: res.data.oid,
					payMethod: payMethod,
					fen: '',
					pay_type: 5
				};
				let resPay = await this.$pay(formDataPay);
				if (resPay == 1) {
					this.init();
				}
			}
		},
		payOk(res) {
			//TODO苹果的打赏成功，刷新页面
			this.init();
		},
		changeOtherRewardPrize() {
			this.rewardPrize = this.otherRewardPrize;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
	padding-bottom: 95rpx;
	padding-bottom: 160rpx;
}
.demo-txt {
	padding: 30rpx;
	line-height: 50rpx;
}
.datum-box {
	height: 100%;
	.datum-item {
		.datum-img-box {
			.item-image {
				width: 100%;
				display: block;
			}
		}
		.item-title {
			font-size: 34rpx;
			font-weight: bold;
			text-align: center;
			line-height: 32rpx;
			padding-top: 58rpx;
		}
		.item-name {
			flex: 1;
			font-size: 32rpx;
			text-align: right;
			line-height: 35rpx;
			color: #ffca00;
			margin: 29rpx 108rpx 50rpx 0;
		}
		.item-txt {
			text-indent: 2em;
			font-size: 32rpx;
			line-height: 70rpx;
			margin: 0 40rpx;
		}
		.item-nav {
			width: 683rpx;
			height: 212rpx;
			margin: 141rpx auto 56rpx;
			border: 2rpx #e6e6e6 solid;
			border-radius: 14rpx;
			display: flex;
			.nav-txt {
				width: 208rpx;
				height: 161rpx;
				font-size: 26rpx;
				margin: 25rpx 0 0 31rpx;
			}
			.nav-give {
				margin-left: 292rpx;
				.give-s,
				.give-z {
					width: 130rpx;
					height: 60rpx;
					font-size: 32rpx;
					background-color: #ffc900;
					color: #ffffff;
					margin-top: 30rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
				}
				.color {
					background-color: #f0f0f0;
				}
			}
		}
		.item-down {
			.item-download {
				width: 680rpx;
				height: 80rpx;
				margin: 0 auto;
				background-color: #ffc900;
				text-align: center;
				font-size: 32rpx;
				line-height: 80rpx;
				border-radius: 40rpx;
				color: #ffffff;
			}
		}
	}
}
.popup-Ensure-box {
	background-color: #ffffff;
	width: 520rpx;
	height: 274rpx;
	border-radius: 20rpx;
	.popup-txt {
		display: flex;
		justify-content: center;
		padding-top: 80rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}
	.popup-cut {
		height: 1rpx;
		width: 100%;
		background-color: #e0e0e0;
		margin-top: 63rpx;
	}
	.popup-sure {
		display: flex;
		justify-content: center;
		font-size: 32rpx;
		line-height: 30rpx;
		margin-top: 29rpx;
	}
}
.right-box {
	font-size: 32rpx;
	text-align: center;
	display: flex;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	background-color: #ffffff;
	.right-item {
		flex: 1;
		font-size: 24rpx;
		text-align: center;
		margin-left: 20rpx;
		.image-wrapper {
			margin: 0 auto 20rpx;
			width: 50rpx;
			height: 50rpx;
			image {
				margin: auto;
				width: 100%;
				height: 100%;
			}
		}
	}
}
.other-reward-prize {
	width: 100% !important;
	margin-top: 20rpx;
	position: relative;
	.other-tip {
		font-size: 24rpx;
		left: 10rpx;
		position: absolute;
		top: 0rpx;
	}
	.ipt-border {
		padding-left: 160rpx;
	}
}
</style>
