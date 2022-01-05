const ENV_BASE_URL = {
	 development: 'https://d-fali.bigchun.com', //开发环境
	 production: 'https://d-fali.bigchun.com', //测试生产环境
	//development: 'https://fali.bigchun.com', //开发环境
	//production: 'https://fali.bigchun.com', //测试生产环境
	/// production: 'https://fali.bigchun.com', //正式生产环境
}

export const API_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; 
