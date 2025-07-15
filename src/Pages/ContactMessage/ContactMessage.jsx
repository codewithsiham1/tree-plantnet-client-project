import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const ContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosSecure.get("/contact");
        setMessages(res.data || []);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-600">
        Loading contact messages...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#2b6e42] text-center md:text-left">
        Contact Messages
      </h2>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg">
          No contact messages found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 border rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="mb-2 text-sm sm:text-base md:text-lg">
                <span className="font-semibold text-[#2b6e42]">Subject:</span>{" "}
                {msg.subject}
              </p>
              <p className="mb-2 text-sm sm:text-base md:text-lg">
                <span className="font-semibold text-[#2b6e42]">Email:</span>{" "}
                {msg.email}
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                <span className="font-semibold text-[#2b6e42]">Message:</span>{" "}
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessage;
