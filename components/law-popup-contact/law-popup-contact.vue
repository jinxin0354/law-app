<template>
	<view>
		<view class="contact" @click="downLoad">
			点击下载债券投资合同
		</view>
		
		<web-view :src="info"></web-view>
	</view>

</template>

<script>
export default {
	props: {},
	data() {
		return {
			info: {}
		};
	},
	async created() {
		let formDataContract = {
			token: uni.getStorageSync('token')
		};
		let resContract = await this.$api('index.contract', formDataContract);
		this.info = resContract.data;
		console.log(this.info)
	},
	methods: {
		// TODO下载保存
		downLoad() {
			// uni.downloadFile({
			// 	url: this.info,
			// 	success: res => {
			// 		console.log(res);
			// 		uni.openDocument({
			// 			filePath: res.tempFilePath,
			// 			success: function(res) {
			// 				console.log('打开文档成功');
			// 			}
			// 		});
			// 	}
			// });
		}
	}
};
</script>

<style lang="scss">
	.contact{
		padding: 30rpx;
	}
	
</style>
