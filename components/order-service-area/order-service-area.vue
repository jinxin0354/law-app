<template>
	<uni-popup ref="popupChooseServiceArea" type="bottom">
		<order-popup-common-bottom title="选择服务领域" @closePop="closePop('popupChooseServiceArea')">
			<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
				<view class="service-list">
					<view class="service-item" @click="activeId = item.id" :class="activeId == item.id ? 'active' : ''" v-for="(item, index) in infoSeverArea">{{ item.area_name }}</view>
				</view>
			</scroll-view>
			<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="confirm">确定</button></view>
		</order-popup-common-bottom>
	</uni-popup>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			infoSeverArea: [],
			activeId: '',
			product_name: ''
		};
	},
	created() {
		this.activeId = this.info.product.area.id;
		this.product_name = this.info.product.product;
		this.init();
	},
	methods: {
		init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.serveArea', formData).then(res => {
				this.infoSeverArea = res.data;
			});
		},
		async confirm() {
			this.$refs.popupChooseServiceArea.close();
			let current_area = '';
			this.infoSeverArea.forEach((item, index) => {
				if (this.activeId == item.id) {
					current_area = item;
				}
			});
			this.$emit('confirm', current_area);
		}
	}
};
</script>

<style lang="scss">
.service-list {
	padding: 0 30rpx;
}
.od-box .od-item .service-list .service-item {
	margin-bottom: 20rpx !important;
}
</style>
