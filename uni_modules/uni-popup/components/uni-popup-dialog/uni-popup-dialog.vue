<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text" :class="['uni-popup__'+dialogType]">{{title}}</text>
			<view class="title-close" @click="close" v-if="showClose">
				<view class="image-wrapper"><image src="@/static/img/close.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<view v-if="mode === 'base'" class="uni-dialog-content">
			<slot>
				<text class="uni-dialog-content-text">{{content}}</text>
			</slot>
		</view>
		<view v-else class="uni-dialog-content">
			<slot>
				<textarea :placeholder="placeholder" :focus="focus" v-model="val" placeholder-class="placeholder"/>
			</slot>
		</view>
		<view class="uni-dialog-button-group" v-if="okTxt!=''||cancleTxt!=''">
			<view class="uni-dialog-button uni-border-right" @click="closeDialog" v-if="cancleTxt">
				<text class="uni-dialog-button-text">{{cancleTxt}}</text>
			</view>
			<view class="uni-dialog-button" v-if="okTxt" @click="onOk">
				<text class="uni-dialog-button-text">{{okTxt}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import popup from '../uni-popup/popup.js'
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */

	export default {
		name: "uniPopupDialog",
		mixins: [popup],
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			type: {
				type: String,
				default: 'error'
			},
			mode: {
				type: String,
				default: 'base'
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			beforeClose: {
				type: Boolean,
				default: false
			},
			cancleTxt:{
				type:String,
				default:''
			},
			okTxt:{
				type:String,
				default:'确认'
			},
			showClose:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.disableMask()
			// this.popup.closeMask()
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				if (this.mode === 'input'){
					this.$emit('confirm', this.val)
				}else{
					this.$emit('confirm')
				}
				if(this.beforeClose) return
				this.popup.close()
			},
			/**
			 * 点击取消按钮
			 */
			closeDialog() {
				this.$emit('close')
				if(this.beforeClose) return
				this.popup.close()
			},
			close(){
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
		flex-wrap: wrap;
		textarea{
			border: 1rpx solid #EEEEEE;
			padding: 10rpx;
			border-radius: 20rpx;
			height: 100rpx;
		}
	}

	.uni-dialog-content-text {
		color: #333;
		line-height: 60rpx;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}
	.uni-border-right {
		border-right-color: #f0f0f0;
		border-right-style: solid;
		border-right-width: 1px;
	}
	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: #007aff;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
		border: 1px #eee solid;
		height: 40px;
		padding: 0 10px;
		border-radius: 5px;
		color: #555;
	}

	.uni-popup__success {
		color: #4cd964;
	}

	.uni-popup__warn {
		color: #f0ad4e;
	}

	.uni-popup__error {
		color: #dd524d;
	}

	.uni-popup__info {
		color: #333;
		font-size: 30rpx;
	}
	.title-close {
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.image-wrapper {
			width: 26rpx;
			height: 26rpx;
			vertical-align: middle;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
