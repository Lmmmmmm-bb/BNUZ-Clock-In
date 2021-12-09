import {
  CreatePageParameters,
  QueryDatabaseParameters,
  UpdatePageParameters
} from '@notionhq/client/build/src/api-endpoints';

import { NotionConfig } from '../configs/notion.config';

export const createProfileParams = (
  studentId: string,
  encryptedPwd: string,
  salt: string
): CreatePageParameters => ({
  parent: {
    database_id: NotionConfig.DatabaseId
  },
  properties: {
    id: {
      title: [{ text: { content: studentId } }]
    },
    pwd: {
      rich_text: [
        {
          type: 'text',
          text: { content: encryptedPwd }
        }
      ]
    },
    salt: {
      rich_text: [
        {
          type: 'text',
          text: { content: salt }
        }
      ]
    }
  }
});

export const queryProfileWithFilterParams = (
  studentId: string
): QueryDatabaseParameters => ({
  database_id: NotionConfig.DatabaseId,
  filter: {
    property: 'id',
    text: { equals: studentId }
  }
});

export const updateProfileParams = (
  pageId: string,
  content: string,
  salt: string
): UpdatePageParameters => ({
  page_id: pageId,
  properties: {
    pwd: {
      rich_text: [
        {
          type: 'text',
          text: { content }
        }
      ]
    },
    salt: {
      rich_text: [
        {
          type: 'text',
          text: { content: salt }
        }
      ]
    }
  }
});

export const updateProfileToken = (
  pageId: string,
  token: string
): UpdatePageParameters => ({
  page_id: pageId,
  properties: {
    token: {
      rich_text: [
        {
          type: 'text',
          text: { content: token }
        }
      ]
    }
  }
});
