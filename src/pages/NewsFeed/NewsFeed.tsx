import React, { useCallback, useEffect, useState } from "react";
import "./NewsFeed.scss";
import { FeedPostData } from "../../types/FeedPost.type";
import FeedPost from "../../components/FeedPost/FeedPost";
import useApiService from "../../services/useApiService";
import { InfiniteScroll } from "../../components/InfiniteScroll/InfiniteScroll";

export default function NewsFeed() {
  const [posts, setPosts] = useState<FeedPostData[]>([]);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);

  const updateCursor = useCallback(() => setCursor(nextCursor), [nextCursor]);

  useEffect(() => {
    let ignore = false;
    const { fetchFeedPostData } = useApiService();
    const getPostData = async () => {
      if (ignore) return;
      const response = await fetchFeedPostData(cursor);
      if (!response.values || !response.nextCursor) return;
      setPosts((posts) =>
        response.nextCursor !== posts.length
          ? [
              ...posts,
              ...response.values.map((data) => ({
                ...data,
                createdTime: new Date(data.createdTime),
              })),
            ]
          : posts
      );
      setNextCursor(response.nextCursor);
    };

    getPostData();

    return () => {
      ignore = true;
    };
  }, [cursor]);

  return (
    <div className="news-feed__wrapper">
      <InfiniteScroll callBack={updateCursor}>
        {!!posts.length &&
          posts.map(({ id, createdTime, author, content, interactions }) => (
            <FeedPost
              key={id}
              createdTime={createdTime}
              author={author}
              content={content}
              interactions={interactions}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}
