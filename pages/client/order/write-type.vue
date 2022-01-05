<template>
	<view class="content">
		<view class="write-item" v-for="(item, index) in info" :key="item.cate">
			<view class="write-title">{{ item.cate }}</view>
			<view class="service-list service-list-two">
				<view class="service-item" @click="document = item_child.document" :class="document == item_child.document ? 'active' : ''" v-for="(item_child, index) in item.children">
					<view class="item-grand-child" v-for="(item_grand_child, index_grand_child) in item_child.document">{{ item_grand_child }}</view>
				</view>
			</view>
		</view>
		<view class="write-item">
			<input class="ipt-bottom-border" type="text" v-model="otherReason" placeholder="请输入文书名称或文书主要内容" @input="change()" />
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">确定</button></view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>
<script>
export default {
	data() {
		return {
			info: [],
			document: '',
			otherReason: '',
			area_name: ''
		};
	},
	onLoad(params) {
		if (params.document && params.area_name) {
			this.document = params.document;
			this.area_name = params.area_name;
		}
		this.init();
	},
	methods: {
		async init() {
			let formData = {
				token: uni.getStorageSync('token'),
				area_id: this.area_name
			};
			let res = await this.$api('index.document', formData);
			let arr = res.data.map((item, index) => {
				let aa = item.children.map((item_child, index_child) => {
					if (this.document.indexOf(item_child.document) > -1) {
						return { ...item_child, active: true };
					} else {
						return { ...item_child, active: false };
					}
				});
				return {
					cate: item.cate,
					children: aa,
					id: item.id
				};
			});
			this.info = arr;
		},
		confirm() {
			if (!this.document) {
				uni.showToast({
					title: '请选择一个文书类型',
					icon: 'none'
				});
				return;
			}
			let that = this;
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2];
			// 如果是从律师服务中-增加服务按钮过来的
			if (prevPage.$vm.route == 'pages/client/user/service-face') {
				let doc = '';
				if(Array.isArray(that.document)){
					that.document.forEach((item, index) => {
						doc += item;
					});
				}
				else{
					doc = that.document;
				}
				prevPage.$refs.orderAddService.document = doc;
			}
			// 如果是从下单页进来
			else {
				let doc = '';
				if(Array.isArray(that.document)){
					that.document.forEach((item, index) => {
						console.log(item)
						doc += item;
						console.log(doc)
					});
				}
				else{
					doc = that.document;
				}
				prevPage.$vm.$refs.orderItemWriteType.document = doc;
			}
			uni.navigateBack({
				delta: 1
			});
		},
		change() {
			this.document = this.otherReason;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
	padding-bottom: 140rpx;
}
.write-item {
	padding: 0 30rpx 0;
	&:nth-of-type(1) {
		padding-top: 20rpx;
	}
	.write-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.service-list {
		.service-item {
			height: 100rpx;
			.item-grand-child {
				width: 100%;
			}
		}
	}
}
</style>
