<template>
	<view class="od-item marginbottom20">
		<view class="item-tip require">文书类型</view>
		<view class="item-right" @click="openType">
			<view class="service-list inline-list">
				<view class="service-item active flex1" style="margin-right: 0;">{{ document }}</view>
			</view>
			<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			document: '',
			area_name: '',
			infoWriteType: []
		};
	},
	created() {
		this.area_name = this.info.product.area.area_name;
		this.document = this.info.product.document;
		this.$bus.$on('changeDesc', res => {
			this.area_name = res.area_name;
			// 改变服务领域，获取document的第一个值
			this.initWriteType();
		});
	},
	methods: {
		async initWriteType() {
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
			this.infoWriteType = arr;
			this.document = this.infoWriteType[0].children[0].document[0];
		},
		openType() {
			let params = {
				document: this.document,
				area_name: this.area_name
			};
			this.jump('/pages/client/order/write-type', params);
		}
	}
};
</script>

<style lang="scss"></style>
