# study网站的后台页面项目，用于视频的管理上传等功能



关于下载

```git
  git clone https://git.coding.net/dyyao/study-admin.git
```
安装包依赖。

```git
  npm install
```

安装问题  node-sass安装不上

因为安装node-sass默认走的是国外的github路线。所以导致很多同学安装依赖不成功。可以使用以下方法更换binary的下载地址。

```git
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

之后再安装node-sass的都会默认走的淘宝的路线。