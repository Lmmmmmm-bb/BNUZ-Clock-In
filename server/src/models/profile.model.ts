export interface IProfile {
  pageId: string;
  profile: IBaseProfile;
}

export interface IBaseProfile {
  id: string;
  pwd: string;
  salt: string;
  token: string;
}
