import { Modal } from "../Modal/Modal";
import "./CommentModal.scss";
import FeedPost, { FeedPostProps } from "../FeedPost/FeedPost";

type CommentModalProps = {
  show: boolean;
  feedPostProps: FeedPostProps;
};

export function CommentModal({ show, feedPostProps }: CommentModalProps) {
  return (
    <Modal show={show}>
      <div className="comment-modal">
        <FeedPost {...feedPostProps} />
        <div className="flex-column">

        </div>
      </div>
    </Modal>
  );
}
