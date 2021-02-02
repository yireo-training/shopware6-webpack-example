const path = require('path');
const exec = require('child_process').exec;
const shopwareRoot = '../../../../../../../';
const storefrontRoot = path.resolve(shopwareRoot, 'vendor/shopware/storefront/Resources/app/storefront');
const babelrc = require('./babelrc');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '..', 'dist', 'storefront', 'js'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components|vendors)\/(?!(are-you-es5|eslint-plugin-cypress|fs-extra|nunito-fontface|query-string|split-on-first)\/).*/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            ...babelrc,
                            cacheDirectory: true,
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.resolve(__dirname, '..', 'node_modules'),
            path.resolve(storefrontRoot, 'node_modules'),
        ],
        alias: {
            src: path.resolve(storefrontRoot, 'src'),
            assets: path.resolve(storefrontRoot, 'assets'),
            scss: path.resolve(storefrontRoot, 'src/scss'),
            vendor: path.resolve(storefrontRoot, 'vendor')
        }
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec(shopwareRoot + '/bin/console theme:compile', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        }
    ]
};
