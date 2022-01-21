<template>
	<view class="content">
		<view class="od-box">
			<view class="od-item marginbottom20">
				<view class="item-tip">开票人</view>
				<view class="item-right">
					<view class="service-list">
						<view class="service-item marginbottom0" :class="send_type == 1 ? 'active' : ''" @click="send_type = 1">律师</view>
						<view v-if="isInvestor" class="service-item marginbottom0" :class="send_type == 2 ? 'active' : ''" @click="send_type = 2">投资人</view>
					</view>
				</view>
			</view>
			<view class="od-item marginbottom20">
				<view class="item-tip require">开票金额</view>
				<view class="item-right"><input class="ipt-border" type="number" placeholder="请输入" v-model="money" /></view>
			</view>
			<view class="od-item">
				<view class="item-tip require">发票抬头</view>
				<view class="item-right">
					<view class="invoice-add-btn" @click="jump('/pages/client/user/invoice-add')">
						<image src="@/static/img/invoice-add.png" mode="widthFix"></image>
						添加新抬头</view>
				</view>
			</view>
		</view>

		<radio-group @change="radioChange">
			<view class="od-box" v-for="(item, index) in info" :key="item.id">
				<view class="operate-item">
					<label class="item-radio"><radio color="#FFC801" style="transform:scale(0.8)" :value="item.id.toString()" :checked="index == 0 ? true : false" />
					</label>
					<view class="item-edit" @click="jump('/pages/client/user/invoice-add', { id: item.id })">
						<view class="image-wrapper"><image src="@/static/img/edit.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">抬头类型</view>
					<view class="item-right">
						<view class="item-txt" v-if="item.type == 1">企业</view>
						<view class="item-txt" v-else>个人及政府单位</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">名称</view>
					<view class="item-right">
						<view class="item-txt">{{ item.name }}</view>
					</view>
				</view>
				<template v-if="item.type == 1">
					<view class="od-item">
						<view class="item-tip">税号</view>
						<view class="item-right">
							<view class="item-txt">{{ item.tax }}</view>
						</view>
					</view>
					<view class="od-item" v-if="item.address != '' && item.address != null">
						<view class="item-tip">公司地址</view>
						<view class="item-right">
							<view class="item-txt">{{ item.address }}</view>
						</view>
					</view>
					<view class="od-item" v-if="item.tel != '' && item.tel != null">
						<view class="item-tip">电话号码</view>
						<view class="item-right">
							<view class="item-txt">{{ item.tel }}</view>
						</view>
					</view>
					<view class="od-item" v-if="item.bank != ''  && item.bank != null">
						<view class="item-tip">开户银行</view>
						<view class="item-right">
							<view class="item-txt">{{ item.bank }}</view>
						</view>
					</view>
					<view class="od-item" v-if="item.bank_account != '' && item.bank_account != null">
						<view class="item-tip">银行账户</view>
						<view class="item-right">
							<view class="item-txt">{{ item.bank_account }}</view>
						</view>
					</view>
				</template>
				<view class="od-item">
					<view class="item-tip">邮寄地址</view>
					<view class="item-right">
						<view class="item-txt">{{ item.province + item.city + item.country }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">详细地址</view>
					<view class="item-right">
						<view class="item-txt">{{ item.send_address }}</view>
						<view class="item-delete" @click="deleteInvoice(item)" v-if="item.type == 2">
							<view class="image-wrapper"><image src="@/static/img/delete.png" mode="aspectFit"></image></view>
						</view>
					</view>
				</view>
				<template v-if="item.type == 1">
					<view class="od-item">
						<view class="item-tip">收件人</view>
						<view class="item-right">
							<view class="item-txt">{{ item.consignee }}</view>
						</view>
					</view>
					<view class="od-item">
						<view class="item-tip">联系电话</view>
						<view class="item-right">
							<view class="item-txt">{{ item.phone }}</view>
							<view class="item-delete" @click="deleteInvoice(item)">
								<view class="image-wrapper"><image src="@/static/img/delete.png" mode="aspectFit"></image></view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</radio-group>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">我要开票</button></view>
		<!-- 弹出层 -->
		<uni-popup ref="popupOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="要删除此发票抬头吗？"
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
			current_id: '',
			send_type: 1,
			isInvestor: false, //是否为投资人支付的开发票
			money: '' //开票金额
		};
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
			let res = await this.$api('index.receipt', formData);
			this.info = res.data;
			if (this.info.length > 0) {
				this.current_id = this.info[0].id;
			}
		},
		async confirm() {
			if (!this.money) {
				uni.showToast({
					title: '请输入开票金额',
					icon: 'none'
				});
				return;
			}

			let formData = {
				token: uni.getStorageSync('token'),
				id: this.current_id,
				order_id: this.order_id,
				send_type: this.send_type,
				money: this.money
			};
			let res = await this.$api('index.open_receipt', formData);
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
			let res = await this.$api('index.del_receipt', formData);
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
.invoice-add-btn{
	background: $uni-color-primary;
	color: #FFFFFF;
	border-radius: 10rpx;
	line-height: 60rpx;
	padding: 0 10rpx;
	display: flex;
	align-items: center;
	margin-left: auto;
	image{
		width: 30rpx;
		margin-right: 10rpx;
	}
}
.item-tip{
	margin-top: 13rpx;
}
</style>
