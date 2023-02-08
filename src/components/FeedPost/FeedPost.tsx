import React from "react";
import "./FeedPost.scss";
import { FeedPostData } from "../../types/FeedPost.type";
import ThumbsUp from "../../assets/icons/ThumbsUp";

export type FeedPostProps = Partial<FeedPostData> & {};

export default function FeedPost({
  createdTime,
  author,
  content,
  interactions,
}: FeedPostProps) {
  return (
    <article className="feed-post__wrapper">
      <div className="feed-post__header">
        <img
          className="header__profile-pic"
          alt="profile-pic"
          src={author?.profilePhotoUrl}
          height={40}
          width={40}
        />
        <div className="header__info">
          <b>{`${author?.firstName} ${author?.lastName}`}</b> <br />
          {createdTime?.toLocaleDateString()}
        </div>
      </div>
      <div className="feed-post__content">
        <div className="content__text">{content?.description}</div>
        {content?.imageSrc && (
          <img alt="content-image" src={content?.imageSrc} className="content__image"/>
        )}
      </div>
      <div className="feed-post__interactions">
        <div>
          <ThumbsUp height={14} width={14} />
          {" "}{interactions?.reactions}
        </div>
        <div className="flex-row">
          <div>Comments: {interactions?.comments}</div>
          <div>Shares: {interactions?.shares}</div>
        </div>
      </div>
      <div className="feed-post__actions">
        <div className="flex-row flex-center">
          <ThumbsUp height={18} width={18} /> Like
        </div>
        <div>Comment</div>
        <div>Share</div>
      </div>
    </article>
  );
}
