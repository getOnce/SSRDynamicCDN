import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();
const ssr = require(`${process.cwd()}/dist/ssr/app.js`);
router.get('/', async (ctx, next) => {
    await new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { pipe, abort } = ssr({
            title: '测试动态CDN',
            cssEntry: `http://127.0.0.1:1000/myapp/static/css/app.css`,
            staticUrl: `http://127.0.0.1:1000`,
            options: {
                bootstrapScripts: [
                    `http://127.0.0.1:1000/myapp/static/js/app.js`,
                ],
                onError() {
                    console.log(`onError`);
                    reject({ code: 501 });
                },
                onAllReady() {
                    console.log(`onShellReady`);
                    ctx.respond = false;
                    ctx.res.statusCode = 200;
                    ctx.response.set('content-type', 'txt/html');
                    ctx.type = 'html';
                    pipe(ctx.res);
                    ctx.res.end();
                    resolve({ code: 200 });
                    console.log(`onShellReady done`);
                },
                onShellError() {
                    console.log(`onShellError`);
                    reject({ code: 500 });
                },
            },
        });
    });
});

app.use(router.routes());
app.listen(3000, () => {
    console.log(`node server http://localhost:3000 已启动`);
});
