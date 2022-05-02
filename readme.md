# browser 端静态资源设置动态 CDN

```
Q1 ：当主域名与静态资源域名不一样的时候，懒加载的图片与组件如何动态设置 CDN

A1 ：
  a、设置 webpack publicPath 为 'auto'
  b、把原来的publicPath(不包括域名)中的路径放到output.path中
  c、webpack-dev-server中devMiddleware中的publicPath = publicPath.slice(0, -1),

```

```
注意：背景图的地址变化
```
