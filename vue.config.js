module.exports = {
	publicPath: './',
	configureWebpack: {
		devServer:{
			proxy: {
				"/api" :{
					target: "https://api.zhuishushenqi.com",
					changeOrigin: true,
					pathRewrite: {'^/api' : ''}
				},
				
				"/chapterup" :{
					target: "http://chapterup.zhuishushenqi.com/",
					secure: false,
					changeOrigin: true,
					pathRewrite: {'^/chapterup' : ''}
				}
				
			}
		}
		
	}
}