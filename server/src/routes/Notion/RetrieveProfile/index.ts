import { Context } from 'koa';
import KoaRouter from 'koa-router';
import { Client } from '@notionhq/client/build/src';

import { HttpStatus, IDataResponse } from '../../../models/response.model';
import { NotionConfig } from '../../../configs/notion.config';
import { IProfile } from '../../../models/profile.model';

const retrieveProfileRouter = new KoaRouter();
const notionClient = new Client({ auth: NotionConfig.NotionSecret });

retrieveProfileRouter.get('/api/profile/query/all', async (ctx: Context) => {
  const responseBody: IDataResponse<IProfile[]> = {
    status: 0,
    msg: '',
    data: []
  };
  try {
    const queryResult = await notionClient.databases.query({
      database_id: NotionConfig.DatabaseId
    });
    const profileArr: IProfile[] = queryResult.results.map((item) => {
      const o: any = item;
      return {
        pageId: o.id,
        profile: {
          id: o.properties.id['title'][0]['plain_text'],
          pwd: o.properties.pwd['rich_text'][0]['plain_text'],
          salt: o.properties.salt['rich_text'][0]['plain_text'],
          token: o.properties.token['rich_text'][0]['plain_text']
        }
      };
    });
    responseBody.data = profileArr;
    responseBody.status = HttpStatus.OK;
    responseBody.msg = '查询成功';
  } catch (err: any) {
    responseBody.status = HttpStatus['Bad Request'];
    responseBody.msg = err.message;
    console.error('Create Profile Router Error.', err);
  } finally {
    ctx.response.status = responseBody.status;
    ctx.response.body = responseBody;
  }
});

export default retrieveProfileRouter;
