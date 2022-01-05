<template>
	<view>
		<u-navbar :custom-back="back" :title="title" :background="{background:'#e02e24'}" title-color="#fff" back-icon-color="#fff"
			z-index="99999">
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="upCallback">
			<view class="listbox">
				<view class="listItem" v-for="(item , index) in list" :key="index" @click="zhianDetail(item.case_id ,item.title)">
					<view class="list-top u-line-1">
						{{item.title}}
					</view>
					<view class="list-btm">
						<view class="itmes" >
							<u-image mode="aspectFit" width="40rpx" height="40rpx" :src="item.is_view ==0?require('@/static/img/zeng13.png'):require('@/static/img/zeng14.png')"></u-image>
							<text class="item-font" :style="{color:item.is_view ==0?'#999':'#54c6f6'}">{{item.view_num  }}</text>
						</view>
						<view class="itmes" @click.stop="zan(item.case_id ,item.is_up)">
							<u-image width="40rpx" height="40rpx" :src="item.is_up ==0?require('@/static/img/zeng11.png'):require('@/static/img/zeng12.png')"></u-image>
							<text class="item-font" :style="{color:item.is_up ==0?'#999':'#ffc900'}">{{item.up_num}}</text>
						</view>
						<view class="itmes" @click.stop="share(item.case_id ,item.is_tran,item.title)">
							<u-image width="40rpx" height="40rpx" :src="item.is_tran ==0?require('@/static/img/zeng9.png'):require('@/static/img/zeng10.png')"></u-image>
							<text class="item-font" :style="{color:item.is_tran ==0?'#999':'#ff7c39'}">{{item.tran_num}}</text>
						</view>
						<view class="itmes" @click.stop="collect(item.case_id ,item.is_fav)">
							<u-image width="40rpx" height="40rpx" :src="item.is_fav ==0?require('@/static/img/zeng16.png'):require('@/static/img/zeng15.png')"></u-image>
							<text class="item-font" :style="{color:item.is_fav ==0?'#999':'#09bb07'}">{{item.fav_num}}</text>
						</view>
					</view>
				</view>

			</view>
			<u-toast ref="uToast" />
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
					}
				},
				list:'',
				id:'',
				user_id:''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.title = options.area
			this.user_id=options.user_id
			
		},
		onShow(){
			this.downCallback();
			console.log(23);
		},
		methods: {
			back(){
				this.$Router.back(1)
			},
			downCallback() {
				this.mescroll.resetUpScroll() // 重新触发upCallback
			},
			upCallback(page) {
			
				let params = {
					token: uni.getStorageSync('token'),
					page: page.num,
					limit: page.size,
					id:this.id,
					user_id:this.user_id
					
				}
				this.$api('index.caselists', params).then(res => {
					// console.log(res)
					this.mescroll.endSuccess(res.data.data.length);
					//设置列表数据
					if(page.num == 1) this.list = []; //如果是第一页需手动制空列表
					this.list=this.list.concat(res.data.data); //追加新数据
					console.log(this.list)
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
			
			apipost(catid,act,url){
				let params = {
					token:uni.getStorageSync('token'),
					case_id:catid,
					act:act,
					
				}
				this.$api(url , params).then(res=>{
					console.log(res)
					if(res.code ==1){
						if(act !=3){
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success',
							})
						}
						
						this.mescroll.resetUpScroll()
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
						})
					}
				})
			},
			//分享
			share(e,type,title){
				console.log(e)
				this.apipost(e,3,'index.act')
				let shareInfo = {
					title: title,
					content: '',
					imageUrl: `${this.$API_URL}/source/go.png`,
					path: `${this.$VIEW_URL}/#/pages/service/suit/zhianDetail?id=${this.id}&shareid=${this.id}`
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
			zhianDetail(e ,title){
				uni.navigateTo({
					url:`/pages/service/suit/zhianDetail?id=${e}&title=${title}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listbox {
		margin-top: 50rpx;
	}

	.listItem {
		width: 90%;
		margin-left: 5%;
		height: 240rpx;
		border-radius: 10rpx;
		background-color: #fff;
		margin-top:20rpx;
		.list-top {
			width: 100%;
			height: 120rpx;
			border-bottom: 1rpx dashed #ccc;
			position: relative;
			padding: 0 20rpx;
			line-height: 120rpx;
			font-size: 30rpx;

			&::before {
				content: '';
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				bottom: -20rpx;
				border-radius: 40rpx;
				left: -20rpx;
				background-color: #F7f7f7;
				z-index: 99;
			}

			&::after {
				content: '';
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				bottom: -20rpx;
				border-radius: 40rpx;
				right: -20rpx;
				background-color: #F7f7f7;
				z-index: 99;
			}
		}

		.list-btm {
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 100rpx;
			width: 100%;

			.itmes {
				display: flex;
				align-items: center;
				flex-direction: row;

				.item-font {
					font-size: 28rpx;
					padding-left: 10rpx;
				}
			}

		}
	}
</style>
