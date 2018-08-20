fis.match('**', {release: false});

fis.match('*.less', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('less'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
});

fis.match('index.js', {
    parser: fis.plugin('babel-6.x', {
        plugins: [
            ["transform-react-jsx", {
                "pragma": "Component.createElement"
            }]
        ]
    }),

    // optimizer: fis.plugin('uglify-js'),
    preprocessor: fis.plugin('js-require-css', {mode: 'inline'}),
    release: 'index.min.js'
});

fis.media('debug').match('src/index.js', {
    optimizer: null
});