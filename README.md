# BNUZ-Clock-In

## 为什么要重构系统

1. 重构前的系统是假期实习期间在不了解打卡系统的 API 的情况下匆忙完成的，是基于 Python + Selenium 模拟用户点击操作实现打卡操作。目前空闲下来之后，去了解了一下打卡系统的 API，使用直接发送请求的方式实现打卡。

2. 重构前的系统前端使用的是 Vue + Vue Router。由于之后的实习主要使用到 React，所以借这次机会学习一下 React 的知识。

3. 重构前使用 Javascript 来实现。使用 Typescript 实现前后端项目。

## 功能特性

- [x] 支持微信推送打卡结果
- [ ] 支持 Telegram Bot 提交用户信息

## 基于 [Notion Api](https://developers.notion.com/) 存储数据

- [Query Database](https://developers.notion.com/reference/post-database-query)

- [Retrieve a Page](https://developers.notion.com/reference/retrieve-a-page)

- [Create a Page](https://developers.notion.com/reference/post-page)

- [Update Page](https://developers.notion.com/reference/patch-page)
