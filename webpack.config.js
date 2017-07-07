module.exports = {
	entry: './src/index.js',
	output:{
		//input index.js, and bundle all moudule depended into bundle.js
		path: __dirname + '/static',
		filename: 'bundle.js'
	},
	module:{
		loaders: [
			{
				//every file end with js, run babel-loader on it
				//babel-loader will transforming all none standard js liek JSX, ES2015
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				//npm i -S json-loader, so webpack can read Json file
				test: /\.json$/,
				loader:'json-loader'

			}

		]
	}
};