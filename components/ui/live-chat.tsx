"use client";

import { MessageCircle, Send, X, User, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { getToken } from "@/lib/api";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: number;
}

const SESSION_KEY = "nexbaron-chat-session";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function LiveChat() {
  const pathname = usePathname();
  const { user } = useAuth();
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

  const sessionId = getSessionId();
  const isLoggedIn = !!user;

  // Load chat history from backend
  useEffect(() => {
    if (!division) return;

    const token = getToken(division);
    const params = new URLSearchParams();
    params.set("sessionId", sessionId);

    fetch(`/api/${division}/chat?${params.toString()}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) {
          setMessages(
            data.messages.map(
              (m: { _id: string; message: string; sender: string; createdAt: string }) => ({
                id: m._id,
                text: m.message,
                sender: m.sender === "agent" ? "agent" : "user",
                timestamp: new Date(m.createdAt).getTime(),
              }),
            ),
          );
        }
      })
      .catch(() => {});
  }, [division, user, sessionId]);

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

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setSending(true);

      try {
        const token = getToken(division);
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`/api/${division}/chat`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            message: text.trim(),
            sessionId,
            name: name || undefined,
          }),
        });

        if (!res.ok) {
          setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
        }
      } catch {
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setSending(false);
      }
    },
    [division, sessionId, name],
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
              <p className="text-[10px] text-slate-400">
                {isLoggedIn ? "Replies appear here" : "Log in to save chat history"}
              </p>
            </div>
            {!isLoggedIn && (
              <button
                onClick={() => window.open(`/${division}`, "_blank", "noopener,noreferrer")}
                className="ml-auto flex items-center gap-1 px-2 py-1 text-[10px] text-teal-400 hover:text-teal-300 border border-teal-500/30 rounded shrink-0"
              >
                <LogIn className="w-3 h-3" /> Log in
              </button>
            )}
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
                  {isLoggedIn
                    ? "Your chat history is saved to your account."
                    : "Log in to save chat history across sessions."}
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
