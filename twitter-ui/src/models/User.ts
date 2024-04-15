export interface BaseUser {
  email: string;
  username: string;
  name: string;
  profileImage: string;
  bannerImage: string;
}

export default interface User extends BaseUser {
  id: string;
  accessToken: string;
}
