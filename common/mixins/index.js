export default {
	data() {
		return {}
	},
	onLoad(options) {},
	//配置全局客服
	onNavigationBarButtonTap(e) {
		console.log(e);
		if (e.index == 0) {
			this.$refs.lawCommon.$refs.telephoneServiceTel.$refs.popupTel.open()
		}
	},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		replace(path, parmas) {
			this.$Router.replace({
				path: path,
				query: parmas
			});
		},
		replaceAll(path, parmas) {
			this.$Router.replaceAll({
				path: path,
				query: parmas
			});
		},
		// popup右上角x，关闭pop弹窗
		closePop(refName) {
			this.$refs[refName].close();
		},
		// 工具函数--
		timeFn(d1) {
			let dateBegin = new Date(); //获取当前时间
			let dateEnd = new Date(d1.replace(/-/g, '/')); //将-转化为/，使用new Date
			let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
			let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
			let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			let hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
			//计算相差分钟数
			let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
			//计算相差秒数
			let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			let seconds = Math.round(leave3 / 1000);
			return {
				day: dayDiff,
				hour: hours,
				minute: minutes,
				second: seconds
			};
		},
		get15MinutesLater(d) {
			let date = new Date(d.replace(/-/g, '/'));
			date.setMinutes(date.getMinutes() + 15);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + +date.getHours() +
				':' + date.getMinutes() + ':' + date.getSeconds();
		},
		getTwoDayLater(d) {
			let date = new Date(d.replace(/-/g, '/'));
			date.setDate(date.getDate() + 2);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + +date.getHours() +
				':' + date.getMinutes() + ':' + date.getSeconds();
		},
		// 跳转到项目详情
		navToProDetail(id) {
			// id = "60fd8815-7d0a-4227-8b8d-dd8c62bd77cc";
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				let res = phone.openProject(id);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('openProject', id, res => {});
			}
		},
		// 下载文档
		downloadFile(url) {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.loadOffice(url);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('loadOffice', url, data => {});
			}
		},
		previewImages(previewImages) {
			// 预览图片
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.previewPicture(JSON.stringify(previewImages));
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('previewPicture', previewImages, data => {});
			}
		},
		isBetweenTime(time1, time2) {
			var time = Date.parse(new Date());
			var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));
			var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));
			if (date1 < time && date2 > time) {
				return true;
			};
			return false;
		}
	},
	//配置全局下拉刷新
	onPullDownRefresh() {
		if (typeof this.init == 'function') {
			this.init();
		}
	}
}
