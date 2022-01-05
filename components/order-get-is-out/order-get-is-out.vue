<template>
	<view></view>
</template>

<script>
export default {
	props:[''],
	data() {
		return {
		};
	},
	created() {
		
	},
	methods: {
		getIsOUt(){
			if (this.mapRes && this.practiceArea != '全国' && this.mapRes.cityname != this.practiceArea.split(',')[1]) {
				this.$refs.popupOut.open();
			}
		}
	}
};
</script>

<style lang="scss">
</style>
