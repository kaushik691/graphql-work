module.exports = [
    {
    entry: __dirname+'/app.js',
    output: {
        path: __dirname+ '/public',
        filename: 'server.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
        },
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react','@babel/preset-env']
            }
          }
        }
      ]
    }
  }    
]