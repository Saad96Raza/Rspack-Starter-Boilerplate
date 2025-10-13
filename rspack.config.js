const glob = require('glob')
const path =  require('path')
const {rspack ,ProvidePlugin}  = require('@rspack/core')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pugPages = glob.sync('src/views/pages/*.pug')


module.exports = {
    mode:'development',
    entry : path.resolve(__dirname, "src/apps/index.ts"),
    output :{
        path : path.resolve(__dirname,'dist'),
        filename:'js/[name].bundle.js',
        clean: true,
    },
    devServer:{
        static: {
            directory: path.join(__dirname, 'dist'),            
        },
        client: {
            overlay: {
              errors: true,
              warnings: false,
              
            },
        },
        compress: true,
        hot:false,
        port: 3000,
    },
    devtool: false, 
    module:{
        rules:[
            {
                test: /\.(?:js|mjs|cjs|ts)$/,
                exclude: /node_modules/,
                use: 'builtin:swc-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    rspack.CssExtractRspackPlugin.loader, 
                    "css-loader",
                    "postcss-loader",              
                    "sass-loader",
                ],
            },           
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
                exclude: /src\/styles/, 
                type: 'asset/resource',
                generator: {
                    filename: 'media/[name][ext]', 
                },                  
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type:"asset/resource",
                generator:{
                    filename:"fonts/[name][ext]"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.mjs', '.cjs'], 
    },
    plugins: [

        new rspack.CssExtractRspackPlugin({
            filename: "css/[name].css", 
        }),
        
        new rspack.CopyRspackPlugin({
            patterns: [
                { from: 'src/media', to: 'media'},
            ],
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        ...pugPages.map((file) => {       
            const pageName = path.basename(file, '.pug')
            return new HtmlWebpackPlugin({
              title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
              template: file,
              filename: (pageName === 'home') ? 'index.html' : pageName + '.html',
              inject: 'body',
              chunks: ['main'],
            })
        }),
    ],
    
}
