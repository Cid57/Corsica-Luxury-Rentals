'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut'
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={isUser ? '/images/user-avatar.png' : '/images/agent-avatar.png'}
            alt={isUser ? 'Vous' : 'Agent'}
            width={32}
            height={32}
            className="object-cover"
          />
        </div>

        {/* Message */}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? 'bg-luxury-gold text-white rounded-br-none'
              : 'bg-white shadow-sm border border-gray-100 rounded-bl-none'
          }`}
        >
          <p className={`text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>{message}</p>
          <p className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-gray-400'}`}>
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
