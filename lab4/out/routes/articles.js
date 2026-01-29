"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router = new koa_router_1.default({ prefix: '/api/v1/articles' });
exports.router = router;
const articles = [
    { title: 'hello article', fullText: 'some text here to fill the body', views: 100, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025" },
    { title: 'another article', fullText: 'again here is some text here tofill', views: 200, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025" },
    { title: 'coventry university ', fullText: 'some news about coventry university', views: 300, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025" },
    { title: 'smart campus', fullText: 'smart campus is coming to IVE', views: 400, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025" }
];
const getAll = async (ctx, next) => {
    ctx.body = articles;
    await next();
};
const getByid = async (ctx, next) => {
    const id = Number(ctx.params.id);
    if (!Number.isInteger(id) || id > articles.length || id <= 0) {
        ctx.status = 400;
        ctx.body = "invaid Id";
    }
    else {
        ctx.body = articles[id - 1];
    }
    await next();
};
const createArticle = async (ctx, next) => {
    let { title, fullText, views, creationDate, editedDate } = ctx.request.body;
    let newArticle = { title: title, fullText: fullText, views: views, creationDate: creationDate, editedDate: editedDate };
    articles.push(newArticle);
    ctx.status = 201;
    ctx.body = newArticle;
    await next();
};
const UpdateArticle = async (ctx, next) => {
    const id = Number(ctx.params.id);
    // let {title, fullText}:any = ctx.request.body;
    if (!Number.isInteger(id) || id > articles.length || id <= 0) {
        ctx.status = 400;
        ctx.body = "invaid Id";
    }
    else {
        let article = ctx.request.body;
        articles[id - 1].title = article.title;
        articles[id - 1].fullText = article.fullText;
        articles[id - 1].views = article.views;
        articles[id - 1].creationDate = article.creationDate;
        articles[id - 1].editedDate = article.editedDate;
        ctx.status = 200;
        ctx.body = article;
    }
    await next();
};
const deleteArticle = async (ctx, next) => {
    const id = Number(ctx.params.id);
    // let {title, fullText}:any = ctx.request.body;
    if (!Number.isInteger(id) || id > articles.length || id <= 0) {
        ctx.status = 400;
        ctx.body = "invaid Id";
    }
    else {
        articles.splice(id - 1, 1);
        ctx.status = 200;
        ctx.body = {
            message: `article ${id} deleted`
        };
    }
    await next();
};
router.get('/', getAll);
router.get('/:id', getByid);
router.post('/', (0, koa_bodyparser_1.default)(), createArticle);
router.put('/:id', (0, koa_bodyparser_1.default)(), UpdateArticle);
router.delete('/:id', deleteArticle);
//# sourceMappingURL=articles.js.map