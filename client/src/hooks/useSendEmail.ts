import { useQuery } from "react-query";
import axios from "axios";
import { ENDPOINT } from "../typs/constants";

// Function to fetch emails and clean up their content
const fetchEmails = async () => {
  try {
    const { data } = await axios.get(`${ENDPOINT}/fetch-emails`);
    // Process each email to remove unwanted styles
    const cleanedEmails = data.map((email: any) => ({
      ...email,
      text: email.text ? email.text.replace(/<[^>]*>/g, "") : "", // Check if email.content exists before replacing
    }));
    return cleanedEmails;
  } catch (error) {
    throw new Error("Failed to fetch emails");
  }
};

export const useFetchEmails = () => {
  return useQuery("emails", fetchEmails);
};
