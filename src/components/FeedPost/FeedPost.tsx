import React, { useState } from "react";
import "./FeedPost.scss";
import { FeedPostData } from "../../types/FeedPost.type";
import ThumbsUp from "../../assets/icons/ThumbsUp";
import { CommentModal } from "../CommentModal/CommentModal";
import { useVirtualizedElement } from "../VirtualizedList/useVirtualizedElement";
import { SharePopup } from "../SharePopup/SharePopup";

export type FeedPostProps = Partial<FeedPostData> & {
  isModal?: boolean;
  id: string;
};

export default function FeedPost({
  createdTime,
  author,
  content,
  interactions,
  isModal = false,
  id,
}: FeedPostProps) {
  const [likedPost, setLikedPost] = useState(false);
  const [commentModalVisible, showCommentModal] = useState(false);
  const [sharePopupVisible, showSharePopup] = useState(false);
  const { isVisible, elementRef, placeholderHeight } = isModal
    ? useVirtualizedElement(id)
    : { isVisible: true, elementRef: null, placeholderHeight: null };

  return (
    <article
      className={isVisible ? "feed-post__wrapper" : ""}
      ref={elementRef}
      style={placeholderHeight ? { height: placeholderHeight } : {}}
    >
      {isVisible && (
        <>
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
              <img alt="content-image" src={content?.imageSrc} />
            )}
          </div>
          <div className="feed-post__interactions">
            <div className="flex-row">
              <ThumbsUp height={14} width={14} /> {interactions?.reactions}
            </div>
            <div className="flex-row">
              <div>Comments: {interactions?.comments}</div>
              <div>Shares: {interactions?.shares}</div>
            </div>
          </div>
          <div className="feed-post__actions">
            <button
              className={`action ${likedPost ? "action--clicked" : ""}`}
              onClick={() => setLikedPost((prev) => !prev)}
            >
              <ThumbsUp height={18} width={18} /> Like
            </button>
            <button
              className="action"
              onClick={() => !isModal && showCommentModal(true)}
            >
              Comment
            </button>
            <button className="action" onClick={() => showSharePopup(true)}>
              Share
            </button>
            {sharePopupVisible && (
                <SharePopup onClose={() => showSharePopup(false)} />
            )}
          </div>
        </>
      )}
      {!isModal && (
        <CommentModal
          show={commentModalVisible}
          onClose={() => showCommentModal(false)}
          feedPostProps={{
            createdTime,
            author,
            content,
            interactions,
            isModal: true,
            id,
          }}
        />
      )}
    </article>
  );
}
