export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string;
  birthDate?: string; // YYYY-MM-DD
  joinDate: Date;
  location?: string;
  website?: string;
  profileImage?: string;
  bannerImage?: string;
  totalFollowing: number;
  totalFollowers: number;
  totalTweets: number;
  isFollowing?: boolean;
}

// User fields that are typically modified
export interface UserPatch {
  name?: string;
  bio?: string;
  birthDate?: string; // YYYY-MM-DD
  location?: string;
  website?: string;
}

export interface UserSummary {
  id: string;
  name: string;
  username: string;
  profileImageUrl: string;
}
