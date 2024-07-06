import { useState } from "react";

const Mail = () => {
  const [emails, _setEmails] = useState([
    { id: 1, sender: "alice@example.com", subject: "Hello Alice" },
    { id: 2, sender: "bob@example.com", subject: "Meeting Reminder" },
    { id: 3, sender: "carol@example.com", subject: "Invoice #1234" },
    { id: 4, sender: "dave@example.com", subject: "Project Update" },
    { id: 5, sender: "eve@example.com", subject: "Vacation Plans" },
    { id: 6, sender: "frank@example.com", subject: "Party Invitation" },
    { id: 7, sender: "grace@example.com", subject: "Weekly Report" },
    { id: 8, sender: "heidi@example.com", subject: "Birthday Wishes" },
    { id: 9, sender: "ivan@example.com", subject: "New Opportunity" },
    { id: 10, sender: "judy@example.com", subject: "Newsletter" },
  ]);

  return (
    <div className="py-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-200 text-left">No</th>
            <th className="py-2 px-4 border border-gray-200 text-left">From</th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Subject
            </th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={email.id}>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {index + 1}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {email.sender}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {email.subject}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mail;
