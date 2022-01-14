<template>
	<view class="content">
		<law-top-nav title="我的订单"></law-top-nav>
		<view class="type-box">		
			<view class="type-item active" @click="replace('/pages/client/user/order')" v-if="userInfo.is_lawyer !=1 || userInfo.is_fawu != 1||userInfo.is_touziren!=1">我的订单</view>
			<view class="type-item" @click="replace('/pages/lawyer/user/receive-order')" v-if="userInfo.is_lawyer ==1 || userInfo.is_touziren == 1||userInfo.is_fawu==1">我的接单</view>
			<!-- <view class="type-item" @click="replace('/pages/specialist/user/receive-order')" v-if="userInfo.is_fawu==0 ">我的接单</view> -->
			<!-- <view class="type-item" @click="replace('/pages/specialist/user/receive-order')" v-else-if="userInfo.user_type == 2">我的接单</view> -->
		</view>
		<view class="order-list-box">
			<view class="order-item" @click="navTo(item)" v-for="(item, index) in dataList">
				<view class="item-top">
					<view class="top-left" @click.stop="jump('/pages/client/index/list', { id: item.product_id })">
						<view class="image-wrapper"><image :src="item.pro_image" mode="aspectFit"></image></view>
						<view class="left-txt">{{ item.product_title }}</view>
						<view class="image-wrapper image-wrapper2"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>

					<!-- 其他产品"0": "未接单"也就是律师匹配中,  打官司-0-法务匹配中   "15": "法务完成"也就是律师匹配中 -->
					<!-- 3=律师接单 14=委托人点击完成律师服务 4=律师点击律师服务完成 "10": "委托人解除律师服务","11": "律师解除律师服务",  16=律师 和 委托人都确认服务完成 投资人没确认 ，17 委托人律师都确认服务解除 投资人没确认-->
					<!-- 16=律师 和 委托人都确认完成  6 投资人完成-->
					<!-- 17=委托人律师都确认服务解除 投资人没确认-->
					<!-- "1": "法务接单", "2": "法务点击完成","13": "委托人点击完成法务", -->
					<view class="top-right gray" v-if="(item.product != '打官司' && item.status == 0) || item.status == 15">匹配律师中</view>
					<view class="top-right gray" v-else-if="item.product == '打官司' && item.status == 0">法务匹配中</view>
					<view class="top-right gray" v-else-if="item.status == -1">订单取消</view>
					<template
						v-else-if="
							item.status == 3 ||
								item.status == 14 ||
								item.status == 4 ||
								item.status == 10 ||
								item.status == 11 ||
								(item.product == '打官司' && item.status == 16) ||
								(item.product == '打官司' && item.status == 17)
						"
					>
						<template v-if="item.lawyer_finish">
							<view class="top-djs">
								<view class="txt-down">
									<uni-countdown
										:show-day="true"
										:day="item.remainTime.day"
										:hour="item.remainTime.hour"
										:minute="item.remainTime.minute"
										:second="item.remainTime.second"
										color="#f00"
										splitorColor="#f00"
										backgroundColor="#fff"
										@timeup="timeup"
									></uni-countdown>
								</view>
								<view class="txt-down-after">后确认完成</view>
							</view>
						</template>
						<view class="top-right gray">律师服务中</view>
					</template>

					<view class="top-right gray" v-else-if="(item.product != '打官司' && item.status == 16) || item.status == 6">服务完成</view>

					<view class="top-right gray" v-else-if="item.product != '打官司' && item.status == 17">服务解除</view>

					<view class="top-right gray" v-else-if="item.status == 1 || item.status == 2 || item.status == 13 || item.status == 18">法务服务中</view>
				</view>
				<view class="item-img">
					<view class="image-wrapper"><image :src="item.area_image" mode="aspectFit"></image></view>
				</view>
				<view class="item-txt">
					<view class="item-order">
						<text class="order-txt text-ellipsis">订单号：{{ item.order_sn }}</text>
					</view>
					<law-product-intro :item="item"></law-product-intro>
					<order-list-other-nopay :item="item"></order-list-other-nopay>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			dataList: [],
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			ifOnShow: false //返回时刷新
		};
	},
	onHide() {
		this.ifOnShow = true;
	},
	onShow() {
		if (this.ifOnShow) {
			this.init();
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.loadData('refresh');
		},
		navTo(item) {
			if (item.status == -1) {
				if (item.cancel_type == 1) {
					this.jump('/pages/client/user/order-cancel', { order_id: item.id });
				} else if (item.cancel_type == 2) {
					this.jump('/pages/client/user/auto-cancel', { order_id: item.id });
				}
			} else if ((item.product != '打官司' && item.status == 0) || item.status == 15) {
				this.jump('/pages/client/user/match', { order_id: item.id });
			} else if (item.product == '打官司' && item.status == 0) {
				this.jump('/pages/client/user/match-specialist', { order_id: item.id });
			} else if (
				item.status == 3 ||
				item.status == 14 ||
				item.status == 4 ||
				item.status == 10 ||
				item.status == 11 ||
				(item.product == '打官司' && item.status == 16) ||
				(item.product == '打官司' && item.status == 17)
			) {
				if (item.serve_time == '15分钟') {
					this.jump('/pages/client/user/service-minute', { order_id: item.id, status: item.status });
				} else if (item.serve_time == '连续包月') {
					this.jump('/pages/client/user/service-month', { order_id: item.id, status: item.status });
				} else if (item.serve_time == '包年') {
					this.jump('/pages/client/user/service-year', { order_id: item.id, status: item.status });
				} else if (item.price_type == '投资人支付(不用还)'  || item.price_type == '投资人支付') {
					this.jump('/pages/client/user/service-investor', { order_id: item.id, status: item.status });
				} else if(item.price_type == '自费'){
					this.jump('/pages/client/user/service-zifei', { order_id: item.id, status: item.status });
				} else {
					console.log('XX');
					if(item.price_type == '投资人支付(不用还)'  || item.price_type == '投资人支付'){
						this.jump('/pages/client/user/service-investor', { order_id: item.id, status: item.status });
					}else if(item.price_type == '自费') {
						this.jump('/pages/client/user/service-zifei', { order_id: item.id, status: item.status });
					}else {
						this.jump('/pages/client/user/service-face', { order_id: item.id, status: item.status });
					}
					
				}
			} else if ((item.product != '打官司' && item.status == 16) || item.status == 6) {
				this.jump('/pages/client/user/service-ok', { order_id: item.id });
			} else if (item.product != '打官司' && item.status == 17) {
				this.jump('/pages/client/user/service-remove', { order_id: item.id });
			} else if (item.status == 1 || item.status == 2 || item.status == 13 || item.status == 18) {
				this.jump('/pages/client/user/service-specialist', { order_id: item.id, status: item.status });
			}
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
			let res = await this.$api('index.myOrder', formData);
			let dataList = res.data.order;
			dataList.forEach((item, index) => {
				if (item.lawyer_finish) {
					this.$set(item, 'remainTime', this.timeFn(item.lawyer_finish));
				}
			});
			this.page++;
			this.dataList = this.dataList.concat(dataList);
			this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';

		},
		timeup() {
			this.init();
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
.fontsize24 {
	font-size: 24rpx !important;
}
.service-list {
	padding-top: 10px;
}
.match-image-txt {
	.txt-left {
		padding-top: 10rpx;
	}
}
</style>
