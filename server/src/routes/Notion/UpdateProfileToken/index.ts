import { Context } from 'koa';
import KoaRouter from 'koa-router';
import { Client } from '@notionhq/client';

import { NotionConfig } from '../../../configs/notion.config';
import { HttpStatus, IBaseResponse } from '../../../models/response.model';
import {
  queryProfileWithFilterParams,
  updateProfileToken
} from '../../../utils/notionParams';

const updateProfileTokenRouter = new KoaRouter();

export interface IUpdateProfileTokenBody {
  studentId: string;
  token: string;
}

updateProfileTokenRouter.patch('/api/profile/update', async (ctx: Context) => {
  const responseBody: IBaseResponse = { status: 0, msg: '' };
  try {
    // studentId 用来查询用户是否在表中
    const { studentId, token }: IUpdateProfileTokenBody = ctx.request.body;
    if (!studentId || !token) {
      throw new TypeError('缺少关键参数');
    }

    const notionClient = new Client({ auth: NotionConfig.NotionSecret });
    // 查询是否存在这个用户
    const queryResult = await notionClient.databases.query(
      queryProfileWithFilterParams(studentId)
    );
    const [profile] = queryResult.results;
    if (!profile) {
      throw new Error('用户不存在');
    }
    await notionClient.pages.update(updateProfileToken(profile.id, token));
    responseBody.status = HttpStatus.OK;
    responseBody.msg = '更新成功';
  } catch (err: any) {
    responseBody.status = HttpStatus['Bad Request'];
    responseBody.msg = err.message;
    console.error('Update Profile Token Router Error.', err);
  } finally {
    ctx.response.status = responseBody.status;
    ctx.response.body = responseBody;
  }
});

export default updateProfileTokenRouter;
