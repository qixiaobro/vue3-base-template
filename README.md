# vue3-base-template
使用`vue3+TypeScript+Element-ui`封装的项目基础模版。在模版基础搭建完成后，会建立不同分支。初步规划为PC和H5版本,进一步封装。H5版本封装媒体查询、分化出微信h5版本，封装微信jsApi的调用。



- [ ] vue.config.js 配置
- [ ] vuex  /模块分解
- [ ] vue-router/ 守卫封装
- [ ] element-ui
- [ ] type /typescript 类封装
- [ ] axios封装
- [ ] .env.prod  .env.test
- [ ] utils  /工具封装
- [ ] theme
- [ ] styles
- [ ] api模块
- [ ] views
- [ ] less
- [ ] components

base-plugins:

- [x] 修复HMR(热更新)失效
- [x] 添加别名
- [x] `image-webpack-loader`压缩图片
- [x] `webpack-bundle-analyzer`打包后文件大小分析
- [x] 比 gzip 体验更好的 Zopfli 压缩
- [x] 配置proxy代理解决跨域问题
- [ ] less css预设

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
