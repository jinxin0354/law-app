<!-- 打官司资料上传独立使用 -->
<template>
	<view class="content">
		<view class="upload-box">
			<view class="upload-item" v-for="(item, index) in source" :key="index" @click="previewImage(item)">
				<!-- 显示图片 -->
				<view class="item-img" v-if="getFileType(item.name) == 'image'">
					<view class="image-wrapper"><image :src="item.url" mode="aspectFit"></image></view>
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

			<view class="upload-item" @click="$refs.popupAdd.open()" v-if="!readOnly">
				<view class="item-add">
					<view class="image-wrapper"><image src="@/static/img/upload-add.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		<view class="bottom-box" v-if="!readOnly">
			<view class="bottom-tip">
				亲爱的上帝，为避免影响律师的分析判断：
				<br />
				1. 请拍摄文件时：拍清晰，拍完整，拍方正；
				<br />
				2.从微信下载文件时，请先查看原图，再下载清晰的图片。
				<br />
				3.欠款方的身份证正反面/姓名、身份证号码   
				<br />
				4.确认欠款金额的聊天内容（微信/支付宝/录音/录像/短信）
				<br />
				5.催收的聊天内容（微信/支付宝/录音/录像/短信）
				<br />
				6.借条/欠条/还款承诺书/对帐单等文书 
				<br />
				7.您认为有用的其他材料
				<br />
			</view>
			<view class="ok-box"><button type="default" class="ok-btn" @click="confirmUpload(true)">确定</button></view>
		</view>
		<!-- 加号弹出层 -->
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
		<!-- 是否上传弹出层 -->
		<uni-popup ref="popupUpload" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="保存已上传的资料"
				:before-close="true"
				@confirm="confirmUpload(true)"
				@close="confirmUpload(false)"
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
			readOnly: false,
			isShowUpFile: true ,//IOS 不能上传文件，不显示此按钮
			fali_source:''
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
		window.sourceOk = this.sourceOk;
	},
	onLoad(params) {
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
		sourceOk(res) {
			this.fali_source = res;
		},
		//接收文件
		fileOk(res) {
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});
			this.source = this.source.concat(tempList);
		},
		//接收图片
		photoOk(res) {
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});

			this.source = this.source.concat(tempList);
		},
		// 打开摄像头
		camera() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.camera();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('camera', {}, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
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
					this.source = this.source.concat(tempList);
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
		closeFile(index) {
			this.$delete(this.source, index);
		},
		confirmUpload(isSave) {
			this.$refs.popupUpload.close();
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2];
			if (isSave) {
				prevPage.$vm.source = this.source;
				prevPage.$vm.fali_source = this.fali_source;
			}
			uni.navigateBack({
				delta: 1
			});
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
		}
	}
};
</script>

<style lang="scss">
.upload-box {
	display: flex;
	flex-wrap: wrap;
	padding: 30rpx;
	box-sizing: border-box;
	padding-bottom: 320rpx;
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
