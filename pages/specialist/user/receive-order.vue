<template>
	<view class="content">
		<view class="type-box">
			<view class="type-item" @click="replace('/pages/client/user/order')" v-if="userInfo.user_type != 1">我的订单</view>
			<view class="type-item active" @click="replace('/pages/lawyer/user/receive-order')" v-if="userInfo.user_type == 3 || userInfo.user_type == 4">我的接单</view>
			<!-- <view class="type-item active" @click="replace('/pages/specialist/user/receive-order')" v-else-if="userInfo.user_type == 2">我的接单</view> -->
		</view>
		<view class="item-content">
			<view class="item-status" :class="{active:current==index+1}" v-for="(item,index) in data" @click="loadData(index+1,'refresh')">{{item}}</view>
		</view>
		<view class="order-list-box">
			<view class="order-item" @click="navTo(item)" v-for="(item, index) in dataList">
				<view class="item-top">
					<view class="top-left" @click.stop="jump('/pages/client/index/list', { id: item.id })">
						<view class="image-wrapper"><image :src="item.pro_image" mode="aspectFit"></image></view>
						<view class="left-txt">{{ item.product_title }}</view>
						<view class="image-wrapper image-wrapper2"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
					<!-- 委托人在15分钟内无理由更换律师的，原律师进入“订单取消”界面。 -->
					<!-- 12=订单结束-->
					<!-- "1": "法务接单", "2": "法务点击完成","13": "委托人点击完成法务", -->
					<!-- "15": "法务完成" -->
					<view class="top-right gray" v-if="item.status == -1">订单取消</view>
					<view class="top-right gray" v-else-if="item.status == 12">服务解除</view>
					<view class="top-right gray" v-else-if="item.status == 1 || item.status == 2 || item.status == 13 || item.status == 18">法务服务中</view>
					<view class="top-right gray" v-else>法务完成</view>
				</view>
				<!-- 委托人在15分钟或者法务中，叫一下显示闹钟 -->
				<view class="item-img">
					<view class="image-wrapper">
						<image :src="item.area_image" mode="aspectFit"></image>
						<image v-if="item.lawyer_call == 1 || item.legal_call == 1" src="@/static/img/order-clock.png" class="image-clock"></image>
					</view>
				</view>
				<view class="item-txt">
					<view class="item-order">
						<text class="order-txt text-ellipsis">订单号：{{ item.order_sn }}</text>
					</view>
					<law-product-intro :item="item"></law-product-intro>
					<view class="item-tip text-ellipsis">
						<text class="tip-item">{{ item.client_name }}</text>
						<text class="tip-item">{{ item.client_tel }}</text>
					</view>
					<!-- 我的要求 -->
					<view class="item-tip text-ellipsis" v-if="item.requirement">
						<text class="tip-item">要求：{{ item.requirement }}</text>
					</view>
					<view class="item-prize">
						<text class="prize-num" v-if="item.price_type == '投资人支付(不用还)'">￥投资人支付</text>
						<text class="prize-num" v-else>￥{{ item.money }}</text>
					</view>
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
			loadingType: 'more' ,//加载更多状态
			data:['全部订单','律师接单','法务接单','投资人接单'],
			current:1
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
		this.loadData(1);
	},
	methods: {
		timeup() {
			this.isTimeOver = true;
		},
		navTo(item) {
			if (item.status == -1) {
				this.jump('/pages/lawyer/user/order-cancel', { order_id: item.id });
			} else if (item.status == 12) {
				this.jump('/pages/lawyer/user/service-remove', { order_id: item.id });
			} else if (item.status == 1 || item.status == 2 || item.status == 13 || item.status == 18) {
				this.jump('/pages/specialist/user/service-specialist', { order_id: item.id, status: item.status });
			} else {
				this.jump('/pages/specialist/user/service-ok', { order_id: item.id });
			}
		},
		//带下拉刷新和上滑加载
		async loadData(index,type = 'add', loading) {
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
			};
			let res = await this.$api('index.my_order', formData);
			let dataList = res.data.order;

			this.page++;
			this.dataList = this.dataList.concat(dataList);

			this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';

		}
	},
	//加载更多
	onReachBottom() {
		this.loadData(1);
	}
};
</script>

<style lang="scss">
.fontsize24 {
	font-size: 24rpx !important;
}
.service-list {
	padding-top: 10px;
}
.image-wrapper {
	position: relative;
}
.image-clock {
	position: absolute;
	width: 50rpx !important;
	height: 50rpx !important;
	right: -10rpx;
	bottom: -10rpx;
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
