<template>
	<view class="flex flex-horizontal flex-wrap upload-box" style="margin-top: 10px;">
		<view class="upload-item" v-for="(item, index) in list" :key="index" @click="previewImage(item)">
			<!-- 显示图片 -->
			<view class="item-img" v-if="getFileType(item.name) == 'image'">
				<view class="image-wrapper"><image :src="item.url" mode="aspectFill"></image></view>
			</view>
			<!-- 显示其他 -->
			<template v-else>
				<view class="item-icon">
					<view class="image-wrapper">
						<image v-if="getFileType(item.name) == 'excel'" src="@/static/img/upload-excel.png" mode="aspectFit"></image>
						<image v-else-if="getFileType(item.name) == 'word'" src="@/static/img/upload-word.png" mode="aspectFit"></image>
						<image v-else-if="getFileType(item.name) == 'ppt'" src="@/static/img/upload-ppt.png" mode="aspectFit"></image>
						<image v-else="getFileType(item.name) == 'other'" src="@/static/img/upload-other.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="item-name text-ellipsis">{{ item.name }}</view>
			</template>
			<!-- 关闭 -->
			<view class="item-close" @click="closeFile(index)" v-if="!readOnly">
				<view class="image-wrapper"><image src="@/static/img/upload-close.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<view class="upload-item">
			<image @click="addPhoto" src="@/static/img/icon/icon_upload.png" mode="aspectFit" class="item-img"></image>
		</view>
		<order-upload ref="uploadAdd" @fileResult="fileResult"></order-upload>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: ["list",'readOnly'],
		methods: {
			addPhoto() {
				// let list = this.list.concat({name:"word"})
				// this.$emit('change',list)
				
				this.$emit('click')
				this.$refs.uploadAdd.$refs.popupAdd.open()
			},
			fileResult(e) {
				console.log('fileResult',e);
				let list = this.list.concat(e)
				this.$emit('change',list)
			},
			closeFile(index) {
				let list = this.list 
				this.$delete(list, index);
				this.$emit('change',list)
			},
			previewImage(item) {
				if (this.getFileType(item.name) != 'image') {
					// 是文档,下载
					const nav = navigator.userAgent;
					if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
						phone.loadOffice(item.url);
					} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						this.$bridge.callhandler('loadOffice', item.url, data => {});
					}
				} else {
					// 是图片,预览
					let previewImages = [];
					this.source.forEach((item, index) => {
						if (this.getFileType(item.name) == 'image') {
							previewImages.push(item.url);
						}
					});
					uni.previewImage({
						urls: previewImages,
						current: item.url
					});
				}
			},
			getFileType(fileName) {
				// 后缀获取
				let suffix = '';
				// 获取类型结果
				let result = '';
				try {
					const flieArr = fileName.split('.');
					suffix = flieArr[flieArr.length - 1];
				} catch (err) {
					suffix = '';
				}
				// fileName无后缀返回 false
				if (!suffix) {
					return false;
				}
				suffix = suffix.toLocaleLowerCase();
				// 图片格式
				const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
				// 进行图片匹配
				result = imglist.find(item => item === suffix);
				if (result) {
					return 'image';
				}
				// 匹配txt
				const txtlist = ['txt'];
				result = txtlist.find(item => item === suffix);
				if (result) {
					return 'txt';
				}
				// 匹配 excel
				const excelist = ['xls', 'xlsx'];
				result = excelist.find(item => item === suffix);
				if (result) {
					return 'excel';
				}
				// 匹配 word
				const wordlist = ['doc', 'docx'];
				result = wordlist.find(item => item === suffix);
				if (result) {
					return 'word';
				}
				// 匹配 pdf
				const pdflist = ['pdf'];
				result = pdflist.find(item => item === suffix);
				if (result) {
					return 'pdf';
				}
				// 匹配 ppt
				const pptlist = ['ppt', 'pptx'];
				result = pptlist.find(item => item === suffix);
				if (result) {
					return 'ppt';
				}
				// 匹配 视频
				const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
				result = videolist.find(item => item === suffix);
				if (result) {
					return 'video';
				}
				// 匹配 音频
				const radiolist = ['mp3', 'wav', 'wmv'];
				result = radiolist.find(item => item === suffix);
				if (result) {
					return 'radio';
				}
				// 其他 文件类型
				return 'other';
			},
		}
	}
</script>


<style lang="scss">
.upload-box {
	.upload-item {
		height: 66px;
		// height: calc((100% - 40rpx) / 3);
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		margin-right: 20rpx;
		width: calc((100% - 40rpx) / 3);
		position: relative;
		margin-bottom: 20rpx;
		&:nth-of-type(3n) {
			margin-right: 0;
		}
		.item-icon {
			height: 89rpx;
			// padding-top: 50rpx;
			padding-top: 10rpx;
			.image-wrapper {
				width: 67rpx;
				height: 89rpx;
				margin: auto;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.item-name {
			// padding: 80rpx 20rpx 0;
			padding: 10rpx 20rpx 0;
			text-align: center;
			font-size: 28rpx;
		}
		.item-close {
			position: absolute;
			right: 0;
			top: 0;
			padding: 15rpx;
			z-index: 10;
			.image-wrapper {
				width: 30rpx;
				height: 30rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.item-add {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.image-wrapper {
				width: 53rpx;
				height: 53rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.item-img {
			width: 100%;
			height: 100%;
			.image-wrapper {
				width: 100%;
				height: 100%;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
.bottom-box {
	z-index: 11;
	background-color: #f6f6f6;
	position: fixed;
	bottom: 0;
	.bottom-tip {
		color: #f00;
		font-size: 26rpx;
		padding: 30rpx 30rpx 0;
		line-height: 60rpx;
	}
	.ok-box {
		background-color: transparent;
	}
}
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