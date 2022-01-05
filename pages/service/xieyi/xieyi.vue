<template>
	<view>
			<law-top-nav :title="title"></law-top-nav>
		<view class="item-content"><rich-text :nodes="details"></rich-text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details: '',
				type:'',
				title:''
			}
		},
		onLoad(option) {
			console.log(option.type)
			this.type=option.type
			this.getContent()
		},
		methods: {
			getContent(){
				let params = {
					token: uni.getStorageSync('token')
				};
				this.$api('index.xieyi2', params).then(res => {
					if(this.type==1){
						this.details=this.richText(res.data.lvshi)
						this.title="服务商合作协议（律师）"
					}else if(this.type==2){
						this.details=this.richText(res.data.fawu)
						this.title="服务商合作协议（法务专员）"
					}else if(this.type==3){
						this.details=this.richText(res.data.touziren)
						this.title="服务商合作协议（投资人）"
					}
				});
			},
			richText(details) {
				var texts = ''; //待拼接的内容
				while (details.indexOf('<img') != -1) {
					//寻找img 循环
					texts += details.substring('0', details.indexOf('<img') + 4); //截取到<img前面的内容
					details = details.substring(details.indexOf('<img') + 4); //<img 后面的内容
					if (details.indexOf('style=') != -1 && details.indexOf('style=') < details.indexOf('>')) {
						texts += details.substring(0, details.indexOf('style="') + 7) + 'max-width:100%;height:auto;margin:0 auto;'; //从 <img 后面的内容 截取到style= 加上自己要加的内容
						details = details.substring(details.indexOf('style="') + 7); //style后面的内容拼接
					} else {
						texts += ' style="max-width:100%;height:auto;margin:0 auto;" ';
					}
				}
				texts += details; //最后拼接的内容
				return texts;
			},
		}
	}
</script>

<style>
.item-content{
	margin-top: 88rpx;
	padding: 30rpx;
}
</style>
