<template>
	<view class="content">
		<law-index-nav @openCoupons="openCoupons"></law-index-nav>
		<view class="index-rights" @click="openRights()" v-if="rightsStatue">
			<image class="rights-img" src="@/static/img/index-notice1.png" mode="heightFix"></image>
			<view class="rights-txt">“为免影响您的权益，请点击此处，一一开启新消息通知”</view>
			<image class="rights-img" src="@/static/img/index-notice2.png" mode="heightFix"></image>
		</view>
	<!-- 	<view class="index-rights" v-if="showCard" @click="openCard(1)">
			<image class="rights-img" src="@/static/img/index-notice1.png" mode="heightFix"></image>
			<view class="rights-txt">“请补充律师认证信息，以便继续接单”</view>
			<image class="rights-img" src="@/static/img/index-notice2.png" mode="heightFix"></image>
		</view> -->
		<!-- <view class="index-rights" v-if="showInfo" @click="openCard(2)">
			<image class="rights-img" src="@/static/img/index-notice1.png" mode="heightFix"></image>
			<view class="rights-txt">“请点击完善个人能力，吸引更多用户委托您”</view>
			<image class="rights-img" src="@/static/img/index-notice2.png" mode="heightFix"></image>
		</view> -->
		<law-nav></law-nav>
		<!-- 服务领域 -->
		<scroll-view scroll-x class="service-area-box" v-if="serveAreaList">
			<view class="secend-item" v-for="(item, index) in serveAreaList" @click="jump('/pages/client/index/list', { server_id: item.id })">
				<view class="second-txt" :style="'background-color: ' + item.color">
					<image :src="item.area_image" class="area-image" mode="widthFix"></image>
					<text class="area-txt">{{ item.area_name }}</text>
				</view>
			</view>
		</scroll-view>

		<!-- 消息列表 -->
		<view class="notice-index-box" @click="jump('/pages/client/index/notice')">
			<view class="notice-index-left">
				<view class="notice-index-item" v-for="(item, index) in infoNotices.notice">
					<view class="item-txt">{{ item.title }}</view>
					<view class="item-time gray">{{ item.time }}</view>
				</view>
			</view>
			<view class="bottom-right">
				<view class="bottom-raidus" v-if="info.notice_status == 0"></view>
				<view class="bottom-arrow"><image src="@/static/img/gray-right-arrow.png" mode="widthFix"></image></view>
			</view>
		</view>
		<!-- 轮播图-->
		<swiper
			class="swiper-banner"
			:indicator-dots="true"
			:autoplay="true"
			interval="5000"
			duration="1000"
			:circular="true"
			indicator-color="rgba(255,255,255,0.5)"
			indicator-active-color="#FFC801"
		>
			<swiper-item v-for="(item, index) in bgBanner" :key="item.id">
				<view class="banner">
					<view class="image-wrapper" @click="goInvite(item)">
						<view :style="{ 'background-image': 'url(' + item.image + ')' }" style="height: 190rpx; background-size: 100% 100%; "></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<template v-if="userInfo.is_weituo == '1'">
			<view class="hot-box">
				<view class="hot-title">
					<image class="hot-fire" src="@/static/img/fire.png" mode="widthFix"></image>
					<text class="hot-txt">热销推荐</text>
				</view>
				<waterfall v-if="info.product" :col="col" :data="info.product" :gutterWidth="gutterWidth" :width="itemWidth">
					<template>
						<div class="cell-item" v-for="(item, index) in info.product" @click="navTo(item)">
							<view class="item-img" @click.stop="previewImage(item)">
						
								<image v-if="item.product_image" :src="item.product_image" alt="加载错误" mode="widthFix"></image>
								<view class="address">
									<view class="address-v">
									 <view class="year-icon">
									 	<image src="../../../static/img/year.png" class="" mode=""></image>
									 </view>
										<view class="year-name" v-if="item.serve_name!='全部'" style="margin-left: 10rpx;">{{item.serve_name}}</view>
											<view class="year-names" v-if="item.serve_name=='全部'" style="margin-left: 10rpx;">{{item.serve_name}}</view>
									</view>
									<view class="address-v">
									<view class="address-icon">
											<image src="../../../static/img/addresss.png" class="" mode=""></image>
									</view>
										<view class="address-name" style="margin-left: 10rpx;">{{item.profession}}</view>
									</view>
								</view>
							</view>
							<view class="item-txt">
								<law-product-intror-nopay2 :item="item"></law-product-intror-nopay2>
								<!-- 服务保障 -->
								<view class="item-tag text-ellipsis">
									<text class="tag-txt" v-for="(item_tag, index_tag) in item.tags">{{ item_tag }}</text>
								</view>
								<!-- 价格 -->
								<view class="item-money">
									<view class="item-give">
										<text class="item-fuhao">¥</text>
										<template v-if="String(item.product_money).indexOf('*') > 0">
											<text>{{ item.product_money.split('*')[0] }}</text>
											<text class="item-fq">x{{ item.product_money.split('*')[1] }}</text>
										</template>
										<template v-else>
											<text>{{ item.product_money }}</text>
										</template>
									</view>
									<view class="money-right gray">
										<view class="money-num">已售{{ item.sale }}</view>
									</view>
								</view>

								<!-- 标题 -->
								<view
									class="item-title"
									@click.stop="
										item.isEllipsis = !item.isEllipsis;
										copy(item);
									"
								>
									<image class="title-image" src="@/static/img/product-title.png" mode="widthFix"></image>
									<view class="title-txt" :class="{ 'txt-one-list': item.isEllipsis == true }">{{ item.title }}</view>
									<view
										class="title-arrow"
										:class="{ rotate: item.isEllipsis == true }"
										v-if="item.title && item.title.replace(/[\u0391-\uFFE5]/g, 'aa').length > 14"
									>
										<!-- <image src="@/static/img/order-top-arrow.png" mode="aspectFit"></image> -->
									</view>
								</view>
							</view>
						</div>
					</template>
				</waterfall>
				<!-- <view class="ok-box padding0"><button type="default" class="ok-btn" @click="checkAll()">查看全部服务</button></view> -->
			</view>
			<law-ad></law-ad>
		</template>
		<!-- 我要接单 -->
		<template v-else-if="userInfo.is_weituo != '1'">
			<view class="order-list-box" style="margin-top: 30rpx;">
				<view class="order-item" v-for="(item, index) in dataList">
					<view class="item-img">
						<view class="image-wrapper"><image :src="item.product_image" mode="aspectFit"></image></view>
						<view class="item-pro-name">{{ item.product }}</view>
					</view>
					<view class="item-txt">
						<view class="item-order">
							<text class="order-txt text-ellipsis">订单号：{{ item.order_sn }}</text>
							<view class="item-link text-ellipsis">
								<text
									class="tip-link"
									@click.stop="
										desc_content = item.serve_desc;
										$refs.popupEnsure.open();
									"
								>
									产品说明
								</text>
								<text
									class="tip-link"
									@click.stop="jump('/pages/client/order/upload', { source: JSON.stringify(item.source), readOnly: true })"
									v-if="item.source && item.source.length > 0"
								>
									项目资料
								</text>
							</view>
						</view>
						<law-product-intro :item="item"></law-product-intro>
						<order-list-other :item="item" :isProtect="true"></order-list-other>
					</view>
					<view class="service-list"><button class="service-item active" style="width: 400rpx; margin: auto;" @click.stop="iWant(item)">我要接单</button></view>
				</view>
				<uni-load-more
					:status="loadingType"
					:contentText="{
						contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
						contentnomore: '新订单正在来的路上，请稍等'
					}"
				></uni-load-more>
			</view>
		</template>
		<!-- 产品说明弹出层 -->
		<uni-popup ref="popupEnsure" type="center">
			<order-popup-common title="产品说明" @closePop="closePop('popupEnsure')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<view style="padding:0 30rpx;"><image :src="desc_content" mode="widthFix" style="width: 100%"></image></view>
				</scroll-view>
				<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="closePop('popupEnsure')">朕知道了</button></view>
			</order-popup-common>
		</uni-popup>

		<!-- 我要接单弹出层 -->
		<uni-popup ref="popupWantOrder" type="dialog">
			<uni-popup-dialog type="info" title="温馨提示" okTxt="确定" cancleTxt="取消" :before-close="true" @confirm="receiveOrder" @close="closePop('popupWantOrder')">
				<template v-if="current_item.product == '问一下' && current_item.serve_time == '15分钟'">
					<view>我确认接单</view>
				</template>
				<template v-else>
					<view class="warm-tip-box">
						<view class="warm-tip-item">
							<view class="item-left"> </view>
							<view class="item-right">请务必在接单后1分钟内，先联系下委托人，避免委托人长时间等待，产生情绪。</view>
						</view>
					<!-- 	<view class="warm-tip-item">
							<view class="item-left">·</view>
							<view class="item-right">如有利益冲突，请您指引委托人在15分钟内免费更换律师。</view>
						</view> -->
					</view>
				</template>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 领取优惠券弹出层 -->
		<uni-popup ref="popupCoupons" type="center">
			<view class="coupons-index-box">
				<view class="coupons-txt" v-if="current_coupon.coupon_type == 1">
					<view class="txt-tip">恭喜获得</view>
					<view class="txt-tip">1000元新人优惠券</view>
					<view class="img2"><image src="@/static/img/index-ic2.png" mode=""></image></view>
				</view>
				<view class="coupons-txt" v-else>
					<view class="txt-tip">恭喜获得{{ current_coupon.coupon_count }}张</view>
					<view class="txt-tip">{{ current_coupon.coupon_name }}</view>
					<view class="img2"><image src="@/static/img/index-ic20.png" mode=""></image></view>
				</view>

				<view class="img3" @click="closeGetCoupons()"><image src="@/static/img/index-ic3.png" mode="widthFix"></image></view>
				<view class="item-txt">可在“我的”—“钱包”里查看优惠卷</view>
				<view class="img4" @click="closeGetCoupons()"><image src="@/static/img/index-ic4.png" mode="widthFix"></image></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import uniCopy from '@/common/utils/js_sdk/xb-copy/uni-copy.js';
