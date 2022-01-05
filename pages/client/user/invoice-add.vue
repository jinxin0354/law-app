<template>
	<view class="content">
		<view class="tip-box">如需开具增值税专用发票，需全部填写</view>
		<view class="od-box">
			<view class="od-item">
				<view class="item-tip require">抬头类型</view>
				<view class="item-right">
					<radio-group @change="radioChange">
						<label class="marginright10">
							<radio style="transform: scale(0.8);" color="#FFC801" value="1" :checked="info.type == 1 ? true : false" />
							<text>企业</text>
						</label>
						<label>
							<radio style="transform: scale(0.8);" color="#FFC801" value="2" :checked="info.type == 2 ? true : false" />
							<text>个人及政府单位</text>
						</label>
					</radio-group>
				</view>
			</view>

			<view class="od-item">
				<view class="item-tip require">名称</view>
				<view class="item-right">
					<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.name" /></view>
				</view>
			</view>
			<template v-if="info.type == 1">
				<view class="od-item">
					<view class="item-tip require">税号</view>
					<view class="item-right">
						<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.tax" /></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">公司地址</view>
					<view class="item-right">
						<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.address" /></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">电话号码</view>
					<view class="item-right">
						<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.tel" /></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">开户银行</view>
					<view class="item-right" @click="showBank = true">
						<view class="item-txt" v-if="info.bank">{{ info.bank }}</view>
						<view class="item-txt gray" v-else>请选择</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">银行账户</view>
					<view class="item-right">
						<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.bank_account" /></view>
					</view>
				</view>
			</template>
			<view class="od-item">
				<view class="item-tip require">邮寄地址</view>
				<view class="item-right" @click="showArea = true">
					<view class="item-txt" v-if="info.province_name">{{ info.province_name + info.city_name + info.country_name }}</view>
					<view class="item-txt gray" v-else>请选择</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip require">详细地址</view>
				<view class="item-right">
					<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.send_address" /></view>
				</view>
			</view>
			<template v-if="info.type == 1">
				<view class="od-item">
					<view class="item-tip require">收件人</view>
					<view class="item-right">
						<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.consignee" /></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip require">联系电话</view>
					<view class="item-right">
						<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.phone" /></view>
					</view>
				</view>
			</template>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">保存</button></view>
		<u-picker mode="selector" v-model="showBank" :range="bankList" confirm-color="#FFC801" @confirm="bankConfirm"></u-picker>
		<u-picker
			v-if="info.province_name"
			mode="region"
			v-model="showArea"
			:params="params"
			:default-region="[info.province_name, info.city_name, info.country_name]"
			confirm-color="#FFC801"
			@confirm="regionConfirm"
		></u-picker>
		<u-picker v-else mode="region" v-model="showArea" :params="params" :default-region="['广东省', '深圳市', '罗湖区']" confirm-color="#FFC801" @confirm="regionConfirm"></u-picker>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			showArea: false,
			params: {
				//选择地区配置显示省市区
				province: true,
				city: true,
				area: true
			},
			showBank: false,
			bankList: ['中国银行', '工商银行', '浦发银行'],
			info: { type: 1 }
		};
	},
	onLoad(params) {
		if (params.id) {
			this.id = params.id;
			this.init();
			uni.setNavigationBarTitle({
				title: '编辑抬头'
			});
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.receiptDetail', formData);
			if (res.code == 1) {
				this.info = res.data;
			}
		},
		radioChange(e) {
			this.info.type = e.detail.value;
		},
		async confirm() {
			if (!this.info.name) {
				uni.showToast({
					icon: 'none',
					title: '请输入名称'
				});
				return;
			}
			if (!this.info.city_name) {
				uni.showToast({
					icon: 'none',
					title: '请选择邮寄地址'
				});
				return;
			}
			if (!this.info.send_address) {
				uni.showToast({
					icon: 'none',
					title: '请输入详细地址'
				});
				return;
			}
			if (this.info.type == 1) {
				if (!this.info.tax) {
					uni.showToast({
						icon: 'none',
						title: '请输入税号'
					});
					return;
				}
				if (!this.info.consignee) {
					uni.showToast({
						icon: 'none',
						title: '请输入收件人'
					});
					return;
				}
				if (!this.info.phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入电话'
					});
					return;
				}
			}

			let formData = {
				token: uni.getStorageSync('token'),
				type: this.info.type,
				name: this.info.name,
				tax: this.info.tax,
				province: this.info.province_name,
				city: this.info.city_name,
				country: this.info.country_name,
				address: this.info.address,
				tel: this.info.tel,
				bank: this.info.bank,
				bank_account: this.info.bank_account,
				send_address: this.info.send_address,
				consignee: this.info.consignee,
				phone: this.info.phone
			};
			if (this.id) {
				formData = { ...formData, id: this.id };
			}
			let res = await this.$api('index.add_receipt', formData);
			if (res.code == 1) {
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				prePage.$vm.init();
				uni.navigateBack({
					delta: 1
				});
			}
		},
		regionConfirm(e) {
			this.info.province_name = e.province.label;
			this.info.city_name = e.city.label;
			this.info.country_name = e.area.label;
		},
		bankConfirm(e) {
			this.info.bank = this.bankList[e[0]];
		}
	}
};
</script>

<style lang="scss">
.od-item {
	margin-bottom: 10rpx;
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
.tip-box {
	padding: 20rpx 30rpx;
}
</style>
