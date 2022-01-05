<template>
	<view class="content">
		<radio-group @change="radioChange">
			<view class="od-box" v-for="(item, index) in info" :key="item.id">
				<view class="operate-item">
					<label class="item-radio"><radio color="#FFC801" style="transform:scale(0.8)" :value="item.id.toString()" :checked="index == 0 ? true : false" /></label>
					<view class="item-edit" @click="jump('/pages/investor/user/inboxMessages-add', { id: item.id })">
						<view class="image-wrapper"><image src="@/static/img/edit.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">名称</view>
					<view class="item-right">
						<view class="item-txt">{{ item.name }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">邮寄地址</view>
					<view class="item-right">
						<view class="item-txt">{{ item.province + item.city + item.country }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">详细地址</view>
					<view class="item-right">
						<view class="item-txt">{{ item.address }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">联系电话</view>
					<view class="item-right">
						<view class="item-txt">{{ item.tel }}</view>
						<view class="item-delete" @click="deleteInvoice(item)">
							<view class="image-wrapper"><image src="@/static/img/delete.png" mode="aspectFit"></image></view>
						</view>
					</view>
				</view>
			</view>
		</radio-group>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">确定</button></view>
		<!-- 弹出层 -->
		<uni-popup ref="popupOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="要删除此收件信息吗？"
				:before-close="true"
				@confirm="confirmDelete"
				@close="$refs.popupOk.close()"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: [],
			order_id: '',
			current_id: ''
		};
	},
	onNavigationBarButtonTap(e) {
		this.jump('/pages/investor/user/inboxMessages-add');
	},
	onLoad(params) {
		if (params.isInvestor) {
			this.isInvestor = params.isInvestor;
		}
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.investor', formData);
			this.info = res.data;
			if (this.info.length > 0) {
				this.current_id = this.info[0].id;
			}
		},
		async confirm() {
			let formData = {
				token: uni.getStorageSync('token'),
				investor_addr: this.current_id,
				id: this.order_id
			};
			let res = await this.$api('index.investor_addr', formData);
			if (res.code == 1) {
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				prePage.$vm.init();
				uni.navigateBack({
					delta: 1
				});
			}
		},
		radioChange(e) {
			this.current_id = e.detail.value;
		},
		deleteInvoice(item) {
			this.$refs.popupOk.open();
			this.delete_id = item.id;
		},
		async confirmDelete() {
			let formData = {
				id: this.delete_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.del_investor', formData);
			if (res.code == 1) {
				this.init();
				this.$refs.popupOk.close();
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-top: 30rpx;
	padding-bottom: 140rpx;
}
.od-box {
	margin: 0 30rpx 30rpx;
	.operate-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.item-radio {
			width: 100rpx;
		}
		.item-edit {
			width: 100rpx;
			.image-wrapper {
				width: 35rpx;
				height: 35rpx;
				float: right;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
.add-box {
	padding: 30rpx;
	.add_btn {
		border: 1rpx dashed #0084ff;
		color: #0084ff;
		font-size: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
}
.item-delete {
	.image-wrapper {
		width: 35rpx;
		height: 35rpx;
		image {
			vertical-align: middle;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
