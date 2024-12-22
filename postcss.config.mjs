/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 10,  // 基准值，通常是 16px
      propList: ['*'],  // 所有属性都将转换 px 为 rem
      unitPrecision: 5,  // 精度，保留小数点后 5 位
      selectorBlackList: [],  // 忽略转换的选择器，可以指定特定的选择器进行排除
      replace: true,  // 是否替换原来的 px 为 rem
      mediaQuery: false,  // 是否在媒体查询中转换 px
      minPixelValue: 0  // 最小 px 值，低于该值的 px 不会被转换
    }
  },
};

export default config;
