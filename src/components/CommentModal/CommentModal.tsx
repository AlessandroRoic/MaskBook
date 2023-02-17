import { Modal } from "../Modal/Modal";
import "./CommentModal.scss";
import FeedPost, { FeedPostProps } from "../FeedPost/FeedPost";
import { useMemo, useState } from "react";
import { Close } from "../../assets/icons/Close";

type CommentModalProps = {
  show: boolean;
  onClose: () => void;
  feedPostProps: FeedPostProps;
};

export function CommentModal({
  show,
  onClose,
  feedPostProps,
}: CommentModalProps) {
  const [comment, setComment] = useState("");
  const posterName = useMemo(
    () =>
      `${feedPostProps.author?.firstName} ${feedPostProps.author?.lastName}`,
    [feedPostProps]
  );

  return (
    <Modal show={show}>
      <div className="comment-modal">
        <div className="comment-modal__header">
          <div className="comment-modal__placeholder"></div>
          <h2 className="comment-modal__poster">{posterName}'s Post</h2>
          <button className="comment-modal__close" onClick={onClose}>
            <Close fill="rgba(255, 255, 255, 0.1)" />
          </button>
        </div>
        <div className="comment-modal__content">
          <FeedPost {...feedPostProps} />
        </div>
        <div className="comment-modal__footer">
          <img
              className="comment-modal__profile-icon"
            src={feedPostProps.author?.profilePhotoUrl}
            alt="user profile pic"
            height={32}
            width={32}
          />
          <input
            className="comment-modal__comment-field"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
          />
        </div>
      </div>
    </Modal>
  );
}
