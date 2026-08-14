import React, { useState } from "react";
import "./ChatBot.css";

const getBotReply = (text) => {
  const lower = text.toLowerCase();

  if (/(hi|hello|hey|namaste)/.test(lower)) {
    return "👋 Hello! Welcome to IndiansFood. Ask me about pizza, burger, biryani, offers, or delivery.";
  }

  if (/(pizza|pizzas)/.test(lower)) {
    return "🍕 We offer Cheese Pizza, Veg Pizza, Farmhouse Pizza, and Loaded Supreme Pizza.";
  }

  if (/(burger|burgers)/.test(lower)) {
    return "🍔 Our menu includes Veg Burger, Chicken Burger, Cheese Burger, and Crispy Crunch Burger.";
  }

  if (/(biryani)/.test(lower)) {
    return "🍛 Try Chicken Biryani, Veg Biryani, Hyderabadi Biryani, and Dum Biryani.";
  }

  if (/(menu|food|dish|what do you have|what's on menu)/.test(lower)) {
    return "🍽️ We serve pizzas, burgers, biryani, wraps, desserts, and popular Indian meals.";
  }

  if (/(order|orders|track)/.test(lower)) {
    return "📦 You can track your order from the Orders page after placing it.";
  }

  if (/(pay|payment|upi|card|cash on delivery|cod)/.test(lower)) {
    return "💳 We support UPI, debit card, credit card, and cash on delivery.";
  }

  if (/(offer|discount|sale|deal)/.test(lower)) {
    return "🎉 Today’s offer: Flat 40% OFF on selected restaurants and combo meals.";
  }

  if (/(bye|thanks|thank you|goodbye)/.test(lower)) {
    return "👋 Thank you for visiting IndiansFood. We hope to see you again soon!";
  }

  return "🤖 I can help with menu items, offers, ordering, and payments. Try asking about pizza, burger, biryani, or offers.";
};

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! Welcome to IndiansFood. Ask me about pizza, burger, biryani, or offers.",
      sender: "bot",
    },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), sender: "user" };
    const reply = getBotReply(userMessage.text);
    const botMessage = { text: reply, sender: "bot" };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="chatbot" data-testid="chatbot-window">
      <div className="chat-header">
        <h3>🤖 IndiansFood Bot</h3>
      </div>

      <div className="chat-body" data-testid="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          data-testid="chat-input"
        />
        <button onClick={sendMessage} data-testid="chat-send-btn">
          Send
        </button>
      </div>
    </div>
  );
}
