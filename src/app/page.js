'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ChatArea } from '@/components/ChatArea';

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = { text: inputMessage, isUser: true };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    // setLoading(true);
    try {
      const res = await fetch('api', {
        method: 'POST',
        body: JSON.stringify({ prompt: inputMessage }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      const aiMessage = { text: data.message, isUser: false };
      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);

      // Update chat history
      if (currentChatId) {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: updatedMessages }
              : chat,
          ),
        );
      } else {
        const newChatId = crypto.randomUUID();
        const newChat = {
          id: newChatId,
          name: `11Chat ${chatHistory.length + 1}`,
          messages: updatedMessages,
        };
        setChatHistory((prev) => [...prev, newChat]);
        setCurrentChatId(newChatId);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = {
        text: 'Error al obtener respuesta',
        isUser: false,
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
    }
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-200 bg-gray-100 text-black`}
    >
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        messages={messages}
        setMessages={setMessages}
      />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Chat area */}
        <ChatArea
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
