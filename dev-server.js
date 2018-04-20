let config = require('./webpack.config')
let webpack = require('webpack')

let WebpackDevServer = require('webpack-dev-server')

config.entry.app.unshift('webpack-dev-server/client?http://localhost:9000', 'webpack/hot/dev-server')

let compiler = webpack(config)

let devServer = new WebpackDevServer(compiler, {
  contentBase: './app/',
  //host: '192.168.0.103', 
  //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
  open: true, // 自动打开浏览器
  index: 'index.html', // 与HtmlWebpackPlugin中配置filename一样
  inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
  hot: true,
  compress: true //压缩
})

devServer.listen(9000)