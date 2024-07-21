import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios"; // Import Axios
import { useState } from "react";
import { ENDPOINT } from "../typs/constants";

const emailSchema = yup.object().shape({
  to: yup
    .string()
    .email("Invalid email address")
    .required("Recipient email is required"),
  subject: yup.string().required("Subject is required"),
  text: yup.string().required("Content is required"),
});

const Compose = () => {
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
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      // Make API request to send email
      await axios.post(`${ENDPOINT}/send-email`, data);

      // Reset the form after successful submission
      reset();
      setSuccess(true);
      setLoading(false);

      // Optionally, show a success message or perform other actions
      console.log("Email sent successfully!");
    } catch (error) {
      // Handle error state
      console.error("Failed to send email", error);
      setError("Failed to send email. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded-lg shadow-gray-400 border-gray-200 bg-white shadow-lg max-w-lg w-full"
      >
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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {/* Error handling */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {/* Success message */}
        {success && (
          <p className="text-green-500 text-sm mt-2">
            Email sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default Compose;
