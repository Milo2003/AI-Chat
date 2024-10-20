'use client';

import {
  X,
  Plus,
  Trash2,
  Download,
  Upload,
  History,
  Edit2,
} from 'lucide-react';
import { Button, Input } from './ui';
import { useState, useEffect } from 'react';

export const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  chatHistory,
  setChatHistory,
  currentChatId,
  setCurrentChatId,
  messages,
  setMessages,
}) => {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState('');

  useEffect(() => {
    const storedHistory = localStorage.getItem('chatHistory');
    const parsedHistory = JSON.parse(storedHistory);
    const storedCurrentChatId = localStorage.getItem('currentChatId');
    const welcomeMessage = {
      text: '¡Welcome to AI-Chat! How can I help you?',
      isUser: false,
    };
    if (parsedHistory === null) {
      const initialChatId = crypto.randomUUID();
      const initialChat = {
        id: initialChatId,
        name: 'Chat 1',
        messages: [welcomeMessage],
      };
      setCurrentChatId(initialChatId);
      setChatHistory([initialChat]);
      // localStorage.setItem('chatHistory', JSON.stringify([initialChat]));
    } else {
      if (storedCurrentChatId) {
        setCurrentChatId(storedCurrentChatId);
        loadChat(storedCurrentChatId);
      }
    }
    setMessages([welcomeMessage]);
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    localStorage.removeItem('currentChatId');
  };

  const handleExportChat = () => {
    const chatContent = messages
      .map((msg) => `${msg.isUser ? 'Usuario' : 'IA'}: ${msg.text}`)
      .join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_export.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportChat = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        const importedMessages = content.split('\n\n').map((msg) => {
          const [sender, text] = msg.split(': ');
          return { text, isUser: sender === 'Usuario' };
        });
        setMessages(importedMessages);

        // Add imported chat to history
        const newChatId = Date.now().toString();
        const newChat = {
          id: newChatId,
          name: `Imported Chat ${chatHistory.length + 1}`,
          messages: importedMessages,
        };
        setChatHistory((prev) => [...prev, newChat]);
        setCurrentChatId(newChatId);
      };
      reader.readAsText(file);
    }
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  const createNewChat = () => {
    const newChatId = crypto.randomUUID();
    const newChat = {
      id: newChatId,
      name: `New Chat ${chatHistory.length + 1}`,
      messages: [],
    };
    setChatHistory((prev) => [...prev, newChat]);
    setMessages([]);
    setCurrentChatId(newChatId);
  };

  const startEditingChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setEditingChatId(chatId);
      setEditingChatName(chat.name);
    }
  };

  const saveEditingChat = () => {
    if (editingChatId && editingChatName.trim()) {
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === editingChatId
            ? { ...chat, name: editingChatName.trim() }
            : chat,
        ),
      );
      setEditingChatId(null);
      setEditingChatName('');
    }
  };

  const deleteChat = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold text-black`}>Menu</h2>
          <Button
            className=" hover:bg-red-600 rounded-lg"
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6 fill-red-500" />
          </Button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={createNewChat}
                className={`flex items-center w-full py-2 px-4 rounded text-gray-700 hover:bg-gray-200`}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleClearChat();
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full py-2 px-4 rounded text-gray-700 hover:bg-gray-200`}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clean chat
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleExportChat();
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full py-2 px-4 rounded text-gray-700 hover:bg-gray-200`}
              >
                <Download className="mr-2 h-4 w-4" />
                Export chat
              </button>
            </li>
            <li>
              <label
                className={`flex items-center w-full py-2 px-4 rounded cursor-pointer text-gray-700 hover:bg-gray-200`}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import chat
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => {
                    handleImportChat(e);
                    setIsSidebarOpen(false);
                  }}
                  className="hidden"
                />
              </label>
            </li>
            <li>
              <h3 className={`mt-4 mb-2 font-semibold text-gray-600`}>
                History
              </h3>
              {chatHistory.map((chat) => (
                <div key={chat.id} className="flex items-center mb-2">
                  {editingChatId === chat.id ? (
                    <Input
                      value={editingChatName}
                      onChange={(e) => setEditingChatName(e.target.value)}
                      onBlur={saveEditingChat}
                      onKeyPress={(e) => e.key === 'Enter' && saveEditingChat()}
                      className="mr-2 flex-grow"
                    />
                  ) : (
                    <button
                      onClick={() => {
                        loadChat(chat.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center w-full py-2 px-4 rounded text-gray-700 hover:bg-gray-200 ${
                        currentChatId === chat.id ? 'bg-gray-200' : ''
                      }`}
                    >
                      <History className="mr-2 h-4 w-4" />
                      {chat.name}
                    </button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditingChat(chat.id)}
                    className="ml-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteChat(chat.id)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
