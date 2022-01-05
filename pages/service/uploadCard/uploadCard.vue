<template>
	<view>
		<u-navbar
			:custom-back="goBack"
			title="身份证件"
			:titleBold="true"
			:background="{ background: '#E02E24' }"
			title-color="#fff"
			back-icon-color="#fff"
			z-index="99999"
		></u-navbar>
		<view class="main" v-if="isDis == false">
			<view class="idcardz">
				<view class="idcarc-title">身份证正面</view>
				<view class="cardbox">
					<view class="card">
						<template v-if="system == 'android'">
							<view class="slot-btn" @click="uploadPopup(1)">
								<u-image width="600rpx" border-radius="10" height="347rpx" :src="cert1_image"
									v-if="cert1_image != '' && cert1_image != undefined"></u-image>
								<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng6.png" v-else>
								</u-image>
							</view>
						</template>
						<template v-else>
							<u-upload
								ref="uUpload1"
								:action="action"
								:custom-btn="true"
								:max-count="1"
								width="600"
								height="347"
								:auto-upload="false"
								on-oversize="onOversize"
								@on-uploaded="onSuccess"
								@on-choose-complete="onChoose(1)"
								@on-remove="onRemove(1)"
								index="card_img_one"
							>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="600rpx" border-radius="10" height="347rpx" :src="cert1_image"
									v-if="cert1_image != '' && cert1_image != undefined"></u-image>
								<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng6.png" v-else>
								</u-image>
							</view>
							</u-upload>
						</template>
						<!-- <u-upload
							ref="uUpload1"
							:action="action"
							:custom-btn="true"
							:max-count="1"
							width="600"
							height="347"
							:auto-upload="false"
							on-oversize="onOversize"
							@on-uploaded="onSuccess"
							@on-choose-complete="onChoose(1)"
							@on-remove="onRemove(1)"
							index="card_img_one"
						>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="600rpx" height="347rpx" :src="cert1_image" v-if="cert1_image != '' && cert1_image != undefined"></u-image>
								<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng6.png" v-else></u-image>
							</view>
						</u-upload> -->
					</view>
				</view>
			</view>
			<view class="idcardz">
				<view class="idcarc-title">身份证反面</view>
				<view class="cardbox">
					<view class="card">
						<template v-if="system == 'android'">
							<view class="slot-btn" @click="uploadPopup(2)">
								<u-image width="600rpx" border-radius="10" height="347rpx" :src="cert2_image"
									v-if="cert2_image != '' && cert2_image != undefined"></u-image>
								<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng5.png" v-else>
								</u-image>
							</view>
							</template>
							<template v-else>
								<u-upload
									ref="uUpload2"
									:action="action"
									:custom-btn="true"
									:max-count="1"
									width="600"
									height="347"
									:auto-upload="false"
									on-oversize="onOversize"
									@on-uploaded="onSuccess"
									@on-choose-complete="onChoose(2)"
									@on-remove="onRemove(2)"
									index="card_img_two"
								>
								<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
									<u-image width="600rpx" border-radius="10" height="347rpx" :src="cert2_image"
										v-if="cert2_image != '' && cert2_image != undefined"></u-image>
									<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng5.png" v-else>
									</u-image>
								</view>
								</u-upload>
							</template>
						<!-- <u-upload
							ref="uUpload2"
							:action="action"
							:custom-btn="true"
							:max-count="1"
							width="600"
							height="347"
							:auto-upload="false"
							on-oversize="onOversize"
							@on-uploaded="onSuccess"
							@on-choose-complete="onChoose(2)"
							@on-remove="onRemove(2)"
							index="card_img_two"
						>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="600rpx" height="347rpx" :src="cert2_image" v-if="cert2_image != '' && cert2_image != undefined"></u-image>
								<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng5.png" v-else></u-image>
							</view>
						</u-upload> -->
					</view>
				</view>
			</view>
		</view>
		<view class="main" v-else>
			<view class="idcardz">
				<view class="idcarc-title">身份证正面</view>
				<view class="cardbox">
					<view class="card">
						<view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-image width="600rpx" height="347rpx" :src="cert1_image" v-if="cert1_image != '' && cert1_image != undefined"></u-image>
							<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng6.png" v-else></u-image>
						</view>
					</view>
				</view>
			</view>
			<view class="idcardz">
				<view class="idcarc-title">身份证反面</view>
				<view class="cardbox">
					<view class="card">
						<view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-image width="600rpx" height="347rpx" :src="cert2_image" v-if="cert2_image != '' && cert2_image != undefined"></u-image>
							<u-image width="600rpx" height="347rpx" src="../../../static/img/zeng6.png" v-else></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupAdd" type="bottom">
			<order-popup-common-bottom title="" @closePop="closePop('popupAdd')">
				<view class="popup-con" slot="popup-con">
					<view class="choose-box flex">
						<view class="choose-item flex1" @click="camera">
							<view class="image-wrapper">
								<image src="@/static/img/upload-camara.png" mode="aspectFit"></image>
							</view>
							拍照
						</view>
						<view class="choose-item flex1" @click="pickPhoto">
							<view class="image-wrapper">
								<image src="@/static/img/upload-image.png" mode="aspectFit"></image>
							</view>
							相册
						</view>
						<!-- <view class="choose-item flex1" @click="pickFile" v-show="isShowUpFile">
							<view class="image-wrapper"><image src="@/static/img/upload-file.png" mode="aspectFit"></image></view>
							文件
						</view> -->
					</view>
				</view>
			</order-popup-common-bottom>
		</uni-popup>
		<view class="btn">
			<u-button :custom-style="btnStyle" size="medium" @click="submit" v-if="isDis == false">提交</u-button>
			<text class="tips">信息仅用于身份验证，法力保障您的信息安全</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { API_URL } from '@/env';
