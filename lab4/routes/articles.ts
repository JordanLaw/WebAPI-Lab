import Router, {RouterContext} from "koa-router";
import bodyparser from "koa-bodyparser";

const router = new Router({prefix: '/api/v1/articles'});

const articles = [
    {title:'hello article', fullText:'some text here to fill the body', views: 100, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025"},
    {title:'another article', fullText:'again here is some text here tofill', views: 200, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025"},
    {title:'coventry university ', fullText:'some news about coventry university', views: 300, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025"},
    {title:'smart campus', fullText:'smart campus is coming to IVE', views: 400, creationDate: "1 Jan 2025", editedDate: "1 Feb 2025"}
];

const getAll = async (ctx: RouterContext, next: any) => {
    ctx.body = articles;
    await next();

}

const getByid = async (ctx: RouterContext, next: any) => {
    const id = Number(ctx.params.id);

    if (!Number.isInteger(id) || id > articles.length || id <= 0){
        ctx.status = 400;
        ctx.body = "invaid Id";
    } else {
        ctx.body = articles[id-1];
    }
    
    await next();

}

const createArticle = async (ctx: RouterContext, next: any) => {
    let {title, fullText, views, creationDate, editedDate}:any = ctx.request.body;

    let newArticle = {title:title, fullText:fullText, views:views, creationDate:creationDate, editedDate:editedDate};

    articles.push(newArticle);

    ctx.status = 201;
    ctx.body = newArticle;
    
    await next();

}

const UpdateArticle = async (ctx: RouterContext, next: any) => {
    const id = Number(ctx.params.id);

    // let {title, fullText}:any = ctx.request.body;

     if (!Number.isInteger(id) || id > articles.length || id <= 0){
        ctx.status = 400;
        ctx.body = "invaid Id";
    } else {

        let article:any = ctx.request.body;

        articles[id-1].title = article.title;
        articles[id-1].fullText = article.fullText;
        articles[id-1].views = article.views;
        articles[id-1].creationDate = article.creationDate;
        articles[id-1].editedDate = article.editedDate;

        ctx.status = 200;
        ctx.body = article;
        
    }
    
    await next();

}

const deleteArticle = async (ctx: RouterContext, next: any) => {
     const id = Number(ctx.params.id);

    // let {title, fullText}:any = ctx.request.body;

     if (!Number.isInteger(id) || id > articles.length || id <= 0){
        ctx.status = 400;
        ctx.body = "invaid Id";
    } else {

        articles.splice(id-1, 1);
        ctx.status = 200;
        ctx.body = {
            message: `article ${id} deleted`
        };

    }
    await next();


}

router.get('/', getAll);
router.get('/:id', getByid);
router.post('/', bodyparser(), createArticle);
router.put('/:id', bodyparser(), UpdateArticle);
router.delete('/:id', deleteArticle);

export { router }