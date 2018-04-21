output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
}

devServer: {
    contentBase: __dirname + '/dist',
    historyApiFallback: true
}
