<template>
	<view style="position:relatevie">
		<u-navbar :custom-back="back" title="案例详情" :background="{background:'#e02e24'}" title-color="#fff" back-icon-color="#fff"
			z-index="99999" :is-back="btmbtn">
		</u-navbar>
		<view class="top-title">
			<view class="dtitle">
				<text class="name">{{detail.title}}</text>
				<view class="userinfo" v-if="!btmbtn" @click.stop="checkUserInfo(detail.lawyer_id)">
					<!-- <text>1744596542</text> -->
					<text>{{detail.lawyer_name}}</text>
				</view>
			</view>
			
		</view>
		<view class="body" :style="btmbtn ? 'padding-bottom:160rpx;' : ''">
			<image style="display: inline-block;" v-for="(item, index) in detail.case_images" :key="index" class="pre-item-image" :src="item" mode="widthFix"></image>
            
		</view>
		<view class="btm" v-if="btmbtn">
			<view class="btm-item"  @click="zan(detail.case_id ,detail.is_up)">
				<u-image width="60rpx" height="60rpx" :src="detail.is_up ==0?require('@/static/img/zeng11.png'):require('@/static/img/zeng12.png')"></u-image>
				<text style="padding-top:10rpx">点赞{{detail.up_num  }}</text>
			</view>
			<view class="btm-item" @click="share(detail.case_id ,detail.is_tran)">
				<u-image width="60rpx" height="60rpx" :src="detail.is_tran ==0?require('@/static/img/zeng9.png'):require('@/static/img/zeng10.png')"></u-image>
				<text style="padding-top:10rpx">分享{{detail.tran_num     }}</text>
			</view>
			<view class="btm-item" @click="collect(detail.case_id ,detail.is_fav)">
				<u-image width="60rpx" height="60rpx" :src="detail.is_fav ==0?require('@/static/img/zeng16.png'):require('@/static/img/zeng15.png')"></u-image>
				<text style="padding-top:10rpx">收藏{{detail.fav_num    }}</text>
			</view>
		</view>
		<u-toast ref="uToast" />
        <view class="suspension-box" @click="downloadApp()" v-if="!btmbtn">
            在法力APP打开
            <u-icon name="arrow-right" color="#fff" size="28"></u-icon>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:'',
				id:'',
				title:'',
				btmbtn:true
			}
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.title = options.title
			this.loadData(options.id)
			if ( options.shareid) {
				this.btmbtn = false
			}else{
				this.btmbtn = true
			}
		},
		methods: {
			back(){
				this.$Router.back(1)
			},
			loadData(id){
				let params = {
					token:uni.getStorageSync('token'),
					case_id:id
				}
				this.$api('index.casesdetail',params).then(res=>{
					console.log(res)
					this.detail= res.data
				})
			},
			// 点赞点击
			zan(e,type){
				console.log(type)
				if(type ==0){
					this.apipost(e,2,'index.act')
				}else{
					this.apipost(e,2,'index.delup')
				}
			},
			// 收藏点击
			collect(e,type){
				if(type ==0){
					this.apipost(e,4,'index.act')
				}else{
					this.apipost(e,4,'index.delfav')
				}
			},
			//分享
			share(e,type){
				console.log(e)
				this.apipost(e,3,'index.act')
				let shareInfo = {
					title: this.title,
					content: '我在法力app上看到这个律师有办案经验，您看下如何',
					imageUrl: `${this.$API_URL}/source/go.png`,
					path: `${this.$VIEW_URL}/#/pages/service/suit/zhianDetail?id=${this.id}&shareid=${this.id}&title=${this.title}`
				};
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.share(JSON.stringify(shareInfo));
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('share', shareInfo, data => {
						// 处理返回数据
						console.log(data, '我走了这里');
					});
				}
			},
			
			apipost(catid,act,url){
				let params = {
					token:uni.getStorageSync('token'),
					case_id:catid,
					act:act
				}
				this.$api(url , params).then(res=>{
					console.log(res)
					if(res.code ==1){
						console.log(act)
						if(act != 3){
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success',
							})
						}
						
						this.loadData(this.id)
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
						})
					}
				})
			},
            checkUserInfo(id){
                window.location.href = '/#/pages/client/user/lawyer-detail?lawyerId=' + id +'&type=share'
            },
            downloadApp(){
                let ua = window.navigator.userAgent.toLowerCase()
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    alert('请点击右上角按钮在其他浏览器打开')
                }else{
                    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.lifakeji.lark.business.law'
                }
            }
		}
	}
</script>

<style lang='scss' scoped>
	.top-title{
		padding:0 20px;
        background-color: #fff;
		.dtitle{
			padding:30rpx 0;
			display: flex;
			flex-direction: column;
			font-size: 32rpx;
			font-weight: 700;
			.name{
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.userinfo{
				display: flex;
				justify-content: flex-end;
				height:50rpx;
				padding-right:100rpx;
				color:#e02e24;
				font-weight: 500;
			}
		}
	}
	.btm{
		position: fixed;
		bottom:0;
		left: 0;
		width:100%;
		height:160rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.btm-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex: 1;
		}
	}
	.body{
		display: flex;
		flex-wrap: wrap;
		/* margin-top: 40rpx; */
		overflow: auto;
		/* padding-top:20rpx; */
		
	}
	.pre-item {
		display: flex;
		flex-direction: column;
		width: 100%;
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
		display: block !important;
	}
	.btn{
		position: fixed;
		bottom:0;
		left: 0;
		width:100%;
		height:80rpx;
	}
    .suspension-box{
         position:fixed;
         top: 50%;
         right: 0;
         width: 260rpx;
         height: 66rpx;
         border-radius: 10rpx 0rpx 0rpx 10rpx;
         font-size: 26rpx;
         background-color: #E03026;
         color: #fff;
         display: flex;
         justify-content: center;
         align-items: center;
    }
</style>
