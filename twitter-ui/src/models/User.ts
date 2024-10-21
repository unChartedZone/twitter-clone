export interface BaseUser {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string;
  birthDate?: string;
  joinDate: Date;
  location?: string;
  website?: string;
  profileImage?: string;
  bannerImage?: string;
  totalFollowing: number;
  totalFollowers: number;
}

// User fields that are typically modified
export interface UserPatch {
  name?: string;
  bio?: string;
  birthDate?: Date;
  location?: string;
  website?: string;
}

export default interface User extends BaseUser {
  accessToken: string;
}
