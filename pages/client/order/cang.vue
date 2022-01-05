<template>
	<view class="content">
		<view class="cang-box">
			<view class="cang-item" @click="jump('/pages/client/order/datum', { id: item.id })" v-for="(item, index) in dataList">
				<view class="item-txt">{{ item.title }}</view>
				<view class="item-right">
					<view class="right-item">
						<view class="image-wrapper">
							<image src="@/static/img/cjg-see.png" mode="aspectFit" v-if="item.is_see == 1"></image>
							<image src="@/static/img/cjg-see-gray.png" mode="aspectFit" v-else></image>
						</view>
						<text>{{ item.see }}</text>
					</view>
					<view class="right-item">
						<view class="image-wrapper">
							<image src="@/static/img/cjg-zan.png" mode="aspectFit" v-if="item.is_zan == 1"></image>
							<image src="@/static/img/cjg-zan-gray.png" mode="aspectFit" v-else></image>
						</view>
						<text>{{ item.zan }}</text>
					</view>
					<view class="right-item">
						<view class="image-wrapper">
							<image src="@/static/img/cjg-shang.png" mode="aspectFit" v-if="item.is_log == 1"></image>
							<image src="@/static/img/cjg-shang-gray.png" mode="aspectFit" v-else></image>
						</view>
						<text>{{ item.total }}</text>
					</view>
					<view class="right-item">
						<view class="image-wrapper">
							<image src="@/static/img/cjg-upload.png" mode="aspectFit" v-if="item.is_down"></image>
							<image src="@/static/img/cjg-upload-gray.png" mode="aspectFit" v-else></image>
						</view>
						<text>{{ item.upload }}</text>
					</view>
				</view>
			</view>
			<uni-load-more
				:status="loadingType"
				:contentText="{
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '更多模板正在来的路上哦'
				}"
			></uni-load-more>
			<view class="ok-box fixed" v-if="userInfo.user_type == '3'">
				<view type="default" class="ok-btn" @click="jump('/pages/client/order/cang-upload')">
					共享模板
					<image class="noback2" style="height: 40rpx;top:0;right: 30rpx;" mode="heightFix" src="@/static/img/order-noback10.png"></image>
				</view>
			</view>
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
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			dataList: [],
			ifOnShow: false, //返回时刷新
			source: []
		};
	},
	computed: {
		...mapGetters(['userInfo', 'navProduct'])
	},
	onHide() {
		this.ifOnShow = true;
	},
	onShow() {
		if (this.ifOnShow) {
			this.init();
		}
	},
	onLoad() {
		this.init();
	},
	created() {
		window.fileOk = this.fileOk;
		window.photoOk = this.photoOk;
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
				pageSize:20,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.shelf', formData);
			if (res.code == 1) {
				let dataList = res.data.list;
				this.page++;
				this.dataList = this.dataList.concat(dataList);
				this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';
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
page {
	background-color: #ffffff;
}
.cang-box {
	padding-bottom: 200rpx;
	.cang-item {
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1rpx solid #eeeeee;
		padding: 20rpx 30rpx;
		.item-txt {
			flex: 1;
			font-size: 32rpx;
			display: flex;
			align-items: center;
		}
		.item-right {
			font-size: 32rpx;
			text-align: center;
			display: flex;
			.right-item {
				font-size: 24rpx;
				color: #aaaaaa;
				text-align: center;
				margin-left: 20rpx;
				min-width: 50rpx;
				.image-wrapper {
					margin: auto;
					width: 36rpx;
					height: 36rpx;
					image {
						margin: auto;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
.choose-box {
	padding: 0 30rpx;
	.choose-item {
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		text-align: center;

		.image-wrapper {
			margin: auto;
			width: 60rpx;
			height: 60rpx;
			margin-bottom: 10rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
