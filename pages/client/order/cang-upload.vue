<template>
	<view class="content">
		<view class="step-box">
			<view class="step-item">
				<view class="item-txt">第一步：添加模板标题</view>
				<input class="ipt-border" type="text" placeholder="请输入模板标题" v-model="title" />
			</view>
			<view class="step-item" @click="pickPhoto">
				<view class="item-txt">
					<view class="txt-title">第二步：上传图片版</view>
					<view class="txt-right" @click.stop="jump('/pages/client/order/datum-preview', { title: title, source: JSON.stringify(source) })" v-if="title && source.length > 0">
						<view class="preview-txt">预览效果</view>
						<image src="@/static/img/preview.png" class="preview-arrow" mode="widthFix"></image>
					</view>
				</view>
				<view class="item-up">
					<view class="up-left">
						<view class="up-title">上传图片版</view>
						<view class="up-tip">请先将文档模板每一页截图，然后再上传</view>
					</view>
					<view class="up-right" style="padding: 40rpx;"><image src="@/static/img/cang-up1.png" mode="widthFix"></image></view>
				</view>
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in source" :key="index" @click="previewImage(item)">
					<!-- 显示图片 -->
					<view class="item-img" v-if="getFileType(item.name) == 'image'">
						<view class="image-wrapper"><image :src="item.url" mode="aspectFit"></image></view>
					</view>
					<!-- 关闭 -->
					<view
						class="item-close"
						@click.stop="
							currentIndex = index;
							deleteType = 1;
							$refs.popupDeleteFile.open();
						"
						v-if="!readOnly"
					>
						<view class="image-wrapper"><image src="@/static/img/upload-close.png" mode="aspectFit"></image></view>
					</view>
				</view>
			</view>
			<view class="step-item" @click="pickFile" v-show="isShowUpFile">
				<view class="item-txt">第三步：上传文档版</view>
				<view class="item-up" style="background-color: #FF9437 ;">
					<view class="up-left">
						<view class="up-title">上传文档版</view>
						<view class="up-tip">选择文档，直接上传</view>
					</view>
					<view class="up-right" style="background-color: #FF7C22 ;"><image src="@/static/img/cang-up2.png" mode="widthFix"></image></view>
				</view>
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in sourceFile" :key="index" @click="previewImage(item)">
					<!-- 显示文件 -->
					<view class="item-img">
						<view class="item-icon">
							<view class="image-wrapper">
								<image v-if="getFileType(item.name) == 'excel'" src="@/static/img/upload-excel.png" mode="aspectFit"></image>
								<image v-else-if="getFileType(item.name) == 'word'" src="@/static/img/upload-word.png" mode="aspectFit"></image>
								<image v-else-if="getFileType(item.name) == 'ppt'" src="@/static/img/upload-ppt.png" mode="aspectFit"></image>
								<image v-else="getFileType(item.name) == 'other'" src="@/static/img/upload-other.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="item-name text-ellipsis">{{ item.name }}</view>
					</view>
					<!-- 关闭 -->
					<view
						class="item-close"
						@click.stop="
							currentIndex = index;
							deleteType = 2;
							$refs.popupDeleteFile.open();
						"
						v-if="!readOnly"
					>
						<view class="image-wrapper"><image src="@/static/img/upload-close.png" mode="aspectFit"></image></view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-box" v-if="!readOnly">
			<view class="ok-box"><button type="default" class="ok-btn" @click="toUpload(true)" :disabled="!title || source.length == 0">我要上传</button></view>
		</view>
		<!-- 是否上传弹出层 -->
		<uni-popup ref="popupUpload" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="退出后无法保存已上传的资料，您确认退出吗"
				:before-close="true"
				@confirm="confirmUpload(true)"
				@close="confirmUpload(false)"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 确认要删除 -->
		<uni-popup ref="popupDeleteFile" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="确认删除"
				:before-close="true"
				@confirm="confirmDeleteFile()"
				@close="$refs.popupDeleteFile.close()"
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
			source: [],
			sourceFile: [],
			readOnly: false,
			isShowUpFile: true, //IOS 不能上传文件，不显示此按钮
			title: '',
			deleteType: 0,
			currentIndex: -1
		};
	},
	onBackPress(e) {
		if (e.from == 'backbutton' && this.source.length > 0 && this.readOnly == false) {
			this.$refs.popupUpload.open();
			return true;
		}
	},
	created() {
		window.fileOk = this.fileOk;
		window.photoOk = this.photoOk;
	},
	onLoad(params) {
		console.log(params)
		if (params.source) {
			if (params.readOnly) {
				this.readOnly = true;
			} else {
				this.readOnly = false;
			}
			this.source = JSON.parse(params.source);
		}
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
			this.sourceFile = this.sourceFile.concat(tempList);
		},
		//接收图片
		photoOk(res) {
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});

			this.source = this.source.concat(tempList);
		},
		//选择照片
		pickPhoto() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickPhoto();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickPhoto', {}, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
		// 选择文件
		pickFile() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickFile();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickFile', {}, data => {
					let tempList = this.trimSpace(data);
					this.sourceFile = this.sourceFile.concat(tempList);
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
		confirmDeleteFile() {
			if (this.deleteType == 1) {
				this.$delete(this.source, this.currentIndex);
			} else if (this.deleteType == 2) {
				this.$delete(this.sourceFile, this.currentIndex);
			}
			this.$refs.popupDeleteFile.close();
		},
		async confirmUpload(isOut) {
			this.$refs.popupUpload.close();
			if (isOut) {
				// let formData = {
				// 	token: uni.getStorageSync('token'),
				// 	images: JSON.stringify(this.source),
				// 	url: JSON.stringify(this.sourceFile),
				// 	title: this.title
				// };
				// let res = await this.$api('shelf.addShelf', formData);
				// if (res.code == 1) {
				// 	uni.showToast({
				// 		title: res.msg,
				// 		icon: 'none'
				// 	});
				// 	this.$refs.popupUpload.close();
				// 	uni.navigateBack({
				// 		delta: 1
				// 	});
				// }
				uni.navigateBack({
					delta: 1
				});
			}
		},
		async toUpload(isOut) {
			this.$refs.popupUpload.close();
			if (isOut) {
				let formData = {
					token: uni.getStorageSync('token'),
					images: JSON.stringify(this.source),
					url: JSON.stringify(this.sourceFile),
					title: this.title
				};
				let res = await this.$api('shelf.addShelf', formData);
				if (res.code == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					this.$refs.popupUpload.close();
					uni.navigateBack({
						delta: 1
					});
				}
				uni.navigateBack({
					delta: 1
				});
			}
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
				// 预览图片
				this.previewImages(previewImages);
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 160rpx;
}
.upload-box {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30rpx;
	box-sizing: border-box;
	.upload-item {
		height: 200rpx;
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
			padding-top: 50rpx;
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
			padding: 80rpx 20rpx 0;
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
	width: 100%;
	z-index: 11;
	background-color: #fff;
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
.step-box {
	.step-item {
		padding: 30rpx 30rpx 0;
		.item-txt {
			margin-bottom: 20rpx;
			display: flex;
			.txt-title {
				flex: 1;
			}
			.txt-right {
				display: flex;
				align-items: center;
				color: #06b4fd;
				.preview-txt {
					margin-right: 10rpx;
				}
				.preview-arrow {
					width: 16rpx;
				}
			}
		}
		.ipt-border {
			padding-top: 14rpx;
			padding-bottom: 14rpx;
		}
		.item-up {
			margin-bottom: 20rpx;
			display: flex;
			background-color: #50a8fe;
			padding: 30rpx;
			border-radius: 26rpx;
			align-items: center;
			.up-left {
				flex: 1;
				color: #ffffff;
				.up-title {
					font-size: 34rpx;
					margin-bottom: 20rpx;
				}
				.up-tip {
					font-size: 20rpx;
				}
			}
			.up-right {
				display: flex;
				align-items: center;
				padding: 30rpx;
				width: 190rpx;
				height: 190rpx;
				border-radius: 50%;
				background-color: #2894fe;
				image {
					width: 100%;
				}
			}
		}
	}
}
</style>
