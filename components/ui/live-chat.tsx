"use client";

import { MessageCircle, Send, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: number;
}

const SESSION_KEY = "nexbaron-chat-session";
const MESSAGES_KEY = "nexbaron-chat-messages";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: ChatMessage[]) {
  if (typeof window === "undefined") return;
  // Keep only last 50 messages
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs.slice(-50)));
}

export function LiveChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const division = pathname.startsWith("/digital")
    ? "digital"
    : pathname.startsWith("/print")
      ? "print"
      : null;

  // Load messages on mount
  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !division) return;

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        text: text.trim(),
        sender: "user",
        timestamp: Date.now(),
      };

      const updated = [...messages, userMsg];
      setMessages(updated);
      saveMessages(updated);
      setInput("");
      setSending(true);

      try {
        const res = await fetch(`/api/${division}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name || "Website Visitor",
            email: "",
            message: text.trim(),
            source: "live-chat",
            sessionId: getSessionId(),
          }),
        });

        if (res.ok) {
          const autoReply: ChatMessage = {
            id: `a_${Date.now()}`,
            text: "Thanks for your message! We typically reply within a few hours. If you need immediate help, call or WhatsApp us using the buttons below.",
            sender: "agent",
            timestamp: Date.now(),
          };
          const withReply = [...updated, autoReply];
          setMessages(withReply);
          saveMessages(withReply);
        } else {
          const errorMsg: ChatMessage = {
            id: `a_${Date.now()}`,
            text: "Sorry, something went wrong. Please try WhatsApp or call us instead — we'll respond immediately.",
            sender: "agent",
            timestamp: Date.now(),
          };
          const withError = [...updated, errorMsg];
          setMessages(withError);
          saveMessages(withError);
        }
      } catch {
        const errorMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          text: "Message couldn't be sent. Please use WhatsApp or call — we're available right now.",
          sender: "agent",
          timestamp: Date.now(),
        };
        const withError = [...updated, errorMsg];
        setMessages(withError);
        saveMessages(withError);
      } finally {
        setSending(false);
      }
    },
    [messages, division, name],
  );

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setNameSet(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  if (!division) return null;

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-400 hover:scale-110 transition-all duration-300"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[28rem] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-800 border-b border-white/10 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Nexbaron {division === "digital" ? "Digital" : "Print"}
              </p>
              <p className="text-[10px] text-slate-400">We reply within a few hours</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!nameSet ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-teal-500/10 border border-teal-500/20 mx-auto mb-4 flex items-center justify-center">
                  <User className="w-7 h-7 text-teal-400" />
                </div>
                <p className="text-sm text-white font-medium mb-1">
                  Welcome! What should we call you?
                </p>
                <p className="text-xs text-slate-400 mb-4">
                  Your name helps us personalise the conversation.
                </p>
                <form onSubmit={handleNameSubmit} className="flex gap-2 max-w-xs mx-auto">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-teal-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-teal-400"
                  >
                    Start
                  </button>
                </form>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">
                    Send us a message — we&apos;re here to help.
                  </p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-teal-500 text-slate-950 rounded-br-md"
                          : "bg-slate-800 text-slate-200 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                      <div
                        className={`text-[10px] mt-1 ${
                          msg.sender === "user" ? "text-slate-700" : "text-slate-500"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {nameSet && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3 border-t border-white/10 flex gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={sending}
                className="flex-1 px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="p-2 bg-teal-500 text-slate-950 rounded-xl hover:bg-teal-400 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors"
                aria-label="Send message"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
