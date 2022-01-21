<template>
	<view class="content">
		<view class="banner" v-if="info.image">
			<view class="image-wrapper"><image v-if="info" :src="info.image" mode="widthFix"></image></view>
		</view>
		<view class="product-type-box" :class="{ 'fixed-top': searchBarFixed == true }" id="product-type-box">
			<view class="type-item" v-for="(item, index) in typeInfo" :class="{ active: type_index == index }">
				<view class="item-txt" @click="type_index = index">{{ item.name }}</view>
			</view>
			<scroll-view scroll-x>
				<view class="secend-item" v-if="typeInfo.length > 0 && type_index == index" v-for="(item, index) in typeInfo">
					<text class="second-txt" v-for="(item_sec, index_sec) in item.value" @click="type_sec_index = index_sec" :class="{ active: type_sec_index == index_sec }">
						{{ item_sec.value_name }}
					</text>
				</view>
			</scroll-view>
		</view>
		<waterfall @loadmore="loadData()" :col="col" :data="dataList" :gutterWidth="gutterWidth" :width="itemWidth">
			<template>
				<div class="cell-item" v-for="(item, index) in dataList" @click="navTo(item)">
					<view class="item-img" @click.stop="previewImage(item)"><image v-if="item.product_image" :src="item.product_image" alt="加载错误" mode="widthFix"></image></view>
					<view class="item-txt">
						<law-product-intror-nopay :item="item"></law-product-intror-nopay>
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
								<template v-else-if="String(item.product_money).indexOf('(投资人支付') > 0">
									<text>{{ item.product_money.split('(投资人支付')[0] }}</text>
									<text class="item-fq">(投资人支付)</text>
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
							<view class="title-arrow" :class="{ rotate: item.isEllipsis == true }" v-if="item.title && item.title.replace(/[\u0391-\uFFE5]/g, 'aa').length > 14">
								<image src="@/static/img/order-top-arrow.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</div>
			</template>
		</waterfall>
		<uni-load-more
			:status="loadingType"
			:contentText="{
				contentdown: '',
				contentrefresh: '正在加载...',
				contentnomore: '法力 守护美好生活'
			}"
		></uni-load-more>

		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import uniCopy from '@/common/utils/js_sdk/xb-copy/uni-copy.js';
