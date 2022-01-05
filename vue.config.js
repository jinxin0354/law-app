const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
	includes: ['path', 'aliasPath', 'name', 'meta', 'title'] //需要获取包涵的字段
})

// module.exports = {
// 	configureWebpack: {
// 		plugins: [
// 			new tfPages.webpack.DefinePlugin({
// 				ROUTES: JSON.stringify(tfPages.routes)
// 			})
// 		],
// 	},
// 	// chainWebpack: (config) => { //高版本，HBuilder X，可以开启。
// 	// 	// 发行或运行时启用了压缩时会生效,在package.json中配置压缩
// 	// 	config.optimization.minimizer('terser').tap((args) => {
// 	// 		const compress = args[0].terserOptions.compress
// 	// 		// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
// 	// 		compress.drop_console = true
// 	// 		compress.pure_funcs = [
// 	// 			'__f__', // App 平台 vue 移除日志代码
// 	// 			// 'console.debug' // 可移除指定的 console 方法
// 	// 		]
// 	// 		return args
// 	// 	})
// 	// }
// }

let filePath = ''
let Timestamp = ''
//编译环境判断，可以根据不同环境来做相应的配置
if (process.env.UNI_PLATFORM === 'h5') {
	filePath = 'static/js/'
	Timestamp = '.' + new Date().getTime();

}

module.exports = {
	configureWebpack: { // webpack 配置 解决js缓存的问题，目前只适配H5端打包
		output: { // 输出重构  打包编译后的 文件目录 文件名称 【模块名称.时间戳】
			filename: `${filePath}[name]${Timestamp}.js`,
			chunkFilename: `${filePath}[name]${Timestamp}.js`
		},
		plugins: [
			new tfPages.webpack.DefinePlugin({
				ROUTES: JSON.stringify(tfPages.routes)
			})
		],
	},
}
