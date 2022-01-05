<template>
	<view>
		<u-navbar :custom-back="back" title="诉讼案例文件" :background="{ background: '#e02e24' }" title-color="#fff" back-icon-color="#fff" z-index="99999"></u-navbar>
		<u-cell-item v-for="(item, index) in lingyuList" :key="index" @click="topage(item.id, item.area_name)" :title="item.area_name" :value="item.case_number"></u-cell-item>

		<view class="btm">
			<view class="btm-tips">
				<text>上传更多案例，让用户更快委托您</text>
				<text>(请注意保护客户隐私和商业机密)</text>
			</view>
			<u-button :custom-style="customStyle" @click="uploadCase">上传案例</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			customStyle: {
				'background-color': '#e02e24',
				color: '#fff'
			},
			lingyuList: ''
		};
	},
	onLoad() {
		this.indexcase();
	},
	methods: {
		back() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.onBackPress();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('onBackPress', {}, res => {});
			}
		},
		uploadCase() {
			this.jump('/pages/service/suit/upload-case/upload-case');
		},
		// zhian(){
		// 	uni.navigateTo({
		// 		url:'/pages/service/suit/zhian'
		// 	})
		// },
		topage(id, area) {
			uni.navigateTo({
				url: `/pages/service/suit/zhian?id=${id}&area=${area}`
			});
		},
		indexcase() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.indexcase', params).then(res => {
				console.log(res);
				this.lingyuList = res.data;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.btm {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 200rpx;
	z-index: 99;
	.btm-tips {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 50rpx;
		height: 120rpx;
	}
}
</style>
