import { useEffect, useState, useRef } from 'react';
import { Avatar, Button } from '../components';
import {
  connectSocket,
  disconnectSocket,
  joinRoom,
  leaveRoom,
  sendMessage,
  startTyping,
  stopTyping,
  onUserJoined,
  onUserLeft,
  onMessageReceived,
  onUserTyping,
  onUserStoppedTyping,
} from '../services/socket';
import { useSelector } from 'react-redux';

const ChatRoom = ({ groupId, groupName }) => {
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    connectSocket(user._id, user.name);
    joinRoom(groupId);
    setIsConnected(true);

    onUserJoined((data) => setActiveUsers(data.activeUsers || []));
    onUserLeft((data) => setActiveUsers(data.activeUsers || []));
    onMessageReceived((data) => setMessages((prev) => [...prev, data]));
    onUserTyping((data) => setTypingUsers((prev) => new Set(prev).add(data.userId)));
    onUserStoppedTyping((data) => {
      setTypingUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(data.userId);
        return updated;
      });
    });

    return () => {
      leaveRoom(groupId);
      disconnectSocket();
      setIsConnected(false);
    };
  }, [user, groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(groupId, inputMessage);
    setMessages((prev) => [
      ...prev,
      { sender: user._id, senderName: user.name, message: inputMessage, timestamp: new Date().toISOString() },
    ]);
    setInputMessage('');
    stopTyping(groupId);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    startTyping(groupId);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => stopTyping(groupId), 2000);
  };

  return (
    <div className="flex h-full flex-col bg-white rounded-xl border border-secondary-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-secondary-100 bg-white px-5 py-3.5">
        <div>
          <h2 className="text-sm font-semibold text-secondary-900">{groupName}</h2>
          <p className="text-xs text-secondary-500 mt-0.5">
            {activeUsers.length} member{activeUsers.length !== 1 ? 's' : ''} online
          </p>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            isConnected
              ? 'bg-success-50 text-success-700'
              : 'bg-danger-50 text-danger-700'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-success-500' : 'bg-danger-500'}`} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-secondary-400">
                <p className="text-sm">No messages yet. Start the conversation!</p>
              </div>
            )}
            {messages.map((msg, idx) => {
              const isOwn = msg.sender === user?._id;
              return (
                <div key={idx} className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isOwn && (
                    <Avatar initials={msg.senderName?.slice(0, 2)} size="sm" className="flex-shrink-0 mb-1" />
                  )}
                  <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {!isOwn && (
                      <p className="text-xs font-medium text-secondary-600 px-1">{msg.senderName}</p>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        isOwn
                          ? 'bg-primary-600 text-white rounded-br-sm'
                          : 'bg-secondary-100 text-secondary-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.message}
                    </div>
                    <p className="text-xs text-secondary-400 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}

            {typingUsers.size > 0 && (
              <div className="flex items-center gap-2 text-xs italic text-secondary-400">
                <span className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-400 animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-400 animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-400 animate-bounce [animation-delay:300ms]" />
                </span>
                Someone is typing…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-secondary-100 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-2 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type a message…"
                className="flex-1 bg-transparent text-sm text-secondary-900 placeholder-secondary-400 outline-none"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 transition-colors flex-shrink-0"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Active Users */}
        <div className="hidden w-44 flex-shrink-0 flex-col border-l border-secondary-100 bg-secondary-50 p-4 md:flex">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500 mb-3">Online</p>
          <div className="space-y-2">
            {activeUsers.map((u) => (
              <div key={u.userId} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success-500 flex-shrink-0" />
                <span className="text-xs text-secondary-700 truncate">{u.userName}</span>
              </div>
            ))}
            {activeUsers.length === 0 && (
              <p className="text-xs text-secondary-400">No one online</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
