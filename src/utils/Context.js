import { createContext, useEffect, useRef, useState } from "react";
import { sendMsgToAI } from "./GeminiAi"; // Import the Gemini API function

export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [chatValue, setChatValue] = useState(""); // User's input text
  const [message, setMessage] = useState([
    {
      text: "What can I help with?", // Initial bot message
      isBot: true,
    },
  ]);
  const msgEnd = useRef(null); // Scroll to the latest message

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the bottom when a new message is added
    }
  }, [message]);

  // Handle send button click
  const handleSend = async () => {
    if (!chatValue.trim()) return; // Prevent sending empty messages

    const text = chatValue; // Get the input text
    setChatValue(""); // Clear the input field
    setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]); // Add user's message

    const res = await sendMsgToAI(text); // Get response from Gemini API
    setMessage((prevMessages) => [
      ...prevMessages,
      { text: res, isBot: true }, // Add bot's response
    ]);
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend(); // Trigger send on Enter key
    }
  };

  // Handle clicking predefined query
  const handleQuery = async (e) => {
    const text = e.target.innerText; // Get the query text
    setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]); // Add query to messages

    const res = await sendMsgToAI(text); // Get response from Gemini API
    setMessage((prevMessages) => [
      ...prevMessages,
      { text: res, isBot: true }, // Add bot's response
    ]);
  };

  return (
    <ContextApp.Provider
      value={{
        showSlide,
        setShowSlide,
        Mobile,
        setMobile,
        chatValue,
        setChatValue,
        handleSend,
        message,
        msgEnd,
        handleKeyPress,
        handleQuery,
      }}
    >
      {children} {/* Render the rest of the app here */}
    </ContextApp.Provider>
  );
};

export default AppContext;
