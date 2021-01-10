const path = require('path');


const javascript = {
    test: /\.(js)$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
        }
    }
}


module.exports = env => { 
    
    env.production = env.production || false;
    
    
    return {
        watchOptions: {
            poll: true,
            ignored: /node_modules/
        },
        entry: {
            hub: './hub/index.js',
            client: './client/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './[name].js'
        },
        module: {
            rules: [
                javascript
            ]
        },
        optimization: {
            minimize: env.production
        },
    }
}