# tg-admin

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

## commit message 格式规范

```
提交commit， 用 git cz 来代替 git commit 提交代码
```

**如果没法使用这命令，请全局安装**

```
npm install commitizen -g
```

commit message 由 Header、Body、Footer 组成。

### Header 说明

Header 部分包括三个字段 type（必需）、scope（必需）和 subject（必需）。
我们这里用 Header，其它不用

```
<type>: <scope>: <subject>
```

### type 用于说明 commit 的提交类型（必须是以下几种之一）

| 值       | 描述                                                       |
| -------- | ---------------------------------------------------------- |
| feat     | 新增功能                                                   |
| fix      | 修复 bug                                                   |
| docs     | 文档变更                                                   |
| style    | 代码格式（不影响功能，例如空格、分号等格式修正             |
| refactor | 代码重构（不包括 bug 修复、功能新增）                      |
| perf     | 性能优化                                                   |
| test     | 添加、修改测试用例                                         |
| build    | 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等 |
| chore    | 对构建过程或辅助工具和库的更改（不影响源文件、测试用例)    |
| revert   | 回滚 commit                                                |
| ci       | 修改 CI 配置、脚本之类                                     |

### scope 用于指定本次 commit 影响的范围。scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。（scope 可省略）

| 值            | 描述         |
| ------------- | ------------ |
| components    | 组件相关     |
| hooks         | hook 相关    |
| utils         | utils 相关'  |
| ant-Design-UI | 对 UI 的调整 |
| styles        | 样式相关     |
| deps          | 项目依赖     |
| auth          | 对 auth 修改 |
| other         | 其他修改     |

### subject 是本次 commit 的简洁描述
