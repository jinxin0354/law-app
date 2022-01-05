<template>
	<view class="content">
		<view class="od-box">
			<view class="od-item">
				<view class="item-tip require">名称</view>
				<view class="item-right">
					<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.name" /></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip require">邮寄地址</view>
				<view class="item-right" @click="showArea = true">
					<view class="item-txt">
						<view class="item-txt" v-if="info.province">{{ info.province + info.city + info.country }}</view>
						<view class="item-txt gray" v-else>请选择</view>
					</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip require">详细地址</view>
				<view class="item-right">
					<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.address" /></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip require">联系电话</view>
				<view class="item-right">
					<view class="item-txt"><input class="ipt" type="text" value="" placeholder="请输入" placeholder-class="placeholder" v-model="info.tel" /></view>
				</view>
			</view>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">保存</button></view>
		<u-picker
			v-if="info.province_name"
			mode="region"
			v-model="showArea"
			:params="params"
			:default-region="[info.province, info.city, info.country]"
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
			info: {}
		};
	},
	onLoad(params) {
		if (params.id) {
			this.id = params.id;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.investor_address', formData);
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
			if (!this.info.city) {
				uni.showToast({
					icon: 'none',
					title: '请选择邮寄地址'
				});
				return;
			}
			if (!this.info.address) {
				uni.showToast({
					icon: 'none',
					title: '请输入详细地址'
				});
				return;
			}
			if (!this.info.tel) {
				uni.showToast({
					icon: 'none',
					title: '请输入电话'
				});
				return;
			}

			let formData = {
				token: uni.getStorageSync('token'),
				name: this.info.name,
				province: this.info.province,
				city: this.info.city,
				country: this.info.country,
				address: this.info.address,
				tel: this.info.tel,
			};
			if (this.id) {
				formData = { ...formData, id: this.id };
			}
			let res = await this.$api('index.add_investor', formData);
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
			this.info.province = e.province.label;
			this.info.city = e.city.label;
			this.info.country = e.area.label;
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
.marginright10 {
	margin-right: 10rpx;
}
</style>
