import React, { useEffect, useState } from "react";
import NewChatIcon from "../assets/newchat.svg";
import Logo from "../assets/logo.svg";
import { useGlobal } from "../context/global-context.jsx";

export default function History() {
  const [messages, setMessages] = useState([]);
  const hook = useGlobal();
  console.log(messages, hook);

  useEffect(() => {
    const event = { type: "@load_messages" };
    setMessages(hook.dispatch(event));
    // eslint-disable-next-line
  }, []);

  const saveHistory = () => {
    const event = { type: "@save_history" };
    hook.dispatch(event);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-neutral-900 text-white p-4">
      <div className="flex flex-col items-start">
        <span className="mb-1">
          <img src={Logo} alt="Logo" className="size-6" />
        </span>
        <div className="p-1 mt-4">
          <button
            className="flex items-center p-2 bg-neutral-900 rounded-lg w-full hover:bg-neutral-700 cursor-pointer"
            onClick={() => saveHistory()}
          >
            <img src={NewChatIcon} alt="Nuevo chat" className="w-5 h-5 mr-2" />
            Nuevo chat
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mt-4 mb-4">
        <span className="space-y-2 text-sm mt-4 text-neutral-300">Chats</span>
        <ul className="space-y-2 text-sm mt-4">
          {hook?.state?.messages?.map((msg, index) => (
            <li key={index} className="p-2 hover:bg-neutral-800 rounded-lg">
              {msg.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
