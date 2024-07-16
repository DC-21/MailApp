import { useMutation } from "react-query";
import axios from "axios";
import { ENDPOINT } from "../typs/constants";

export const useSendEmail = () => {
  return useMutation(
    (emailData) => {
      return axios.post(`${ENDPOINT}/send-email`, emailData);
    },
    {
      onError: (error) => {
        console.error("Error sending email:", error);
      },
    }
  );
};
