const config = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11',
        },
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = [
    [
      'module-resolver', // 절대경로 설정
      {
        root: ['./src'],
        alias: {
          imgs: './public/images',
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};

module.exports = config;
