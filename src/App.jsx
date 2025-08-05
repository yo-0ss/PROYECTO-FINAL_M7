import { useState, useEffect } from "react";
import useOllamaHook from "./api/useOllamaHook";
import MessageForm from "./components/MessageForm";
import { useGlobal } from "./context/global-context";

function App() {
  const hook = useGlobal();
  const [messages, setMessages] = useState([]);
  const [waitingBot, setWaitingBot] = useState(false);
  const ollamaHook = useOllamaHook();

  const handleSend = (text) => {
    if (waitingBot) return;

    setWaitingBot(true);

    setMessages((prev) => [
      ...prev,
      { text, sender: "user" },
      { text: "", sender: "bot" },
    ]);

    ollamaHook.handleSubmit(text);
  };

  useEffect(() => {
    if (!ollamaHook.response) return;

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastBotIndex = [...updatedMessages]
        .reverse()
        .findIndex((msg) => msg.sender === "bot");

      if (lastBotIndex !== -1) {
        const realIndex = updatedMessages.length - 1 - lastBotIndex;
        updatedMessages[realIndex] = {
          ...updatedMessages[realIndex],
          text: ollamaHook.response,
        };
      } else {
        updatedMessages.push({ text: ollamaHook.response, sender: "bot" });
      }

      return updatedMessages;
    });

    if (!ollamaHook.loading) {
      setWaitingBot(false);
    }
  }, [ollamaHook.response, ollamaHook.loading]);

  useEffect(() => {
    if (!messages.length) return;
    const event = { type: "@current_chat", payload: messages };
    hook.dispatch(event);
  }, [messages, hook]);

  return (
    <div className="min-h-screen bg-neutral-800 w-full text-white flex flex-col">
      <div className="w-full space-y-4">
        <h1 className="text-lg p-2">Clon ChatGPT</h1>

        <div className=" rounded-xl p-4 h-130 overflow-y-auto flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg w-fit max-w-[80%] break-words ${
                msg.sender === "user"
                  ? "bg-neutral-700 ml-auto text-white"
                  : "bg-transparent text-white"
              }`}
            >
              {msg.text}
              {/* Muestra un indicador de carga solo para el último mensaje del bot */}
              {ollamaHook.loading &&
                msg.sender === "bot" &&
                index === messages.length - 1 && (
                  <span className="ml-2 animate-pulse">...</span>
                )}
            </div>
          ))}
        </div>

        <MessageForm onSend={handleSend} disabled={waitingBot} />
      </div>
    </div>
  );
}

export default App;
