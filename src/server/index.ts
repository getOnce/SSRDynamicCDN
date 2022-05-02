import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="http://127.0.0.1:1000/myapp/static/css/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="http://127.0.0.1:1000/myapp/static/js/app.js"></script>
  </body>
  </html>
  `;
});

app.use(router.routes());
app.listen(3000, () => {
    console.log(`node server http://localhost:3000 已启动`);
});
