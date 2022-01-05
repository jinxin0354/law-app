<template>
	<view class="content">
		<view class="service-list">
			<view class="service-item" @click="activeId = item.id" :class="activeId == item.id ? 'active' : ''" v-for="(item, index) in info">{{ item.area_name }}</view>
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
			activeId: -1,
			product_name:''
		};
	},
	onLoad(params) {
		if (params.id) {
			this.activeId = params.id;
			this.init();
		}
		if (params.product_name) {
			this.product_name = params.product_name;
			this.init();
		}
		
	},
	methods: {
		init() {
			let formData = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.serveArea', formData).then(res => {
				this.info = res.data;
			});
		},
		async confirm() {
			let area_name = "";
			let id = "";
			let area_desc = "";
			this.info.forEach((item, index) => {
				if (this.activeId == item.id) {
					area_name = item.area_name;
					id = item.id;
					area_desc = item.area_desc;
				}
			});
			
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2];
			prevPage.$vm.info.product.area.area_name = area_name;
			prevPage.$vm.info.product.area.id = id;
			prevPage.$vm.info.product.area.area_desc = area_desc;
			// 判案 切换服务领域，改变案件阶段和我的身份
			if(this.product_name == '判案'){
				let formData = {
					id: id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.change_area', formData);
				if(res.code == 1){
					prevPage.$vm.meet_stage_list = res.data.meet_stage;
					prevPage.$vm.case_ident_list = res.data.case_ident;
					prevPage.$vm.meet_stage = res.data.meet_stage[0].value_name;
					prevPage.$vm.case_ident = res.data.case_ident[0].value_name;
				}
			}
			uni.navigateBack({
				delta: 1
			});
			
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.service-list {
	padding: 30rpx;
}
</style>
