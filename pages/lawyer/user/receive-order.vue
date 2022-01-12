<template>
	<view class="content">
		<law-top-nav title="我的接单"></law-top-nav>
		<view class="type-box">
			<view class="type-item " @click="replace('/pages/client/user/order')" v-if="userInfo.is_lawyer !=1 || userInfo.is_fawu != 1||userInfo.is_touziren!=1">我的订单</view>
			<view class="type-item active" @click="replace('/pages/lawyer/user/receive-order')" v-if="userInfo.is_lawyer ==1 || userInfo.is_touziren == 1||userInfo.is_fawu==1">我的接单</view>
			<!-- <view class="type-item" @click="replace('/pages/client/user/order')" v-if="userInfo.user_type != 1">我的订单</view>
			<view class="type-item active" @click="replace('/pages/lawyer/user/receive-order')" v-if="userInfo.user_type == 3 || userInfo.user_type == 4">我的接单</view>
			<view class="type-item active" @click="replace('/pages/specialist/user/receive-order')" v-else-if="userInfo.user_type == 2">我的接单</view> -->
		</view>
		<view class="item-content">
			<view class="item-status" :class="{active:current==index+1}" v-for="(item,index) in data" @click="loadData(index+1,'refresh')">{{item}}</view>
		</view>
		<view class="order-list-box">
			<view class="order-item" @click="navTo(item)" v-for="(item, index) in dataList">
				<view class="item-top">
					<view class="top-left" @click.stop="jump('/pages/client/index/list', { id: item.product_id })">
						<view class="image-wrapper"><image :src="item.pro_image" mode="aspectFit"></image></view>
						<view class="left-txt">{{ item.product_title }}</view>
						<view class="image-wrapper image-wrapper2"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
					<!-- 委托人在15分钟内无理由更换律师的，原律师进入“订单取消”界面。 -->
					<!-- 3=律师接单 14=委托人点击完成律师服务 4=律师点击律师服务完成 "10": "委托人解除律师服务","11": "律师解除律师服务",  16=律师 和 委托人都确认服务完成 投资人没确认 ，17 委托人律师都确认服务解除 投资人没确认-->
					<!-- 16=律师 和 委托人都确认完成 6 全部完成-->
					<!-- 12=订单结束-->

					<!-- 后台状态:-1=取消订单,0=未接单,1=法务接单,2=法务点击完成,3=律师接单,4=律师点击完成,6=投资人完成,8=委托人解除法务服务,9=法务解除法务服务,10=委托人解除律师服务,11=律师解除律师服务,12=订单结束,13=委托人点击完成法务,14=委托人点击律师,15=法务完成,16=律师完成,17=等待投资人确认解除,18=法务编辑中 -->
					<view class="top-right gray" v-if="item.status == -1 || item.status == 99">订单取消</view>
					<template
						v-if="
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
										:start="false"
										color="#f00"
										splitorColor="#f00"
										backgroundColor="#fff"
										@timeup="timeup"
									></uni-countdown>
								</view>
								<view class="txt-down-after">后确认完成</view>
							</view>
						</template>
						<view class="top-right gray">
							<!-- 委托人在15分钟或者法务中，叫一下显示闹钟 -->
							<image v-if="item.lawyer_call == 1 || item.legal_call == 1" src="@/static/img/clock.gif" class="image-clock"></image>
							律师服务中
						</view>
					</template>
					<view class="top-right gray" v-else-if="(item.product != '打官司' && item.status == 16) || item.status == 6">服务完成</view>
					<view class="top-right gray" v-else-if="item.product != '打官司' && item.status == 17">服务解除</view>
				</view>

				<view class="item-img">
					<view class="image-wrapper"><image :src="item.area_image" mode="aspectFit"></image></view>
				</view>
				<view class="item-txt">
					<view class="item-order">
						<text class="order-txt text-ellipsis">订单号：{{ item.order_sn }}</text>
					</view>
					<law-product-intro :item="item"></law-product-intro>
					<order-list-other :item="item"></order-list-other>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			dataList: [],
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			ifOnShow: false ,//返回时刷新
			token: uni.getStorageSync('token'),
			data:['全部订单','律师接单','法务接单','投资人接单'],
			current:1,
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
			this.loadData(1,'refresh');
		},
		navTo(item) {
			console.log("nav")
			console.log(this.current)
			
			if (item.status == -1 || item.status == 99) {
				this.jump('/pages/lawyer/user/order-cancel', { order_id: item.id });
			} else if (
				item.status == 3 ||
				item.status == 14 ||
				item.status == 4 ||
				item.status == 10 ||
				item.status == 11 ||
				(item.product == '打官司' && item.status == 16) ||
				(item.product == '打官司' && item.status == 17)
			) {
				console.log(item.price_type);
					console.log('XX');
				if (item.serve_time == '15分钟') {
					this.jump('/pages/lawyer/user/service-minute', { order_id: item.id });
				} else if (item.serve_time == '连续包月') {
					this.jump('/pages/lawyer/user/service-month', { order_id: item.id });
				} else if (item.serve_time == '包年') {
					this.jump('/pages/lawyer/user/service-year', { order_id: item.id });
				} else if (item.price_type == '投资人支付(不用还)') {
					
					// 切换到律师接单选项
					if(this.current == 2){
						this.jump('/pages/lawyer/user/service-investor', { order_id: item.id, status: item.status });
					}
					// 切换到法务接单选项
					if(this.current == 3){
						this.jump('/pages/specialist/user/service-specialist', { order_id: item.id, status: item.status });
					}
					// 切换到投资人接单选项
					if(this.current == 4){
						this.jump('/pages/investor/user/service-investor', { order_id: item.id, status: item.status });
					}
					if (this.userInfo.is_lawyer == '1') {
						this.jump('/pages/lawyer/user/service-investor', { order_id: item.id, status: item.status });
					} else if (this.userInfo.is_touziren == '1') {
						this.jump('/pages/investor/user/service-investor', { order_id: item.id, status: item.status });
					}else if(this.userInfo.is_fawu == '1'){
						this.jump('/pages/specialist/user/service-specialist', { order_id: item.id, status: item.status });
					}
				} else {
					if(item.product == '打官司'){
						this.jump('/pages/lawyer/user/service-investor', { order_id: item.id, status: item.status });
					} else {
						this.jump('/pages/lawyer/user/service-face', { order_id: item.id });
					}
					
				}
			} else if (item.product != '打官司' && item.status == 16) {
				this.jump('/pages/lawyer/user/service-ok', { order_id: item.id });
			} else if (item.status == 6) {
				this.jump('/pages/investor/user/service-ok', { order_id: item.id });
			} else if (item.product != '打官司' && item.status == 17) {
				this.jump('/pages/lawyer/user/service-remove', { order_id: item.id });
			}else if(item.status==1){
				this.jump('/pages/specialist/user/service-specialist', { order_id: item.id });
			}
		},
		//带下拉刷新和上滑加载
		async loadData(index,type = 'add', loading) {
			console.log(this.page)
			this.current=index
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
				token: uni.getStorageSync('token'),
				user_type:this.current,
				pageSize:10
			};
			let res = await this.$api('index.my_order', formData);
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
		this.loadData(1);
	}
};
</script>

<style lang="scss">
.content {
	padding-top: 88rpx;
}
.image-clock {
	position: absolute;
	width: 50rpx !important;
	height: 50rpx !important;
	right: 130rpx;
	bottom: -6rpx;
}
.top-right {
	position: relative;
}
.item-content {
	display: flex;
	margin: 0 25rpx 20rpx;
	height: 60rpx;
	.item-status {
		width: 160rpx;
		height: 60rpx;
		background-color: #ffffff;
		margin-left: 20rpx;
		border: 1rpx #ffca00 solid;
		border-radius: 10rpx;
		text-align: center;
		line-height: 60rpx;
		color: #777777;
		font-size: 24rpx;
		&:first-child {
			margin-left: 0;
		}
	}
	.active {
		color: #ffca00;
	}
}

</style>
