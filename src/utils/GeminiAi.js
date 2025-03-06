import axios from "axios";

const API_KEY = "AIzaSyDrh-4rpxYYpEIUy484xuKboffB9WiWeec"; // Store your Gemini API key in .env
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent"; // Corrected endpoint

export const sendMsgToAI = async (msg) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [{ role: "user", parts: [{ text: msg }] }], // Correct request format
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: API_KEY,
        },
      }
    );

    // Handle the API response and return the generated text
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "An error occurred. Please try again.";
  }
};
