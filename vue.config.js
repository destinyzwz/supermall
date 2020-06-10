const path = require('path'); //引入path模块

function resolve(dir) {
	return path.join(__dirname, dir) //path.join(__dirname)设置绝对路劲
}

module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias
		.set('@', resolve('./src'))
    .set('assets', resolve('src//assets'))
		.set('components', resolve('src/components'))
		.set('common', resolve('src//common'))
		.set('network', resolve('src/network'))
		.set('views', resolve('src/views'))
	},
  // 关闭Eslint语法检查
	lintOnSave: false
}
