import { FeedPostData } from "./FeedPost.type";

export type FeedPostResponse = {
  nextCursor: number;
  values: FeedPostData[];
};
