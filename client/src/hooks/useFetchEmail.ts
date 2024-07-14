import { useQuery } from "react-query";
import axios from "axios";
import { ENDPOINT } from "../typs/constants";

// Function to fetch emails and clean up their content
const fetchEmails = async () => {
  const { data } = await axios.get(`${ENDPOINT}/fetch-emails`);
  // Process each email to remove unwanted styles
  const cleanedEmails = data.map((email: any) => ({
    ...email,
    content: email.content.replace(/<[^>]*>/g, ""), // Example: Remove all HTML tags
  }));
  return cleanedEmails;
};

export const useFetchEmails = () => {
  return useQuery("emails", fetchEmails);
};
