import { useState } from "react";
import { Email } from "../typs/interfaces";
import Modal from "./View";
import { useFetchEmails } from "../hooks/useFetchEmail";

const Mail = () => {
  const { data: emails, isLoading, error } = useFetchEmails();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailClick = (email: Email) => {
    console.log("Email clicked:", email);
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

  const stripHtml = (html: string) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const parseContent = (text: string) => {
    const cssBlockRegex = /<style[\s\S]*?<\/style>/gi;
    text = text.replace(cssBlockRegex, "");

    const inlineCssRegex = /style="[^"]*"/gi;
    text = text.replace(inlineCssRegex, "");

    const htmlCommentsRegex = /<!--[\s\S]*?-->/gi;
    text = text.replace(htmlCommentsRegex, "");

    const headerFooterRegex =
      /(--+|_+|-----|On.*wrote:|From:.*Sent:.*To:.*Subject:|Sent from my.*|^[>\|].*|Content-Type:.*; charset=.*|Content-Transfer-Encoding:.*|^MIME-Version:.*|Content-ID:.*)/gi;
    text = text.replace(headerFooterRegex, "");

    const randomStringRegex = /\b[A-Fa-f0-9]{24,}\b/g;
    text = text.replace(randomStringRegex, "");

    text = stripHtml(text);

    const lines = text.split("\n");
    const uniqueLines = Array.from(
      new Set(lines.map((line) => line.trim()))
    ).filter((line) => line);

    text = uniqueLines.join(" ");

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
            <th className="py-2 px-4 border border-gray-200 text-start hidden">
              Content
            </th>
          </tr>
        </thead>
        <tbody>
          {emails
            ?.slice()
            .reverse()
            .map((email: Email, index: number) => (
              <tr
                key={email.id}
                onClick={() => handleEmailClick(email)}
                style={{ cursor: "pointer" }}
              >
                <td className="py-2 px-4 border border-gray-200 text-start">
                  {emails.length - index}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-start">
                  {email.from}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-start">
                  {email.subject}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-start">
                  {parseContent(email.text)}
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