export default {
	data() {
		return {
			btnStyle: {
				background: '#e02e24',
				width: '90%',
				height: '80rpx',
				'border-radius': '10rpx',
				color: '#fff'
			},
			formdata: {},
			action: API_URL + '/api/common/upload',
			img: [],
			isDis: false,
			cert1_image: '', //	正面
			cert2_image: '' ,//	反面
			readOnly: false,
			isShowUpFile: true, //IOS 不能上传文件，不显示此按钮
			thisphoto: null, //当前上传的是第几个图片
			system:getApp().globalData.system
		};
	},
	onLoad() {
	},
	created() {
		window.fileOk = this.fileOk;
		window.photoOk = this.photoOk;
		window.sourceOk = this.sourceOk;
	},
	methods: {
		onChoose(id) {
			if (id == 1) {
				uni.showLoading({
					title: '上传图片中'
				});
				this.$refs.uUpload1.upload();
			} else if (id == 2) {
				uni.showLoading({
					title: '上传图片中'
				});
				this.$refs.uUpload2.upload();
			}
		},
		onError() {
			uni.hideLoading();
		},
		onRemove(type) {
			if (type == 1) {
				this.cert1_image=''
			} else if (type == 2) {
				this.cert2_image = '';
			}
		},
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		submit() {
			if (this.cert1_image == '' || this.cert1_image == undefined) {
				uni.showToast({
					title: '请上传身份证正面',
					duration: 2000,
					icon: 'none'
				});
			} else if (this.cert2_image == '' || this.cert2_image == undefined) {
				uni.showToast({
					title: '请上传身份证反面',
					duration: 2000,
					icon: 'none'
				});
			} else {
				let formData = {
					token: uni.getStorageSync('token'),
					cardface_image: this.cert1_image,
					cardback_image: this.cert2_image
				};
				this.$api('index.lawyeredit', formData).then(res => {
					console.log(res);
					if (res.code == 1) {
						// uni.setStorageSync('lawyerFrom', {});
						// this.modal1 = true;
						// this.model = {
						// 	img: require('@/static/img/z7.png'),
						// 	text1: '已提交申请，请等待平台审核',
						// 	text2: '感谢您的信任与支持'
						// };
						// this.check_state = 1;
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						})
						setTimeout(()=>{
							this.back()
						},2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
 
				uni.showToast({
					title: '提交成功',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		back() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.onBackPress();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('onBackPress', {}, res => {});
			}
		},
		// 图片上传完成事件
		onSuccess(data, index, lists, name) {
			console.log(index);
			if (data[0].response.data.url != undefined) {
				uni.hideLoading();
				console.log('上传完成');
				this.$refs.uToast.show({
					title: '图片上传完成',
					type: 'success'
				});
				var url = data[0].response.data.url;
				if (index == 'card_img_one') {
					this.cert1_image = url;
				} else if (index == 'card_img_two') {
					this.cert2_image = url;
				} else {
					this.cert3_image = url;
				}
			}
		},
		// ------------------------------------------------
		uploadPopup(e) {
			console.log(e);
			this.thisphoto = e
		
			this.$refs.popupAdd.open()
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
			if(res=='nothing'){
				uni.hideLoading()
			}
			// uni.hideLoading()
			// uni.showToast({
			// 	title: '上传完成',
			// 	duration: 1000,
			// 	icon: 'none'
			// });
			switch (this.thisphoto) {
				case 1:
					this.cert1_image = JSON.parse(res).url
					if (this.cert1_image != '') {
						uni.hideLoading();
					}
					break;
				case 2:
					this.cert2_image = JSON.parse(res).url
					if (this.cert2_image != '') {
						uni.hideLoading();
					}
					break;
				case 3:
					this.cert3_image = JSON.parse(res).url
					if (this.cert3_image != '') {
						uni.hideLoading();
					}
					break;
				default:
					break;
			}
		
			console.log(JSON.parse(res).url)
		
		},
		// 打开摄像头
		camera() {
			const nav = navigator.userAgent;
			uni.showLoading({
				title: '上传中'
			})
			this.closePop('popupAdd')
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.camera();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('camera', 1, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
		//选择照片
		pickPhoto() {
			uni.showLoading({
				title: '上传中'
			})
			this.closePop('popupAdd')
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickPhoto('1');
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickPhoto', 1, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
		// 选择文件
		pickFile() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickFile(1);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickFile', 1, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding-bottom: 200rpx;
}

.idcardz {
	width: 90%;
	height: 440rpx;
	border-radius: 10px;
	margin-left: 5%;
	margin-top: 40rpx;

	.idcarc-title {
		width: 100%;
		height: 40rpx;
		text-align: center;
		line-height: 80rpx;
		color: #666;
		font-size: 30rpx;
		font-weight: 700;
	}

	.cardbox {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-top: 40rpx;

		.card {
			flex: 1;
			display: flex;
			justify-content: center;
		}
	}
}

.btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 180rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f7f7f7;

	.tips {
		height: 100rpx;
		line-height: 100rpx;
		color: #999;
	}
}
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
</style>
