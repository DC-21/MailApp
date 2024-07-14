import { useState } from "react";
import { Email } from "../typs/interfaces";
import Modal from "./View";
import { useFetchEmails } from "../hooks/useFetchEmail";

const Mail = () => {
  const { data: emails, isLoading, error } = useFetchEmails();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="py-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-200 text-start">No</th>
            <th className="py-2 px-4 border border-gray-200 text-start">
              From
            </th>
            <th className="py-2 px-4 border border-gray-200 text-start">
              Subject
            </th>
          </tr>
        </thead>
        <tbody>
          {emails?.map((email: Email, index: any) => (
            <tr
              key={email.id}
              onClick={() => handleEmailClick(email)}
              style={{ cursor: "pointer" }}
            >
              <td className="py-2 px-4 border border-gray-200 text-start">
                {index + 1}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-start">
                {email.from}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-start">
                {email.subject}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmail && (
        <Modal email={selectedEmail} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Mail;
