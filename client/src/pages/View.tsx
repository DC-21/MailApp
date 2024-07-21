import React from "react";
import { Link } from "react-router-dom";
import { Email } from "../typs/interfaces";

interface ModalProps {
  email: Email;
  onClose: () => void;
}

const stripHtml = (html: string) => {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const parseContent = (text: string) => {
  // Remove common email headers and footers and unwanted patterns
  const headerFooterRegex =
    /(--+|_+|-----|On.*wrote:|From:.*Sent:.*To:.*Subject:|Sent from my.*|^[>\|].*|Content-Type:.*; charset=.*|Content-Transfer-Encoding:.*|^MIME-Version:.*|Content-ID:.*)/gi;
  text = text.replace(headerFooterRegex, "");

  // Remove random alphanumeric strings (like "000000000000096b71061dba79bc")
  const randomStringRegex = /\b[A-Fa-f0-9]{24,}\b/g;
  text = text.replace(randomStringRegex, "");

  // Remove HTML tags
  text = stripHtml(text);

  // Remove duplicate lines
  const lines = text.split("\n");
  const uniqueLines = Array.from(
    new Set(lines.map((line) => line.trim()))
  ).filter((line) => line);

  // Combine unique lines back into a single string
  text = uniqueLines.join(" ");

  // Split text by URLs and wrap them in anchor tags
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  let linkCount = 0;

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      linkCount++;
      return (
        <div key={index} className="mb-2">
          <a
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block p-2 bg-blue-500 text-white rounded"
          >
            Visit Site {linkCount}
          </a>
        </div>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const Modal: React.FC<ModalProps> = ({ email, onClose }) => {
  return (
    <div
      id="email-content"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-3/4 overflow-y-auto">
        <div className="mb-2">
          <span className="font-bold">From:</span> {email.from}
        </div>
        <div className="mb-2">
          <span className="font-bold">Subject:</span> {email.subject}
        </div>
        <div className="mb-4">
          <span className="font-bold">Content:</span>
          <div>{parseContent(email.text)}</div>
        </div>
        <div className="w-full flex justify-between">
          <button
            className="p-3 shadow shadow-slate-950 bg-red-500 text-white rounded-xl"
            onClick={onClose}
          >
            Close
          </button>
          <Link
            to="/compose"
            className="p-3 shadow shadow-slate-950 bg-green-500 text-white rounded-xl"
            onClick={onClose}
          >
            Reply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
