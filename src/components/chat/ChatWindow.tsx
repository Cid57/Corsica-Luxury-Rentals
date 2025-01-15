'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';
import { FiSend, FiMinimize2, FiMaximize2, FiX } from 'react-icons/fi';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bonjour ! Comment puis-je vous aider à planifier votre séjour en Corse ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simuler une réponse de l'agent après un court délai
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je vais vous aider à trouver la villa parfaite pour votre séjour. Pouvez-vous me dire quelles sont vos dates de voyage ?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Bouton pour ouvrir le chat */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-luxury-gold text-white p-4 rounded-full shadow-lg hover:bg-luxury-gold/90 transition-colors z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </motion.button>
      )}

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100`}
          >
            {/* En-tête */}
            <div className="bg-luxury-gold text-white p-4 flex items-center justify-between">
              <h3 className="font-medium">Chat en direct</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Corps du chat */}
            {!isMinimized && (
              <>
                <div className="h-[456px] overflow-y-auto p-4 bg-gray-50">
                  {messages.map(message => (
                    <ChatBubble
                      key={message.id}
                      message={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Zone de saisie */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Écrivez votre message..."
                      className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 max-h-32"
                      rows={1}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-luxury-gold text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-luxury-gold/90 transition-colors"
                    >
                      <FiSend />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
