import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINT } from "../typs/constants";
import { Email } from "../typs/interfaces";

export const useFetchEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${ENDPOINT}/fetch-emails`);
        setEmails(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return { data: emails, isLoading, error };
};
