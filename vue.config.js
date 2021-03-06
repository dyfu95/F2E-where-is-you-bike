module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/F2E-where-is-you-bike/' : '/',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
