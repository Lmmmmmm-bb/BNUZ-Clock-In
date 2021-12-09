import { Context } from 'koa';
import KoaRouter from 'koa-router';
import { Client } from '@notionhq/client';

import { NotionConfig } from '../../../configs/notion.config';
import { HttpStatus, IBaseResponse } from '../../../models/response.model';
import {
  queryProfileWithFilterParams,
  updateProfileParams,
  createProfileParams
} from '../../../utils/notionParams';

const createProfileRouter = new KoaRouter();

export interface IProfileCreateBody {
  studentId: string;
  encryptedPwd: string;
  salt: string;
}

createProfileRouter.put('/api/profile/create', async (ctx: Context) => {
  const responseBody: IBaseResponse = { status: 0, msg: '' };
  try {
    const { studentId, encryptedPwd, salt }: IProfileCreateBody =
      ctx.request.body;
    if (!studentId || !encryptedPwd || !salt) {
      throw new TypeError('缺少关键参数');
    } else if (!/\d{10}/.test(studentId.trim())) {
      throw new Error('请输入正确的学号');
    }

    const notionClient = new Client({ auth: NotionConfig.NotionSecret });
    const queryResult = await notionClient.databases.query(
      queryProfileWithFilterParams(studentId)
    );
    const [profile] = queryResult.results;
    if (profile) {
      await notionClient.pages.update(
        updateProfileParams(profile.id, encryptedPwd, salt)
      );
      responseBody.msg = '更新成功';
    } else {
      await notionClient.pages.create(
        createProfileParams(studentId, encryptedPwd, salt)
      );
      responseBody.msg = '提交成功';
    }
    responseBody.status = HttpStatus.OK;
  } catch (err: any) {
    responseBody.status = HttpStatus['Bad Request'];
    responseBody.msg = err.message;
    console.error('Create Profile Router Error.', err);
  } finally {
    ctx.response.status = responseBody.status;
    ctx.response.body = responseBody;
  }
});

export default createProfileRouter;
