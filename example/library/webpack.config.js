const pathLib = require('path')
module.exports ={
	mode:'production',
	entry: "./src/main.js",
	externals:{
		lodash:{
			root:'_', //script
			commonjs:'lodash' //引入名称
		}
	}, //遇见忽略
	output: {
		filename:'library.js',
		path: pathLib.resolve(__dirname,'./dist'),
		library:'library',    //script引入
		libraryTarget: "umd"  //import require 通用引入
	}
}
