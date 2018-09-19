const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const render=require('koa-art-template');
var cors = require('koa-cors');
let path=require('path');
let OSS = require('ali-oss');
let STS = OSS.STS;
let sts = new STS({
    accessKeyId:'LTAINkiaOSo4KJ28',
    accessKeySecret:'qVYm5MQcuLrdk0Dqkp8KoKL9DUBWKx'
});
render(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug:process.env.NODE_ENV!=='production' }
    );
app.use(cors());
app.use(async (ctx,next)=>{
    let token = await sts.assumeRole('acs:ram::1809406158160863:role/ramtesttappreadonly',null,null,'kk');
    ctx.body=token;
    await next();
});
router.get('/', function (ctx, next) {
     console.log('well');
});
router.get('/news',async (ctx,next)=>{
    await ctx.render('index');
});
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑
app.listen(3000,()=>{
    console.log('starting at port 3000');
});
