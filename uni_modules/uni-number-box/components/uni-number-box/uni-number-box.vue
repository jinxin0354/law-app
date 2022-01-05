<template>
	<view class="uni-numbox">
		<view @click="_calcValue('minus')" class="uni-numbox__minus uni-cursor-point">
			<image src="@/static/img/order-reduce.png" mode="aspectFit" style="width: 40rpx; height: 40rpx;"></image>
			<!-- <text class="uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue <= min || disabled }">-</text> -->
		</view>
		<input disabled="" @focus="_onFocus" @blur="_onBlur" class="uni-numbox__value" type="number" v-model="inputValue" />
		<view @click="_calcValue('plus')" class="uni-numbox__plus uni-cursor-point">
			<image src="@/static/img/order-add.png" mode="aspectFit" style="width: 40rpx; height: 40rpx;"></image>
			<!-- <text class="uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }">+</text> -->
		</view>
	</view>
</template>
<script>
/**
 * NumberBox 数字输入框
 * @description 带加减按钮的数字输入框
 * @tutorial https://ext.dcloud.net.cn/plugin?id=31
 * @property {Number} value 输入框当前值
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 每次点击改变的间隔大小
 * @property {Boolean} disabled = [true|false] 是否为禁用状态
 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
 */

export default {
	name: 'UniNumberBox',
	props: {
		value: {
			type: [Number, String],
			default: 1
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			inputValue: 0
		};
	},
	watch: {
		value(val) {
			this.inputValue = +val;
		}
	},
	created() {
		this.inputValue = +this.value;
	},
	methods: {
		_calcValue(type) {
			if (this.disabled) {
				return;
			}
			const scale = this._getDecimalScale();
			let value = this.inputValue * scale;
			let step = this.step * scale;
			if (type === 'minus') {
				value -= step;
				if (value < this.min * scale) {
					return;
				}
				if (value > this.max * scale) {
					value = this.max * scale;
				}
			}

			if (type === 'plus') {
				value += step;
				if (value > this.max * scale) {
					return;
				}
				if (value < this.min * scale) {
					value = this.min * scale;
				}
			}

			this.inputValue = (value / scale).toFixed(String(scale).length - 1);
			this.$emit('change', +this.inputValue);
			this.$emit('input', +this.inputValue);
		},
		_getDecimalScale() {
			let scale = 1;
			// 浮点型
			if (~~this.step !== this.step) {
				scale = Math.pow(10, String(this.step).split('.')[1].length);
			}
			return scale;
		},
		_onBlur(event) {
			this.$emit('blur', event);
			let value = event.detail.value;
			if (!value) {
				// this.inputValue = 0;
				return;
			}
			value = +value;
			if (value > this.max) {
				value = this.max;
			} else if (value < this.min) {
				value = this.min;
			}
			const scale = this._getDecimalScale();
			this.inputValue = value.toFixed(String(scale).length - 1);
			this.$emit('change', +this.inputValue);
			this.$emit('input', +this.inputValue);
		},
		_onFocus(event) {
			this.$emit('focus', event);
		}
	}
};
</script>
<style lang="scss" scoped>
$box-height: 35px;
/* #ifdef APP-NVUE */
$box-line-height: 35px;
/* #endif */
$box-line-height: 26px;
$box-width: 35px;

.uni-numbox {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	// height: $box-height;
	// line-height: $box-height;

	// width: 120px;
	width: calc((100% - 76rpx) / 3);
	margin-right: 20rpx;
	justify-content: space-between;
}

.uni-cursor-point {
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
}

.uni-numbox__value {
	width: 36rpx;
	height: 25px;
	text-align: center;
	font-size: $uni-font-size-lg;
	background-color: #fff;
	margin-left: 6rpx;
	margin-right: 6rpx;
}

.uni-numbox__minus {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
	font-size: 20px;
	color: $uni-text-color;
	background-color: $uni-color-primary;
	border-width: 1px;
	border-style: solid;
	border-color: #ffc801;
	border-right-width: 0;
	color: #ffffff;
	border-radius: 50%;
}

.uni-numbox__plus {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
	border-width: 1px;
	border-style: solid;
	border-color: #ffc801;
	background-color: $uni-color-primary;
	border-left-width: 0;
	border-radius: 50%;
}

.uni-numbox--text {
	font-size: 20px;
	color: #ffffff;
	line-height: 25px;
}

.uni-numbox--disabled {
	color: #ffffff;
	/* #ifdef H5 */
	cursor: not-allowed;
	/* #endif */
}
</style>
