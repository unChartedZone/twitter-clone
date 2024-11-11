import type {
  TweetResponse,
  TweetListResponse,
  Data,
} from "@/types/ResponseTypes";
import type { BaseUser } from "@/models/User";
import type Tweet from "@/models/Tweet";

export function transformTweetResponse(res: TweetResponse): Tweet {
  const userMap = createUserMap(res.included);

  return {
    ...res.data.attributes,
    id: res.data.id,
    user: userMap.get(res.data.relationships?.user.data.id ?? ""),
  };
}

export function transformTweetListResponse(res: TweetListResponse): Tweet[] {
  const userMap = createUserMap(res.included);

  return res.data.map((tweet) => ({
    ...tweet.attributes,
    id: tweet.id,
    user: userMap.get(tweet.relationships?.user.data.id ?? ""),
  }));
}

function createUserMap(userData: Data<BaseUser>[]): Map<string, BaseUser> {
  return userData.reduce((acc, value) => {
    acc.set(value.id, {
      ...value.attributes,
      id: value.id,
    });
    return acc;
  }, new Map<string, BaseUser>());
}

export function getQueryParams(url: string): Record<string, string> {
  const queryString = url.split("?")[1];
  const params: Record<string, string> = {};

  if (queryString) {
    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
}
