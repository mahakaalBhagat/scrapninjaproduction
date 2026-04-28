'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown } from 'lucide-react';
import { apiClient } from '@/services/api';

// ── Types ──────────────────────────────────────────────
interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  options?: Option[];
}

interface Option {
  label: string;
  action: string;
}

type FlowStep =
  | 'welcome'
  | 'what_is'
  | 'what_is_cta'
  | 'how_to_sell'
  | 'how_to_sell_cta'
  | 'disposal_report'
  | 'disposal_report_cta'
  | 'vendor_flow'
  | 'vendor_flow_cta'
  | 'lead_capture'
  | 'lead_phone'
  | 'lead_done'
  | 'maybe_later'
  | 'universal_cta';

// ── Trust lines ────────────────────────────────────────
const trustLines = [
  'We work only with verified vendors ✅',
  'Transparent bidding = better pricing 💰',
  'No confusion, everything is structured 📋',
];

let trustIndex = 0;
const getNextTrust = () => {
  const line = trustLines[trustIndex % trustLines.length];
  trustIndex++;
  return line;
};

// ── Unique ID helper ───────────────────────────────────
let msgId = 0;
const uid = () => `msg-${++msgId}`;

// ── Component ──────────────────────────────────────────
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<FlowStep>('welcome');
  const [awaitingInput, setAwaitingInput] = useState<'name' | 'phone' | null>(null);
  const [leadName, setLeadName] = useState('');
  const [lastFlow, setLastFlow] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // send welcome on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      pushBotMessages('welcome');
    }
  }, [isOpen]);

  // ── Push bot messages by step ────────────────────────
  const pushBotMessages = (step: FlowStep) => {
    setCurrentStep(step);
    setAwaitingInput(null);

    const add = (msgs: Message[]) =>
      setMessages((prev) => [...prev, ...msgs]);

    switch (step) {
      case 'welcome':
        add([
          {
            id: uid(),
            from: 'bot',
            text: 'Hi 👋 Welcome to ScrapNinja!\nWe help businesses and individuals sell scrap easily and get better prices 💰',
          },
          {
            id: uid(),
            from: 'bot',
            text: 'What would you like to know?',
            options: [
              { label: '🤔 What is ScrapNinja?', action: 'what_is' },
              { label: '💰 How can I sell scrap?', action: 'how_to_sell' },
              { label: '📊 Scrap disposal report?', action: 'disposal_report' },
              { label: '🚛 Become a vendor', action: 'vendor_flow' },
            ],
          },
        ]);
        break;

      case 'what_is':
        setLastFlow('WHAT_IS_SCRAPNINJA');
        add([
          {
            id: uid(),
            from: 'bot',
            text: 'ScrapNinja is a digital platform where:\n\n👉 You post your scrap\n👉 Multiple vendors deal for it\n👉 You choose the best price\n\nSimple, transparent, and better rates 💰',
          },
          { id: uid(), from: 'bot', text: getNextTrust() },
          {
            id: uid(),
            from: 'bot',
            text: 'Would you like to try ScrapNinja when we launch?',
            options: [
              { label: 'Yes 👍', action: 'lead_capture' },
              { label: 'Maybe later', action: 'maybe_later' },
            ],
          },
        ]);
        break;

      case 'how_to_sell':
        setLastFlow('HOW_TO_SELL');
        add([
          {
            id: uid(),
            from: 'bot',
            text: "Here's how it works 👇\n\n1️⃣ Share your scrap details\n2️⃣ Get offers from  multiple vendors\n3️⃣ You select the best offer\n4️⃣ Pickup gets done 🚛",
          },
          {
            id: uid(),
            from: 'bot',
            text: 'This usually helps you get better pricing compared to traditional methods 💰',
          },
          { id: uid(), from: 'bot', text: getNextTrust() },
          {
            id: uid(),
            from: 'bot',
            text: 'Would you like to try this when we go live?',
            options: [
              { label: 'Yes', action: 'lead_capture' },
              { label: 'Maybe', action: 'maybe_later' },
            ],
          },
        ]);
        break;

      case 'disposal_report':
        setLastFlow('DISPOSAL_REPORT');
        add([
          {
            id: uid(),
            from: 'bot',
            text: 'A scrap disposal report shows 👇\n\n👉 How much scrap you generated\n👉 How much was recycled\n👉 Your overall waste handling record',
          },
          {
            id: uid(),
            from: 'bot',
            text: 'This is useful for:\n• Internal tracking\n• Audits\n• Business reporting',
          },
          {
            id: uid(),
            from: 'bot',
            text: 'With ScrapNinja, you get these reports automatically 📊',
          },
          { id: uid(), from: 'bot', text: getNextTrust() },
          {
            id: uid(),
            from: 'bot',
            text: 'Would you like to see a sample report?',
            options: [
              { label: 'Yes', action: 'lead_capture' },
              { label: 'Not now', action: 'maybe_later' },
            ],
          },
        ]);
        break;

      case 'vendor_flow':
        setLastFlow('VENDOR_FLOW');
        add([
          {
            id: uid(),
            from: 'bot',
            text: 'ScrapNinja helps vendors grow faster 💪\n\n👉 Get regular scrap leads\n👉 Transparent rates \n👉 No need to chase clients',
          },
          { id: uid(), from: 'bot', text: getNextTrust() },
          {
            id: uid(),
            from: 'bot',
            text: 'Would you like to join our vendor network?',
            options: [
              { label: 'Yes', action: 'lead_capture' },
              { label: 'Maybe later', action: 'maybe_later' },
            ],
          },
        ]);
        break;

      case 'lead_capture':
        setAwaitingInput('name');
        add([
          {
            id: uid(),
            from: 'bot',
            text: "Awesome 🔥 We'll give you early access.\n\nPlease share your name 👇",
          },
        ]);
        break;

      case 'lead_phone':
        setAwaitingInput('phone');
        add([
          {
            id: uid(),
            from: 'bot',
            text: `Thanks ${leadName}! Now please share your phone number 👇`,
          },
        ]);
        break;

      case 'lead_done':
        setAwaitingInput(null);
        add([
          {
            id: uid(),
            from: 'bot',
            text: "Thank you! 🎉 We'll reach out to you soon with early access.",
          },
          {
            id: uid(),
            from: 'bot',
            text: '🚀 ScrapNinja is launching soon in Dubai!\n\nIs there anything else you\'d like to know?',
            options: [
              { label: '🤔 What is ScrapNinja?', action: 'what_is' },
              { label: '💰 How can I sell scrap?', action: 'how_to_sell' },
              { label: '📊 Scrap disposal report?', action: 'disposal_report' },
              { label: '🚛 Become a vendor', action: 'vendor_flow' },
            ],
          },
        ]);
        break;

      case 'maybe_later':
        add([
          {
            id: uid(),
            from: 'bot',
            text: 'No worries! 🚀 ScrapNinja is launching soon in Dubai.\n\nWould you like early access?',
            options: [
              { label: 'Yes', action: 'lead_capture' },
              { label: 'No, thanks', action: 'universal_cta' },
            ],
          },
        ]);
        break;

      case 'universal_cta':
        add([
          {
            id: uid(),
            from: 'bot',
            text: "Alright! Feel free to come back anytime 😊\nWe're here to help you sell scrap smarter.",
            options: [
              { label: '🔄 Start over', action: 'welcome' },
            ],
          },
        ]);
        break;
    }
  };

  // ── Handle option click ──────────────────────────────
  const handleOption = (action: string) => {
    // find the option label for user message
    const lastMsg = messages.filter((m) => m.options).pop();
    const label = lastMsg?.options?.find((o) => o.action === action)?.label || action;

    setMessages((prev) => [
      ...prev,
      { id: uid(), from: 'user', text: label },
    ]);

    setTimeout(() => pushBotMessages(action as FlowStep), 400);
  };

  // ── Handle text input (lead capture) ─────────────────
  const handleSend = () => {
    const val = inputValue.trim();
    if (!val) return;

    setMessages((prev) => [
      ...prev,
      { id: uid(), from: 'user', text: val },
    ]);
    setInputValue('');

    if (awaitingInput === 'name') {
      setLeadName(val);
      setTimeout(() => pushBotMessages('lead_phone'), 400);
    } else if (awaitingInput === 'phone') {
      // Save lead to backend
      apiClient.captureLead({
        name: leadName,
        phone: val,
        source: 'CHATBOT',
        flow: lastFlow,
      }).catch(() => {});
      setTimeout(() => pushBotMessages('lead_done'), 400);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // ── Render ───────────────────────────────────────────
  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 rounded-full overflow-hidden flex items-center justify-center focus:outline-none transition-all ${
          isOpen ? 'w-14 h-14 bg-primary-600 text-white shadow-lg hover:bg-primary-700' : 'w-[84px] h-[84px] bg-transparent shadow-none'
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/ScrapNinja Logo Without Text.png"
                  alt="ScrapNinja"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                🥷
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight">ScrapNinja</p>
                <p className="text-xs text-white/70">Online • Pre-launch support</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
                aria-label="Minimize chat"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-neutral-50"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === 'user'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : 'bg-white text-neutral-800 shadow-sm border border-neutral-100 rounded-bl-md'
                    }`}
                  >
                    {msg.text}

                    {/* Option buttons */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.action}
                            onClick={() => handleOption(opt.action)}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 transition-colors border border-primary-200"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input area */}
            {awaitingInput ? (
              <div className="px-4 py-3 bg-white border-t border-neutral-200 flex gap-2 shrink-0">
                <input
                  ref={inputRef}
                  type={awaitingInput === 'phone' ? 'tel' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    awaitingInput === 'name'
                      ? 'Enter your name...'
                      : 'Enter your phone number...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-full bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 border-none"
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-40 transition-colors shrink-0"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 bg-white border-t border-neutral-200 shrink-0">
                <p className="text-xs text-neutral-400 text-center">
                  Choose an option above to continue 👆
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
