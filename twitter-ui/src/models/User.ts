export interface BaseUser {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string;
  dateOfBirth?: string;
  location?: string;
  website?: string;
  profileImage?: string;
  bannerImage?: string;
}

// User fields that are typically modified
export interface UserPatch {
  name?: string;
  bio?: string;
  dateOfBirth?: string;
  location?: string;
  website?: string;
}

export default interface User extends BaseUser {
  accessToken: string;
}
