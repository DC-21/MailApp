import React from "react";
import { Email } from "../typs/interfaces";
import { Link } from "react-router-dom";

interface ModalProps {
  email: Email;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ email, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="mb-2">
          <span className="font-bold">From:</span> {email.sender}
        </div>
        <div className="mb-2">
          <span className="font-bold">Subject:</span> {email.subject}
        </div>
        <div className="mb-4">
          <span className="font-bold">Content:</span> {email.content}
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
