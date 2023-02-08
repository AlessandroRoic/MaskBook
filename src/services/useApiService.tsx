import { FeedPostResponse } from "../types/FeedPostResponse.type";

export default function useApiService() {
  const apiService = <T,>(promise: Promise<Response>): Promise<T> =>
    promise
      .then((data: any) => data.json())
      .then((data) => data.response as T)
      .catch((err) => err);

  const fetchFeedPostData = (cursor = 0, size = 10) =>
    apiService<FeedPostResponse>(
      fetch(`http://localhost:8000/feedPosts?cursor=${cursor}&size=${size}`)
    );

  return {
    apiService,
    fetchFeedPostData,
  };
}
