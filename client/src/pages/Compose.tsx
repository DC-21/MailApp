import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { ENDPOINT } from "../typs/constants";
import { useNavigate } from "react-router-dom";

const emailSchema = yup.object().shape({
  to: yup
    .string()
    .email("Invalid email address")
    .required("Recipient email is required"),
  subject: yup.string().required("Subject is required"),
  text: yup.string().required("Content is required"),
});

const Compose = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${ENDPOINT}/send-email`, data);

      if (response.status === 200) {
        reset();
        setSuccess(true);
        setLoading(false);
        navigate("/success");
      }
    } catch (error) {
      // Handle error state
      console.error("Failed to send email", error);
      setError("Failed to send email. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <div className="p-4 border rounded-lg shadow-gray-400 border-gray-200 bg-white shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          {/* Add onSubmit to the form element */}
          <div className="mb-4">
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient Email
            </label>
            <input
              type="email"
              id="recipient"
              placeholder="to"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.to ? "border-red-500" : ""
              }`}
              {...register("to")}
            />
            {errors.to && (
              <p className="text-red-500 text-sm">{errors.to.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              placeholder="subject"
              id="subject"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.subject ? "border-red-500" : ""
              }`}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              typeof="text"
              id="content"
              placeholder="type email content"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.text ? "border-red-500" : ""
              }`}
              rows={4}
              {...register("text")}
            />
            {errors.text && (
              <p className="text-red-500 text-sm">{errors.text.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              id="send"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Compose;
