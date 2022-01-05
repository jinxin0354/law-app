<template>
	<view class="content">
		<view class="evaluat-item" v-for="(item, index) in dataList">
			<view class="evaluat-top">
				<view class="top-left"><image :src="item.avator" mode="widthFix"></image></view>
				<view class="top-right">
					<view class="top-phone">{{ item.username }}</view>
					<view class="top-tip">{{ item.createtime }}</view>
				</view>
			</view>
			<law-rate @change="onChange" size="40" :value="item.star" margin="10" :disabled="true"></law-rate>
			<view class="service-list">
				<button class="service-item" v-for="(item_evaluat, index_evaluat) in item.evaluate">{{ item_evaluat }}</button>
			</view>
			<view class="evaluat-bottom" v-if="!isShare">
				<view class="bottom-left" @click="jump('/pages/client/index/list', { id: item.product_id })">
					TA使用了
					<image class="bottom-area-nav" :src="item.product_image"></image>
					{{ item.product_title }}
					<image class="bottom-right-nav" src="@/static/img/right.png" mode="aspectFit"></image>
				</view>
				<view class="bottom-right" @click="collectEvaluat(item, index)">
					<image src="@/static/img/cjg-zan-gray.png" v-if="!item.is_zan"></image>
					<image src="@/static/img/cjg-zan.png" v-else></image>
					<view class="bottom-right-txt">有用{{ item.zan }}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			dataList: [],
            isShare: this.$route.query.type ? true : false
		};
	},
	onLoad(params) {
		if (params.lawyerId) {
			this.lawyerId = params.lawyerId;
			this.init();
		}
	},
	methods: {
		async init() {
			this.loadData('refresh');
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
				token: uni.getStorageSync('token'),
				id: this.lawyerId
			};
			let res = await this.$api('index.evaluate_list', formData);
			if (res.code == 1) {
				let dataList = res.data.order_evaluate;
				this.page++;
				this.dataList = this.dataList.concat(dataList);
				this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';
			}
		},
		async collectEvaluat(current_item, current_index) {
			let formData = {
				id: current_item.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.evaluate_zan', formData);
			if (res.code == 1) {
				this.dataList.forEach((item, index) => {
					if (item.id == current_item.id) {
						if (res.msg == '点赞成功') {
							item.is_zan = 1;
							item.zan++;
						} else {
							item.is_zan = 0;
							item.zan--;
						}
					}
				});
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
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
}
.evaluat-item {
	background-color: #ffffff;
	//border-radius: 26rpx;
	padding: 30rpx;
	border-bottom:1rpx solid #f6f6f6;
	//margin-bottom: 20rpx;
	.evaluat-top {
		display: flex;
		margin-bottom: 10rpx;
		.top-left {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.top-right {
			padding-top: 20rpx;
			.top-phone {
				font-size: 32rpx;
				margin-bottom: 6rpx;
			}
			.top-tip {
				font-size: 24rpx;
				color: #aaaaaa;
			}
		}
	}
	.evaluat-bottom {
		display: flex;
		justify-content: space-between;

		.bottom-left {
			display: flex;
			align-items: center;
			background-color: #fff9e1;
			padding: 8rpx;
			.bottom-area-nav {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
				margin: 0 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.bottom-right-nav {
				width: 30rpx;
				height: 30rpx;
				margin: 0 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.bottom-right {
			width: 120rpx;
			text-align: center;
			image {
				width: 30rpx;
				height: 30rpx;
			}
			.bottom-right-txt {
				font-size: 24rpx;
			}
		}
	}
}
</style>
