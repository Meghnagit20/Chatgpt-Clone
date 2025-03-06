

import { useState } from "react";
import { Menu, Search, Edit, Plus, ChevronLeft, Settings, MoreVertical, Share, Trash2, Archive, Edit2 } from "lucide-react";

export default function Sidebar() {
  const [chats, setChats] = useState([{ id: 1, title: "Chat 1" }]);
  const [activeChat, setActiveChat] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  // Toggle Sidebar
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Create and Open New Chat
  const createNewChat = () => {
    const newChat = { id: Date.now(), title: `New Chat` };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  // Rename Chat
  const renameChat = (id) => {
    const newTitle = prompt("Enter new chat name:");
    if (newTitle) {
      setChats(chats.map(chat => (chat.id === id ? { ...chat, title: newTitle } : chat)));
    }
  };

  // Delete Chat
  const deleteChat = (id) => {
    setChats(chats.filter(chat => chat.id !== id));
  };

  return (
    <div className={`h-screen bg-black text-white flex flex-col p-2 ${isCollapsed ? "w-16" : "w-64"} transition-all`}>
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-3">
        {!isCollapsed && <h1 className="text-lg font-semibold">ChatGPT</h1>}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-800">
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Search & Edit */}
      {!isCollapsed && (
        <div className="flex gap-2 px-2">
          <button className="p-2 rounded hover:bg-gray-800">
            <Search size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-800">
            <Edit size={20} />
          </button>
        </div>
      )}

      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md my-4"
      >
        <Plus size={16} /> {!isCollapsed && "New Chat"}
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {chats.map((chat) => (
          <div key={chat.id} className="relative">
            <button
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md ${
                activeChat === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              <span>💬 {!isCollapsed && chat.title}</span>
              <button onClick={() => setMenuOpen(menuOpen === chat.id ? null : chat.id)}>
                <MoreVertical size={16} />
              </button>
            </button>

            {/* Dropdown Menu */}
            {menuOpen === chat.id && (
              <div className="absolute right-4 top-10 bg-gray-800 text-white rounded-md shadow-lg w-32">
                <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-700">
                  <Share size={16} /> Share
                </button>
                <button onClick={() => renameChat(chat.id)} className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-700">
                  <Edit2 size={16} /> Rename
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-700">
                  <Archive size={16} /> Archive
                </button>
                <button onClick={() => deleteChat(chat.id)} className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-gray-700">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        {!isCollapsed && (
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-800">
            🔒 Upgrade Plan
          </button>
        )}
        <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-800">
          <Settings size={16} /> {!isCollapsed && "Settings"}
        </button>
      </div>
    </div>
  );
}


