<template>
	<uni-popup ref="popupAdd" type="bottom">
		<order-popup-common-bottom title="" @closePop="closePop('popupAdd')">
			<view class="popup-con" slot="popup-con">
				<view class="choose-box flex">
					<view class="choose-item flex1" @click="camera">
						<view class="image-wrapper"><image src="@/static/img/upload-camara.png" mode="aspectFit"></image></view>
						拍照
					</view>
					<view class="choose-item flex1" @click="pickPhoto">
						<view class="image-wrapper"><image src="@/static/img/upload-image.png" mode="aspectFit"></image></view>
						相册
					</view>
					<view class="choose-item flex1" @click="pickFile" v-show="isShowUpFile">
						<view class="image-wrapper"><image src="@/static/img/upload-file.png" mode="aspectFit"></image></view>
						文件
					</view>
				</view>
			</view>
		</order-popup-common-bottom>
	</uni-popup>
</template>


<script>
export default {
	props: [],
	data() {
		return {
			source:[],
			isShowUpFile: true ,//IOS 不能上传文件，不显示此按钮
			sourceFile: [],
			
		};
	},
	onLoad() {
		const nav = navigator.userAgent;
		if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			this.isShowUpFile = false;
		}
	},
	created() {
		// window.fileOk = this.fileOk;
		// window.photoOk = this.photoOk;
		const nav = navigator.userAgent;
		if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			this.isShowUpFile = false;
		}
	},
	methods: {
		//接收文件
		fileOk(res) {
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});
			// this.sourceFile = this.sourceFile.concat(tempList);
			this.$emit('fileResult',tempList)
			uni.hideLoading()
			this.closePop('popupAdd')
		},
		//接收图片
		photoOk(res) {
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});
		
			// this.source = this.source.concat(tempList);
			this.$emit('fileResult',tempList)
			uni.hideLoading()
			this.closePop('popupAdd')
		},
		// 打开摄像头
		camera() {
			const nav = navigator.userAgent;
			
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.camera();
				uni.showLoading({
					title: '上传中'
				})
				this.closePop('popupAdd')
				
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('camera', {}, data => {
					// uni.hideLoading()
					let tempList = this.trimSpace(data);
					// this.source = this.source.concat(tempList);
					this.$emit('fileResult',tempList)
					this.closePop('popupAdd')
				});
			}
		},
		//选择照片
		pickPhoto() {
			// this.$emit('fileResult',[''])
			// uni.hideLoading()
			// this.closePop('popupAdd')
			// return
			const nav = navigator.userAgent;
		
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickPhoto();
				uni.showLoading({
					title: '上传中'
				})
				this.closePop('popupAdd')
				
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickPhoto', {}, data => {
					// uni.hideLoading()
					let tempList = this.trimSpace(data);
					// this.source = this.source.concat(tempList);
					this.$emit('fileResult',tempList)
					this.closePop('popupAdd')
				});
			}
		},
		// 选择文件
		pickFile() {
			const nav = navigator.userAgent;
			
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickFile();
				uni.showLoading({
					title: '上传中'
				})
				this.closePop('popupAdd')
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickFile', {}, data => {
					let tempList = this.trimSpace(data);
					// this.source = this.source.concat(tempList);
					this.$emit('fileResult',tempList)
					uni.hideLoading()
					this.closePop('popupAdd')
				});
			}
		},
		// 去掉数组中的空值
		trimSpace(array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] == '' || array[i] == null || typeof array[i] == 'undefined') {
					array.splice(i, 1);
					i = i - 1;
				}
			}
			return array;
		},
	}
};
</script>

<style lang="scss">
	.choose-box {
		padding: 0 30rpx;
		.choose-item {
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			text-align: center;
	
			.image-wrapper {
				margin: auto;
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
