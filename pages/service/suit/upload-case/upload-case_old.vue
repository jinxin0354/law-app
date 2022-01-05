<template>
	<view class="case">
		<u-navbar :custom-back="back" title="诉讼案例文件" :background="{background:'#e02e24'}" title-color="#fff" back-icon-color="#fff" z-index="99999">
				</u-navbar>
		<u-form :model="form" ref="uForm">
			<u-form-item label="第一步:添加案例标题" label-position="top">
				<u-input v-model="form.name" :border="true" />
			</u-form-item>
			<u-form-item label="第二步:选择上传领域" label-position="top">
				<u-input v-model="form.areaname" :border="true" @click="selectLing" type="select" />
			</u-form-item>
			<!-- <u-form-item label="第三步:上传图片版" label-position="top"><u-input v-model="form.sex" type="select" /></u-form-item> -->
			<view class="seard">
				<view class="seard-top">
					<text>第三步：上传图片版</text>
					<text class="yulan">我要预览</text>
				</view>
				<view class="seard-btm">
					<view class="send-left">
						<text class="send-title">上传图片版</text>
						<text class="send-tips">请先将文档每一页截图，然后再上传</text>
					</view>
					<view class="send-right">
						<view class="send-box">
							<u-image border-radius="10" width="100rpx" height="100rpx"
								src="../../../../static/img/zeng8.png"></u-image>
						</view>
					</view>
				</view>
				<!-- <u-upload ref="uUpload" :action="action" :custom-btn="true" width="700" height="347"
					:auto-upload="false" @on-uploaded="onSuccess"
					:show-upload-list="showUploadList">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<view class="seard-btm">
							<view class="send-left">
								<text class="send-title">上传图片版</text>
								<text class="send-tips">请先将文档每一页截图，然后再上传</text>
							</view>
							<view class="send-right">
								<view class="send-box">
									<u-image border-radius="10" width="100rpx" height="100rpx"
										src="../../../../static/img/zeng8.png"></u-image>
								</view>
							</view>
						</view>
					</view>
				</u-upload> -->
				<view class="pre-box" v-if="!showUploadList">
					<view class="pre-item" v-for="(item, index) in lists" :key="index">
						<image class="closeImg" @click="delectImg(index)" width="50rpx" height="50rpx" :src="require('@/static/img/closeRed.png')" mode="aspectFit"></image>
						<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</u-form>
		<view class="btn">
			<u-button :custom-style="customStyle" :disabled="disabled" @click="submit">我要上传</u-button>
		</view>
		<u-select v-model="lingyushow" :list="lingyuList" @confirm="confirm"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		API_URL
	} from '@/env'
	export default {
		data() {
			return {
				form: {
					name:'',
					areaname:''
				},
				showUploadList: false,
				lists: [],
				action:API_URL + '/api/common/upload',
				lingyushow:false,
				lingyuList:[],
				customStyle:{
					background:'#e02e24',
					color:"#fff"
				},
				disabled:false,
			}
		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.lists = this.$refs.uUpload.lists;
		},
		onLoad() {
			this.indexcase()
		},
		methods: {
			back(){
				this.$Router.back(1)
			},
			indexcase(){
				let params = {
					token:uni.getStorageSync('token')
				}
				this.$api('index.indexcase',params).then(res=>{
					console.log(res);
					this.lingyuList =  res.data.map(res=>{
						return {value:res.id,label:res.area_name}
					})
				})
			},
			selectLing(){
				this.lingyushow = true
			},
			confirm(e){
				console.log(e);
				this.form.areaid = e[0].value
				this.form.areaname = e[0].label
			},
			// 删除图片
			delectImg(indexs){
				this.lists = this.lists.filter(( item,index ) => index !== indexs);
				
			},
			// 上传
			submit(){
				if(this.form.name ==''){
				uni.showToast({
					title:'请填写标题',
					icon:'none',
					
				})
				}else if(this.form.areaname ==''){
					uni.showToast({
						title:'请选择上传领域',
						icon:'none',
						
					})
				}else if(this.$refs.uUpload.lists == ''){
					uni.showToast({
						title:'请上传图片',
						icon:'none',
						
					})
				}else{
					this.$refs.uUpload.upload();
					uni.showLoading({
						title:'上传中'
					})
				}
			},
			onSuccess(data, index, lists, name) {
				
				let imglist = data.map(res => res.response.data.url).join(',')
				console.log(imglist)
				uni.hideLoading()
				let params = {
					token:uni.getStorageSync('token'),
					title:this.form.name,
					case_images:imglist,
					fali_serve_area_id:this.form.areaid
				}
				this.$api('index.savacase',params).then(res=>{
					console.log(res)
					if(res.code ==1){
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
						})
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
						})
					}
				})
				}
			
		}
	}
</script>

<style lang="scss" scoped>
	.case {
		padding: 20rpx;

		.seard {
			display: flex;
			flex-direction: column;

			.seard-top {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.yulan {
					color: #009966;
				}
			}

			.seard-btm {
				width: 700rpx;
				height: 240rpx;
				background: #50a8fe;
				border-radius: 20rpx;
				display: flex;
				align-items: center;

				.send-left {
					display: flex;
					flex-direction: column;
					flex: 1;
					color: #fff;

					.send-title {
						font-size: 40rpx;
						padding: 20rpx 30rpx;
					}

					.send-tips {
						padding-left: 30rpx;
						font-size: 24rpx;
					}
				}

				.send-right {
					padding-right: 60rpx;

					.send-box {
						width: 160rpx;
						height: 160rpx;
						background-color: #2894fe;
						border-radius: 160rpx;
						display: flex;
						align-items: center;
						justify-content: center;

					}
				}
			}
		}
	}

	.pre-box {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 40rpx;
	}

	.pre-item {
		flex: 0 0 30%;
		border-radius: 10rpx;
		height: 260rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 0 4rpx rgba(152, 152, 152, 0.2);
		margin-left: 2%;
		.closeImg{
			position: absolute;
			top:10rpx;
			right:10rpx;
			width:50rpx;
			height:50rpx;
			z-index: 99;
		}
	}

	.pre-item-image {
		width: 100%;
		height: 260rpx;
	}
	.btn{
		position: fixed;
		bottom:0;
		left: 0;
		width:100%;
		height:80rpx;
	}
</style>