export default {
	data() {
		return {
			info: {},
			type_index: 0,
			type_sec_index: 0,
			typeInfo: {},
			typeParams: {},
			dataList: [],
			col: 2,
			page: 1,
			loadingType: 'more', //加载更多状态
			searchBarFixed: false,
			server_id: '',
			product_id: ''
		};
	},
	onLoad(params) {
		if (params.id) {
			this.product_id = params.id;
			this.init();
		}
		if (params.server_id) {
			this.server_id = params.server_id;
			this.init();
		}
	},
	watch: {
		type_index(val, oldVal) {
			this.type_sec_index = 0;
		},
		type_sec_index(val, oldVal) {
			this.typeParams = {
				product_name: this.type_index == 0 ? this.typeInfo[0].value[val].id : this.typeInfo[0].value[0].id, //执业年限
				pay_type: this.type_index == 1 ? this.typeInfo[1].value[val].id : this.typeInfo[1].value[0].id, //付款时间
				order: this.type_index == 2 ? this.typeInfo[2].value[val].id : this.typeInfo[2].value[0].id, //价格高低
				// server_id: this.type_index == 3 ? this.typeInfo[3].value[val].id : this.typeInfo[3].value[0].id //服务领域
			};
			if (this.product_id) {
				this.typeParams = {
					...this.typeParams,
					id: this.product_id,
					server_id: this.type_index == 3 ? this.typeInfo[3].value[val].id : this.typeInfo[3].value[0].id
				};
			}
			if (this.server_id) {
				this.typeParams = {
					...this.typeParams,
					server_id: this.server_id,
					id: this.type_index == 3 ? this.typeInfo[3].value[val].id : this.typeInfo[3].value[0].id,
					type: 2
				};
			}
			this.loadData('refresh');
		}
	},
	computed: {
		itemWidth() {
			return 345 * 0.5 * (document.documentElement.clientWidth / 375); //#rem布局 计算宽度
		},
		gutterWidth() {
			return 20 * 0.5 * (document.documentElement.clientWidth / 375); //#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
		}
	},
	onReady() {
		console.log('onReady');
		window.addEventListener('scroll', this.handleScroll);
	},
	onHide() {
		console.log('onHide');
		
	},
	methods: {
		async init() {
			let formData = {};
			if (this.product_id) {
				formData = {
					product_id: this.product_id
				};
			}
			if (this.server_id) {
				formData = {
					server_id: this.server_id
				};
			}
			let res = await this.$api('index.selects', formData);
			this.typeInfo = res.data;
			this.type_sec_index = 0;
			this.typeParams = {
				product_name: this.typeInfo[0].value[0].id, //执业年限
				pay_type: this.typeInfo[1].value[0].id, //付款时间
				order: this.typeInfo[2].value[0].id //价格高低
			};
			if (this.product_id) {
				this.typeParams = {
					...this.typeParams,
					id: this.product_id,
					server_id: this.typeInfo[3].value[0].id
				};
			}
			if (this.server_id) {
				this.typeParams = {
					...this.typeParams,
					server_id: this.server_id,
					id: this.typeInfo[3].value[0].id,
					type: 2
				};
			}
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
				...this.typeParams
			};

			let res = await this.$api('index.product', formData);
			if (res.code == 1) {
				if (this.page == 1) {
					this.info = res.data;
					uni.setNavigationBarTitle({
						title: res.data.title
					});
				}
				let dataList = res.data.server.server;
				dataList.forEach(item => {
					this.$set(item, 'isEllipsis', true);
				});

				this.page++;
				this.dataList = this.dataList.concat(dataList);
				this.loadingType = res.data.server.current_page >= res.data.server.total_page ? 'nomore' : 'more';
			}
		},
		navTo(item) {
			let url = '';
			let params = {
				product_id: item.product_price_id,
				product_name: item.product_name,
				area_id: item.id,
				product_image:item.product_image
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
		handleScroll() {
			console.log('scroll');
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			if (document.querySelector('#product-type-box')) {
				var offsetTop = document.querySelector('#product-type-box').offsetTop;
				if (scrollTop > offsetTop) {
					this.searchBarFixed = true;
				} else {
					this.searchBarFixed = false;
				}
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
	padding: 20rpx 20rpx 0;
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
	image {
		width: 100%;
		height: 100%;
	}
}
.item-txt {
	padding: 10rpx;
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
			color: #aaa;
			font-size: 20rpx;
			margin-right: 2px;
		}
	}
	.item-give {
		color: #f25a0b;
		font-size: 28rpx;
		font-weight: bold;
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
.banner {
	.image-wrapper {
		width: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		image {
			width: 100%;
			display: block;
		}
	}
}
.product-type-box {
	background-color: #f6f6f6;
	margin-bottom: 20rpx;
	display: flex;
	flex-wrap: wrap;
	.type-item {
		flex: 1;
		.item-txt {
			color: #aaa;
			font-size: 34rpx;
			position: relative;
			line-height: 50rpx;
			text-align: center;
			font-weight: bold;
		}
		&.active {
			.item-txt {
				color: #333;
				&::before {
					content: '';
					position: absolute;
					background-color: $uni-color-primary;
					width: 50rpx;
					height: 8rpx;
					border-radius: 8rpx;
					bottom: 0;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}
		}
	}
	.secend-item {
		white-space: nowrap;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
		.second-txt {
			display: inline-block;
			margin-right: 15rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			text-align: center;
			padding: 10rpx;
			color: #aaaaaa;
			border: 1rpx solid #ffffff;
			&.active {
				color: $uni-color-primary;
				border: 1rpx solid $uni-color-primary;
			}
		}
	}
}

.fixed-top.product-type-box {
	width: 100%;
	position: fixed;
	top: 70rpx;
	left: 0;
	z-index: 999;
	padding: 20rpx;
}

</style>