export default {
	data() {
		return {
			current_item: '',
			desc_content: '', //产品说明
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			dataList: [],
			wantOderContent: '',
			current_coupon: '', //优惠券类型
			ifOnShow: false, //返回时刷新
			info: '', //首页信息
			from: '',
			rightsStatue: true, //开启新消息通知，
			serveAreaList: [],
			hoteList: [],
			col: 2,
			infoNotices: '',
			showCard: false, //开启补充身份信息认证
			showInfo: false ,//开启未认证提醒
			token: uni.getStorageSync('token')
		};
	},
	created() {
		// 安卓
		window.isRightsOk = this.isRightsOk;
	},
	computed: {
		...mapGetters(['userInfo', 'navProduct', 'bgBanner']),
		itemWidth() {
			return 345 * 0.5 * (document.documentElement.clientWidth / 375); //#rem布局 计算宽度
		},
		gutterWidth() {
			return 20 * 0.5 * (document.documentElement.clientWidth / 375); //#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
		}
	},
	onHide() {
		this.ifOnShow = true;
	},
	onShow() {
		if (this.ifOnShow) {
			// 切换账户时，获取登录信息
			if (this.from == 'login') {
				this.init();
				this.getStatus();
			} else {
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					let res = phone.loadUserInfo();
					uni.setStorageSync('token', JSON.parse(res).data.userinfo.token);
					this.in_login(JSON.parse(res).data.userinfo);
					this.init();
					this.getStatus();
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('loadUserInfo', {}, res => {
						uni.setStorageSync('token', res.token);
						this.in_login(res);
						this.init();
						this.getStatus();
					});
				}
			}
		}
	},
	onLoad(params) {
		this.initOnce();
		// 获取登录信息
		if (params.from == 'login') {
			this.from = 'login';
			this.init();
			this.getStatus();
		} else {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				let res = phone.loadUserInfo();
				uni.setStorageSync('token', JSON.parse(res).data.userinfo.token);
				this.in_login(JSON.parse(res).data.userinfo);
				this.init();
				this.getStatus();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('loadUserInfo', {}, res => {
					uni.setStorageSync('token', res.token);
					this.in_login(res);
					this.init();
					this.getStatus();
				});
			}
		}
	},
	methods: {
		...mapMutations(['setNavProduct', 'in_login', 'setBgBanner']),
		async initOnce() {
			this.$api('index.index').then(res => {
				this.info = res.data;
				uni.setStorageSync('ad', this.info.fali.bottom_msg); //广告
				this.setBgBanner(this.info.bg_banner); //轮播图
				this.setNavProduct(this.info.top_category); //七个产品
				this.info.product.forEach(item => {
					this.$set(item, 'isEllipsis', true);
				});
			});

			this.$api('index.serveArea').then(res => {
				this.serveAreaList = res.data;
			});
		},
		getStatus() {
			if(uni.getStorageSync('isToast')){
				uni.showToast({
					title:'您可在“我的–个人信息”里修改个人能力',
					icon:'none',
					duration:5000
				})
				uni.removeStorageSync('isToast')
			}

			let tokenData = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.tips', tokenData).then(res => {
				if (res.data.is_lawyer_tips == 1 && res.data.is_read == 0) {
					this.showInfo = true;
				} else if (res.data.is_lawyer_tips == 2) {
					this.showCard = true;
				} else {
					this.showInfo = false;
					this.showCard = false;
				}
			});
		},
		openCard(type) {
			if (type == 1) {
				uni.navigateTo({
					url: '../../service/uploadCard/uploadCard'
				});
			} else {
				this.$api('index.tips', { token: uni.getStorageSync('token'), tips: 1 }).then(res => {
					uni.setStorageSync('isToast',true)
					uni.navigateTo({
						url: '../../service/lawyerAuth/lawyerAuth'
					});
				});
			}
		},
		async init() {
			let formData = { token: uni.getStorageSync('token') };
			// 认证为律师后，重新获取用户信息。每次进入都重新获取用户信息
			this.$api('index.user', formData).then(res => {
				this.in_login(res.data.user);
			});
			this.initCoupons();
			this.loadData('refresh');

			// 进入页面判断消息栏的状态是否开启 IOS不显示
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				let res = phone.loadNotificationSettingStatus();
				this.rightsStatue = res;
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.rightsStatue = false;
			}
		},
		//判断是否开启新消息通知iOS没有回执，自动隐藏
		isRightsOk() {
			this.rightsStatue = false;
			uni.showToast({
				title: `您可在“我的–设置–新消息通知”里，重新设置通知。`,
				icon: 'none',
				duration: 5000
			});
		},
		async initCoupons() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.is_coupon', formData);
			for (let i = 0; i < res.data.length; i++) {
				if (res.data[i].status == 0) {
					this.current_coupon = res.data[i];
					this.$refs.popupCoupons.open();
					break;
				}
			}
		},
		async closeGetCoupons() {
			this.$refs.popupCoupons.close();
			let formData = {
				token: uni.getStorageSync('token'),
				type: 1,
				coupon_type: this.current_coupon.coupon_type
			};
			let res = await this.$api('index.is_coupon', formData);
			this.initCoupons();
		},
		//带下拉刷新和上滑加载
		async loadData(type = 'add', loading) {
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.loadingType = 'loading';
			} else if (type === 'refresh') {
				this.loadingType = 'loading';
				this.page = 1;
				this.dataList = [];
			} else {
				this.loadingType = 'more';
			}

			let formData = {
				page: this.page,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.able', formData);
			if (res.code == 1) {
				this.infoNotices = res.data;
				let dataList = res.data.able_order;
				this.page++;
				this.dataList = this.dataList.concat(dataList);
				this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';
			}
		},
		goInvite(item) {
			if (item.title == '邀请好友') {
				this.jump('/pages/client/user/invite');
			} else if (item.title == '身份认证') {
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.identityAuthentication();
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('identityAuthentication', {}, res => {});
				}
			}
		},
		iWant(item) {
			this.current_item = item;
			this.$refs.popupWantOrder.open();
		},
		async receiveOrder() {
			//3是法律
			if (this.userInfo.is_lawyer== 1) {
				let formData = {
					token: uni.getStorageSync('token'),
					id: this.current_item.id
				};
				let res = await this.$api('index.l_getOrder', formData);
				if (res.code == 1) {
					this.closePop('popupWantOrder');
					let item = this.current_item;

					if (item.serve_time == '15分钟') {
						this.jump('/pages/lawyer/user/service-minute', { order_id: item.id, status: item.status });
					} else if (item.serve_time == '连续包月') {
						this.jump('/pages/lawyer/user/service-month', { order_id: item.id, status: item.status });
					} else if (item.serve_time == '包年') {
						this.jump('/pages/lawyer/user/service-year', { order_id: item.id, status: item.status });
					} else if (item.price_type == '投资人支付(不用还)') {
						this.jump('/pages/lawyer/user/service-investor', { order_id: item.id, status: item.status });
					} else {
						this.jump('/pages/lawyer/user/service-face', { order_id: item.id, status: item.status });
					}
				}
				//1是法务
			} else if (this.userInfo.is_fawu == '1') {
				let formData = {
					token: uni.getStorageSync('token'),
					id: this.current_item.id
				};
				let res = await this.$api('index.f_getOrder', formData);
				if (res.code == 1) {
					this.closePop('popupWantOrder');
					let item = this.current_item;
					this.jump('/pages/specialist/user/service-specialist', { order_id: item.id, status: item.status });
				}
			}
		},
		openCoupons() {
			this.initCoupons();
			this.$refs.popupCoupons.open();
		},
		// 开启新消息通知
		openRights() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.openNotificationSettings();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('openNotificationSettings', {}, data => {});
			}
		},
		navTo(item) {
			let url = '';
			let params = {
				product_id: item.product_price_id,
				product_name: item.product_name,
				area_id: item.id
			};

			if (item.product_name == '问一下') {
				url = '/pages/client/order/order-ask';
			} else if (item.product_name == '代写文书') {
				url = '/pages/client/order/order-write';
			} else if (item.product_name == '陪聊') {
				url = '/pages/client/order/order-chat';
			} else if (item.product_name == '管家') {
				url = '/pages/client/order/order-butler';
			} else if (item.product_name == '判案') {
				url = '/pages/client/order/order-decide';
			} else if (item.product_name == '打官司') {
				if (item.money_type == 26) {
					params = {
						...params,
						bearFees: '投资人支付(不用还)'
					};
				} else if (item.money_type == 27) {
					params = {
						...params,
						bearFees: '自费'
					};
				}
				url = '/pages/client/order/order-court-own';
			} else if (item.product_name == '刑事会见') {
				url = '/pages/client/order/order-criminal';
			}
			this.jump(url, params);
		},
		previewImage(item) {
			let previewImages = [];
			previewImages.push(item.product_image_max);
			this.previewImages(previewImages);
		},
		copy(item) {
			if (!item.isEllipsis) {
				return;
			}
			let copyInfo = item.title;
			uniCopy({
				content: copyInfo,
				success: res => {
					uni.showToast({
						title: '文案复制成功',
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
		checkAll() {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		}
	},
	//加载更多
	onReachBottom() {
		this.loadData();
	}
};
</script>

<style lang="scss">
.content {
	padding-top: 88rpx;
}
.banner {

	margin-bottom: 10rpx;
	width: 100%;
	height: 100%;
	.image-wrapper {
		width: 100%;
			height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.roll-box {
	background-color: #ffffff;
	padding: 0 0 0 50rpx;
	height: 100rpx;
	border-top: 1rpx solid #eee;
	border-bottom: 1rpx solid #eee;
	overflow: hidden;
	display: flex;
	align-items: center;
	.roll-left {
		width: 35rpx;
		height: 29rpx;
		margin-right: 20rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.roll-right {
		width: 120rpx;
		height: 30rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.swiper {
	width: 100%;
	height: 100rpx;

	.swiper-item-txt {
		width: 100%;
		line-height: 100rpx;
	}
}
.coupons-index-box {
	margin: 0 auto;
	.coupons-txt {
		text-align: center;
		.txt-tip {
			font-size: 36rpx;
			font-weight: 900;
			background: linear-gradient(to right, #ffc261, #ffeca8);
			-webkit-background-clip: text;
			color: transparent;
		}
	}
	.item-txt {
		text-align: center;
		height: 28rpx;
		font-size: 20rpx;
		margin: 0 auto;
		color: #ffffff;
		word-break:keep-all;/*不换行*/
		 
	white-space:nowrap;/*不换行*/
		 
	overflow:hidden;/*内容超出宽度时隐藏超出部分的内容*/
		 
	text-overflow:ellipsis;/*当对象内文本溢出时显示省略标记(...)；需与overflow:hidden;一起使用。*/
	}
	.img1 {
		text-align: center;
		height: 40px;
		margin: 0 auto;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.img2 {
		width: 376rpx;
		height: 260rpx;
		margin: 20rpx auto 0;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.img3 {
		width: 200rpx;
		height: 60rpx;
		margin: 15rpx auto;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.img4 {
		width: 40rpx;
		height: 40rpx;
		margin: 20rpx auto;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.user-index-con {
	padding: 100rpx 30rpx;
	.user-index-lit {
		width: 560rpx;
		margin: auto;
		.user-index-item {
			line-height: 60rpx;
			font-size: 24rpx;
		}
	}
}
.item-pro-name {
	text-align: center;
	margin-top: 20rpx;
}
/deep/ .product-intro .tip-item {
	color: #333333;
}
/deep/ .product-intro .tip-item.green {
	color: #2eab3b;
}
.notice-index-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	display: flex;
	padding: 20rpx;
	margin: 20rpx 20rpx;
	.notice-index-left {
		flex: 1;
		.notice-index-item {
			position: relative;
			padding: 5rpx 20rpx;
			display: flex;
			align-items: center;
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				width: 10rpx;
				height: 10rpx;
				background-color: #acacac;
				border-radius: 50%;
				transform: translate(0, -50%);
			}
			.item-txt {
				flex: 1;
			}
			.item-time {
				font-size: 20rpx;
			}
		}
	}
	.bottom-right {
		display: flex;
		align-items: center;
		.bottom-tip {
			color: #777;
			margin-right: 10rpx;
		}
		.bottom-raidus {
			border-radius: 50%;
			width: 16rpx;
			height: 16rpx;
			background-color: #f00;
			margin-right: 10rpx;
		}
		.bottom-arrow {
			width: 16rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.index-rights {
	padding: 20rpx;
	background-color: #eeeeee;
	display: flex;
	align-items: center;
	.rights-txt {
		color: #bd272d;
		font-size: 24rpx;
		flex: 1;
	}
	.rights-img {
		height: 30rpx;
	}
}
.service-area-box {
	white-space: nowrap;
	padding-bottom: 10rpx;
	padding-left: 30rpx;
	padding-right: 30rpx;
	box-sizing: border-box;
	.secend-item {
		display: inline-block;
		margin-right: 15rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		border-radius: 20rpx;
		overflow: hidden;
		.second-txt {
			display: flex;
			height: 68rpx;
			&.active {
				color: $uni-color-primary;
				border: 1rpx solid $uni-color-primary;
			}
			.area-image {
				display: block;
				width: 68rpx;
				height: 68rpx;
			}
			.area-txt {
				font-size: 30rpx;
				padding: 0 10rpx;
				line-height: 68rpx;
				
			}
		}
	}
}
.swiper-banner {
	width: 710rpx;
	height: 190rpx;
	margin: 0 auto;
	border-radius: 20rpx;
	overflow: hidden;

}
// 瀑布流
/deep/.vue-waterfall-column {
	float: left;
}

.cell-item {
	background: #ffffff;
	border-radius: 10px;
	overflow: hidden;
	box-sizing: border-box;
	margin-bottom: 20rpx;
}

.item-img {
	height: 250rpx;
	overflow: hidden;
	position: relative;
	image {
		width: 100%;
		height: 100%;
	}
}
.item-txt {
	
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 0;
	.item-money {
		margin: 14rpx 0;
		display: flex;
		justify-content: space-between;
		.money-right {
			min-width: 100rpx;
			display: flex;
			align-items: center;
			image {
				width: 30rpx;
				height: 30rpx;
			}
			.money-num {
				font-size: 20rpx;
				margin-left: 6rpx;
			}
		}
	}

	.item-title {
		padding-top: 4rpx;
		display: flex;
		.title-image {
			margin-left: 16rpx;
			margin-bottom: 17rpx;
			margin-top: 4rpx;
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
		.title-txt {
			color: #aaa;
			font-size: 20rpx;
			flex: 1;
			line-height: 50rpx;
		}
		.title-arrow {
			padding-left: 10rpx;
			width: 26rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			image {
				width: 100%;
			}
			&.rotate {
				image {
					transform: rotate(180deg);
				}
			}
		}
	}
	.item-tip {
		font-size: 24rpx;
		margin-bottom: 10rpx;
		.tip-item {
			font-size: 24rpx;
			margin-right: 10rpx;
		}
	}
	.item-tag {
		margin-bottom: 4rpx;
		&.text-ellipsis {
			color: #aaa;
		}
		.tag-txt {
			margin-left: 16rpx;
			color: #222222;
			font-size: 20rpx;
			margin-right: 2px;
		}
	}
	.item-give {
		color: #f25a0b;
		font-size: 28rpx;
		font-weight: bold;
		margin-left: 16rpx;
	}
	.item-fuhao {
		font-size: 20rpx;
	}
	.item-fq {
		font-size: 20rpx;
	}
}
.txt-one-list {
	height: 50rpx;
	overflow: hidden;
}
.hot-box {
	padding: 40rpx 20rpx;
	.hot-title {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		.hot-fire {
			width: 30rpx;
			margin-right: 14rpx;
		}
		.hot-txt {
			font-size: 32rpx;
			font-weight: bold;
		}
	}
}
.txt-one-list {
	height: 50rpx;
	overflow: hidden;
}

.address{
	width: 346rpx;
	height: 42rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 16rpx;
	padding-right: 16rpx;
	position: absolute;
	top: 211rpx;
	left: 0rpx;
	background:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,1));
}
.address-v{
	width: 90rpx;
	height: 42rpx;
	display: flex;
	align-items: center;
	
	// justify-content: space-between;
}
.year-icon{
	width: 26rpx;
	height: 30rpx;
}
.year-icon image{
	width: 100%;
	height: 100%;
}
.year-name{
font-size: 30rpx;
font-family: PingFang SC;
font-weight: bold;
color: #FFFFFF;
line-height: 42rpx;
}
.year-names{
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 42rpx;
}

.address-icon{
	
	width: 20rpx;
	height: 29rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.address-icon image{
	width: 100%;
	height: 100%;
}
.address-name{

	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 42rpx;

}
</style>
