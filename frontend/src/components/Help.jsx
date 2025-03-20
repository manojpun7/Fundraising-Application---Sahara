import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const Help = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const recommendedMessages = [
    "What can I do on Sahara?",
    "How do I donate blood, food, or clothes?",
    "How can I apply for financial assistance?",
    "How do I track my donations?",
    "Tell me about Sahara's mission and impact.",
  ];

  useEffect(() => {
    // Add the bot's default initial message when the chat loads
    setChatHistory([
      { sender: "bot", text: "Hi there! How can I assist you today?" },
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight; // Auto scroll to bottom
    }
  }, [chatHistory]); // Trigger scroll whenever chatHistory is updated

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user's message to chat history
    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/app/helpbot/bot",
        {
          question: message,
        }
      );

      const botAnswer = response.data.data;

      // Simulate bot typing delay and then add bot's answer
      setTimeout(() => {
        setChatHistory((prev) => [...prev, { sender: "bot", text: botAnswer }]);
        setIsTyping(false);
      }, 1000); // Simulate typing delay
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
      setIsTyping(false);
    }

    setMessage(""); // Clear message input after sending
  };

  // Handle when a recommended message is clicked
  const handleRecommendedMessageClick = (suggestion) => {
    setMessage(suggestion); // Set the clicked suggestion as the message input
  };

  return (
    <>
      <section id="application" className="bg-gray-50 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-start justify-start gap-5 px-5">
          {/* Bot Avatar Section */}
          <div className="lg:w-5/12 text-center lg:text-right mt-40">
            <img
              src={assets.eva_logo} // Replace with actual bot avatar URL
              alt="AI Bot Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-6 animate-bouncy-shake-once"
            />

            <h3 className="text-4xl text-center font-semibold text-[#007BFF]">
              {"I'm your AI assistant,".split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block ${
                    char === " " ? "w-2" : "animate-letter-fade"
                  }`}
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}{" "}
              <span>
                {"Eva".split("").map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block text-5xl font-bold bg-gradient-to-r from-[#007BFF] to-[#000080] text-transparent bg-clip-text animate-letter-fade`}
                    style={{ animationDelay: `${(index + 24) * 0.04}s` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h3>

            <p className="text-2xl mt-2 text-center">
              here to guide you! Ask me anything, and I'll provide the support
              you need.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-screen w-[60%]">
            <div className="w-[80%] bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#007BFF] to-[#000080] text-transparent bg-clip-text mb-6">
                AI Assistance
              </h1>

              {/* Chat History */}
              <div
                ref={chatContainerRef}
                className="h-60 w-full overflow-y-auto border-t-2 border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg flex ${
                      chat.sender === "user"
                        ? "bg-[#4490e1] text-white self-end rounded-br-none justify-end"
                        : "bg-gray-200 text-gray-800 self-start rounded-bl-none justify-start"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{chat.text}</p>
                  </div>
                ))}

                {/* Typing indicator for bot */}
                {isTyping && (
                  <div className="flex items-center mb-4 p-3 max-w-xs bg-gray-200 text-gray-800 self-start rounded-bl-none">
                    <span className="animate-pulse">Bot is typing...</span>
                  </div>
                )}
              </div>

              {/* Recommended Messages */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-red-600">
                  Suggested Questions:
                </h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {recommendedMessages.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecommendedMessageClick(suggestion)}
                      className="bg-[#4490e1] hover:bg-[#007BFF] text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex items-center mt-6 justify-end relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-[#007BFF]transition duration-300"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#007BFF] text-white px-6 py-3 rounded-lg hover:bg-[#0056b3] transition duration-300 focus:outline-none"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Help;
