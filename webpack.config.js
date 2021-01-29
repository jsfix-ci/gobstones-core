const path = require('path');

const commonConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};

const libraryTarget = Object.assign({}, commonConfig, {
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'gobstones-core',
        umdNamedDefine: true
    }
});

module.exports = [libraryTarget];
