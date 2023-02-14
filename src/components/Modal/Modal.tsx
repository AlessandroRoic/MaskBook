import { ReactNode } from "react";
import "./Modal.scss";

export type ModalProps = {
  children: Array<ReactNode> | ReactNode;
  show: boolean;
};

export function Modal({ children, show }: ModalProps) {
  return (
    <>
      {show && (
        <div className="modal">
          <div>{children}</div>
        </div>
      )}
    </>
  );
}
