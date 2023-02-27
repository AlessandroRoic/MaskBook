import "./SharePopup.scss";
import { useEffect, useRef } from "react";

export function SharePopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClose]);

  return (
    <>
      <div className="share-popup__wrapper" ref={ref}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11l-7-9v5C3.047 7 1.668 16.678 2 22c.502-2.685.735-7 13-7v5l7-9z" />
          </svg>
          Share now (Only me)
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z" />
            <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
          </svg>
          Share to Feed
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Share to your Story
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" />
            <path d="M2 8l7.501 6.001a4 4 0 0 0 4.998 0L22 8" />
          </svg>
          Send in Messenger
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 15h13.865a1 1 0 0 0 .768-1.64L15 9l3.633-4.36A1 1 0 0 0 17.865 3H4v18" />
          </svg>
          Share to a Page
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16.719 19.752l-.64-5.124A3 3 0 0 0 13.101 12h-2.204a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 9.266 22h5.468a2 2 0 0 0 1.985-2.248z" />
            <circle cx="12" cy="5" r="3" />
            <circle cx="4" cy="9" r="2" />
            <circle cx="20" cy="9" r="2" />
            <path d="M4 14h-.306a2 2 0 0 0-1.973 1.671l-.333 2A2 2 0 0 0 3.361 20H7" />
            <path d="M20 14h.306a2 2 0 0 1 1.973 1.671l.333 2A2 2 0 0 1 20.639 20H17" />
          </svg>
          Share to a Group
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="7" cy="5" r="3" />
            <path d="M10 12H5.898a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 4.266 22H9" />
            <path d="M21.719 19.752l-.64-5.124A3 3 0 0 0 18.101 12h-2.204a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 14.266 22h5.468a2 2 0 0 0 1.985-2.248z" />
            <circle cx="17" cy="5" r="3" />
          </svg>
          Share on a friend's profile
        </button>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow"
      >
        <path d="M12 17L6 9h12l-6 8z" />
      </svg>
    </>
  );
}
