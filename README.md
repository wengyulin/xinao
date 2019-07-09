# 气源管理管理端前端

## 项目概述
* 项目使用 create-react-app typescript 搭建, UI 库使用 antd, 路由使用 react-router v4,数据管理基于 redux/redux-saga
* 配置文件使用 react-app-rewired customize-cra 覆盖默认配置文件

* 安装依赖

``` bash
yarn
# or
npm i
```

* 启动 

``` bash
npm start
```

* 打包

``` bash
npm run build
```

## 项目结构
``` bash
App
│ .env 通用环境变量
│ .env.production 生产环境变量
│ .env.development 开发环境变量
├─config-overrides.js 覆盖 react 默认配置文件
├─theme antd 主题文件
├─.eslintrc.js eslint 配置文件
├─.npmrc
├─.yarnrc
├─public 静态资源文件,无需通过编译的静态资源
├─src
│  ├─components 通用组件
│  ├─layout 布局组件
│  ├─config 配置文件
│  ├─pages 页面文件
│  ├─Router 路由文件
│  ├─store
│  │   ├─config 全局配置模块
│  │   ├─user 用户登录信息模块
│  │   ├─rootReducers.ts
│  │   ├─rootSagas.ts
│  │   ├─store.ts
│  ├─styles
│  │    ├─core.scss 全局css样式
│  │    ├─mixin.scss
│  │    ├─rest.scss
│  │    ├─variable.scss
│  ├─types 全局类型文件
│  ├─utils 工具文件
│  ├─setupProxy.js 前端代理文件
```

## 编程风格
* tsx 文件名: 使用大驼峰命名法, eg: MyComponent.tsx
* 组件命名: 组件名称和文件名应该一致,如 Component 组件名称应该是 MyComponent,一个目录的根组件使用 index.ts 导出

## 开发注意
* 项目尽可能使用 react-hooks 开发
* scss 在组件中只允许 css-module 模式,及 component.module.scss, 需要全局样式需放在 styles/global.scss
* 环境变量配置在 env env.production env.development 配置文件里面
* service 就近原则,可放在 store 里面,也可以放在 page 目录下

## 开发依赖
* 框架 [react](https://zh-hans.reactjs.org/)
* 路由 [react-router](https://reacttraining.com/react-router/)
* 数据管理 [redux](https://redux.js.org/)/[redux-saga](https://redux-saga.js.org/)
* 数据持久化 [redux-persist](https://github.com/rt2zz/redux-persist)/[localforage](https://github.com/localForage/localForage)
* Ajax [axios](https://github.com/axios/axios)
* immutable [immutability-helper](https://github.com/kolodny/immutability-helper)
* 动画 [react-spring](https://www.react-spring.io/)
* 时间处理 [moment](https://momentjs.com/)
* 序列化/反序列化 [qs](https://github.com/ljharb/qs)
* 滚动条 [react-custom-scrollbars](https://malte-wessel.com/react-custom-scrollbars/)
* createAction [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)

## git 流程

#### master/dev
* 常驻分支只有 master/dev,其余分支在结束后都合并到 master/dev 分支上
* master 只用来发布重大版本,而且发布版本需要打 tag, tag 命名 x.x.x
* 日常开发在 dev 分支上,部署测试版需要打 tag, tag 命名 x.x.x-nightly

#### feature/release/bugfix
* feature 分支为了开发特定功能,命名 feature-x,开发完成后合并到 dev 分支上
* release 分支为预生产环境,命名 release-x.x.x,预发布结束后合并到 master 分支,再在合并到 dev 分支,并删除预生产分支
* bugfix 分支为修补正式环境的分支,修补结束后分别合并到 master/dev 分支上,删除 bugfix 分支

#### person 分支
* 个人分支不建议提交到代码仓库上,如若提交,在功能开发之后删除分支
