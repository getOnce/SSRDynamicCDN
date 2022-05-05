import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();
const ssr = require(`${process.cwd()}/dist/ssr/app.js`);
router.get('/', async (ctx, next) => {
    await new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const staticUrl = 'http://127.0.0.1:1000';
        const { pipe, abort } = ssr({
            title: '测试动态CDN',
            cssEntry: `${staticUrl}/myapp/static/css/app.css`,
            staticUrl,
            options: {
                bootstrapScripts: [`${staticUrl}/myapp/static/js/app.js`],
                onError(e: Error) {
                    console.log(`onError e.message : `, e.message);
                    reject({ code: 500 });
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
                onShellError(e: Error) {
                    console.log(`onShellError e.message : `, e.message);
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
