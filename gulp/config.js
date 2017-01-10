//ref https://github.com/webpack/docs/wiki/optimization
//ref https://github.com/lpiepiora/bower-webpack-plugin
var webpack = require("webpack");
var path = require("path");

var projectPath = path.resolve(__dirname, "..");
var contentBase = path.resolve(projectPath, "build");
var publicPath = "/assets/";
var config = module.exports = {
  contentBase: contentBase,
  projectPath: projectPath,
  webpack: {
    entry: {
      main: [projectPath + "/src/app/main.js"]
    },
    output: {
      path: path.resolve(contentBase, "assets"),
      publicPath: publicPath,
      filename: "[name].js"
    },
    resolve: {
      alias: {
        app: projectPath + "/src/app",
        vue: 'vue/dist/vue.js'
      }
    },
    module: {
      loaders: [{
        test: /\.html$/,
        loader: "raw-loader!html-minify-loader"
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
        loader: "file-loader?name=[name].[ext]"
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'regenerator-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }]
    },
    plugins: [
      new webpack.ProvidePlugin({}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    devtool: 'source-map'
  },
  "webpack-dev-server": {
    contentBase: contentBase,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    publicPath: publicPath,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  www: {
    path: projectPath + "/src/www"
  }
};

