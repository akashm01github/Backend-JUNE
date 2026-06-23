import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
// import io from 'socket.io-client';

// Initialize Socket.IO connection to backend
// const socket = io('http://localhost:3000');

export default function AIChatApp() {
  // State management for messages, input, loading, and connection status
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Ref to auto-scroll to latest message
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket.IO connection and event handlers
//   useEffect(() => {
//     // Connection event - updates connection status
//     socket.on('connect', () => {
//       console.log('Connected to server');
//       setIsConnected(true);
//     });

//     // Disconnection event - updates connection status
//     socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//       setIsConnected(false);
//     });

//     // Listen for AI response from backend
//     socket.on('ai_message-response', (data) => {
//       // Add AI response to messages array
//       setMessages(prev => [...prev, {
//         type: 'ai',
//         text: data.response,
//         timestamp: new Date().toLocaleTimeString()
//       }]);
//       setIsLoading(false);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('ai_message-response');
//     };
//   }, []);

  // Handle sending messages
  const handleSendMessage = () => {
    // Validation: don't send empty messages
    if (!inputMessage.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Emit message to backend via Socket.IO
    socket.emit('ai_message', inputMessage);
    
    // Clear input and set loading state
    setInputMessage('');
    setIsLoading(true);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Assistant</h1>
              <p className="text-xs text-slate-400">Powered Akash</p>
            </div>
          </div>
          
          {/* Connection status indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-slate-300">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            // Empty state when no messages
            <div className="text-center py-12">
              <Bot className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Start a Conversation</h2>
              <p className="text-slate-400">Ask me anything and I'll help you out!</p>
            </div>
          ) : (
            // Render all messages
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {message.type === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      : 'bg-slate-800/80 backdrop-blur-sm text-slate-100 border border-slate-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">{message.timestamp}</span>
                </div>

                {/* User Avatar */}
                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))
          )}

          {/* Loading indicator when AI is thinking */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <span className="text-sm text-slate-300">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            {/* Message input field */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={!isConnected || isLoading}
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!isConnected || isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/50"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}