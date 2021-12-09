import { Context } from 'koa';
import KoaRouter from 'koa-router';
import { IBaseResponse, HttpStatus } from '../../../models/response.model';

const serverTestRouter = new KoaRouter();

serverTestRouter.get('/api/test', (ctx: Context) => {
  const responseBody: IBaseResponse = { status: 0, msg: '' };
  try {
    responseBody.status = HttpStatus.OK;
    responseBody.msg = 'Hello World.';
  } catch (err) {
    responseBody.status = HttpStatus['Internal Server Error'];
    responseBody.msg = 'Hello World.';
    console.error('Server Test Router Error.', err);
  } finally {
    ctx.response.status = responseBody.status;
    ctx.response.body = responseBody;
  }
});

export default serverTestRouter;
