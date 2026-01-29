"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const articles_1 = require("./routes/articles");
const app = new koa_1.default();
const router = new koa_router_1.default();
const welcomeAPI = async (ctx, next) => {
    ctx.body = {
        message: "Welcome to the blog API! (testing)"
    };
    await next();
};
router.get('/api/v1', welcomeAPI);
app.use((0, koa_logger_1.default)());
app.use((0, koa_json_1.default)());
app.use(router.routes());
app.use(articles_1.router.routes());
app.use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = { err: "no such endpoint existed" };
        }
    }
    catch (err) {
        ctx.body = { err: err };
    }
});
app.listen(10888, () => {
    console.log("Koa Started");
});
//# sourceMappingURL=index.js.map