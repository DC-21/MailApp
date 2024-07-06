import { useState } from "react";
import { Email } from "../typs/interfaces";
import Modal from "./View";

const Mail = () => {
  const [emails] = useState<Email[]>([
    {
      id: 1,
      sender: "alice@example.com",
      subject: "Hello Alice",
      content: "Content of Hello Alice",
    },
    {
      id: 2,
      sender: "bob@example.com",
      subject: "Meeting Reminder",
      content: "Content of Meeting Reminder",
    },
    {
      id: 3,
      sender: "carol@example.com",
      subject: "Invoice #1234",
      content: "Content of Invoice #1234",
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

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
          {emails.map((email, index) => (
            <tr
              key={email.id}
              onClick={() => handleEmailClick(email)}
              style={{ cursor: "pointer" }}
            >
              <td className="py-2 px-4 border border-gray-200 text-start">
                {index + 1}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-start">
                {email.sender}
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
