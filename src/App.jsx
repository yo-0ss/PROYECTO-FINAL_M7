import { useState } from "react";
import MessageForm from "./components/MessageForm";
import HeaderChat from "./components/HeaderChat";

function App() {
  const [messages, setMessages] = useState([]);
  const [waitingBot, setWaitingBot] = useState(false);

  const handleSend = (text) => {
    if (waitingBot) return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setWaitingBot(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Respuesta generada...", sender: "bot" }]);
      setWaitingBot(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-800 text-white flex flex-col">
      <div className="w-full space-y-4">
        <h1 className="text-lg p-2">Clon ChatGPT</h1>

        <div className=" rounded-xl p-4 h-130 overflow-y-auto flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3  rounded-lg  w-fit max-w-[80%] break-words ${
                msg.sender === "user"
                  ? "bg-neutral-700 ml-auto text-white"
                  : "bg-transparent text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <MessageForm onSend={handleSend} disabled={waitingBot} />
      </div>
    </div>
  );
}

export default App;
