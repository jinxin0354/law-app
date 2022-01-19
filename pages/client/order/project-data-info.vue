<template>
	<view class="content">
		<view class="module-box" v-if="card_images != '[]' && card_images != ''">
			<view class="module-title-box">
				欠款方的身份证正反面/姓名、身份证号码
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in card_images" :key="index" @click="previewImage(item,1)">
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
				</view>
			</view>
		</view>
		<view class="module-box"  v-if="liaotian_images != '[]' && liaotian_images != ''">
			<view class="module-title-box">
				确认欠款金额的聊天内容（微信/支付宝/录音/录像/短信）
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in liaotian_images" :key="index" @click="previewImage(item,2)">
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
				</view>
			</view>
		</view>
		<view class="module-box" v-if="jietiao_images != '[]' && jietiao_images != ''">
			<view class="module-title-box">
				 借条/欠条/还款承诺书/对账单等文书
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in jietiao_images" :key="index" @click="previewImage(item,3)">
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
				</view>
			</view>
		</view>
		<view class="module-box" v-if="cuishou_images != '[]' && cuishou_images != ''">
			<view class="module-title-box">
				 催收的聊天内容(微信/支付宝/录音/录像/短信)
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in cuishou_images" :key="index" @click="previewImage(item,4)">
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
				</view>
			</view>
		</view>
		<view class="module-box" v-if="type == 1 && huan_images != '[]' && huan_images != ''" >
			<view class="module-title-box">
				 还款记录(包括每次还款金额和还款时间) 
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in huan_images" :key="index" @click="previewImage(item,5)">
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
				</view>
			</view>
		</view>
		<view class="module-box" v-if="other_images != '[]' && other_images != ''">
			<view class="module-title-box">
				 您认为有用的其他有用材料
			</view>
			<view class="upload-box">
				<view class="upload-item" v-for="(item, index) in other_images" :key="index" @click="previewImage(item,6)">
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
				</view>
			</view>
		</view>
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:1,
				type:1,//投资人支付1  自费2
                isShowUpFile: true ,//IOS 不能上传文件，不显示此按钮
				card_images:[],//欠款方身份证正反面/姓名 身份证号
				liaotian_images:[],//确认欠款金额的聊天截图内容
				jietiao_images:[],//借条/欠条/还款承诺书/对账单等文书
				cuishou_images:[],//催收的聊天内容(微信/支付宝/录音/录像)
				huan_images:[],//还款记录(包括每次还款金额和还款时间) 
				other_images:[],//您认为有用的其他有用材料
			}
		},
		onLoad(params){
			this.type = params.type
			if (params.card_images) {
				this.card_images = JSON.parse(params.card_images);
			}else{
				this.card_images = []
			}
			console.log(this.card_images,'--------')
			if (params.liaotian_images) {
				this.liaotian_images = JSON.parse(params.liaotian_images);
			}else{
				this.liaotian_images = []
			}
			if (params.jietiao_images) {
				this.jietiao_images = JSON.parse(params.jietiao_images);
			}else{
				this.jietiao_images = []
			}
			if (params.cuishou_images) {
				this.cuishou_images = JSON.parse(params.cuishou_images);
			}else{
				this.cuishou_images = []
			}
			if (params.huan_images) {
				this.huan_images = JSON.parse(params.huan_images);
			}else{
				this.huan_images = []
			}
			if (params.other_images) {
				this.other_images = JSON.parse(params.other_images);
			}else{
				this.other_images = []
			}
            const nav = navigator.userAgent;
			if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.isShowUpFile = false;
			}
		},
	created() {
	},
		methods: {
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
		previewImage(item,type) {
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
                let self = this
                if(type == 1){
                    previewImages = self.card_images.filter((iitem,index)=>{
                        return self.getFileType(iitem.name) == 'image'
                    })
                }else if(type == 2){
                    previewImages = self.liaotian_images.filter((iitem,index)=>{
                        return self.getFileType(iitem.name) == 'image'
                    })
                }else if(type == 3){
                    previewImages = self.jietiao_images.filter((iitem,index)=>{
                        return self.getFileType(iitem.name) == 'image'
                    })
                }else if(type == 4){
                    previewImages = self.cuishou_images.filter((iitem,index)=>{
                        return self.getFileType(iitem.name) == 'image'
                    })
                }else if(type == 5){
                    previewImages = self.huan_images.filter((iitem,index)=>{
                        return self.getFileType(iitem.name) == 'image'
                    })
                }else if(type == 6){
                    previewImages = self.other_images.filter((iitem,index)=>{
                        return self.getFileType(iitem.name) == 'image'
                    })
                }
				uni.previewImage({
					urls: previewImages,
					current: item.url
				});
			}
		}
			
		}
	}
</script>

<style lang='scss' scoped>
	.module-box{
		width: 100%;
		background-color: #fff;
		border-radius: 26rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.module-title-box{
			width: 100%;
			min-height: 30rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #000000;
			opacity: 1;
			font-family: PingFang-SC-Medium;
			padding: 0rpx 30rpx;
		}
		.upload-box {
			display: flex;
			flex-wrap: wrap;
			padding: 30rpx;
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
					border: 4rpx dashed #D0D0D0;
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
}
.bottom-box {
	background-color: #f6f6f6;
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
