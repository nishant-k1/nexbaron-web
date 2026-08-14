"use client";

import { MessageSquareMore, Send, X, User, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

import { useAuth } from "@/components/auth/auth-context";
import { getChatUrl, getToken } from "@/lib/api";

interface ChatAttachment {
  url: string;
  type: "image" | "video" | "document";
  name: string;
  size?: number;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: number;
  isRead?: boolean;
  edited?: boolean;
  deletedAt?: string | null;
  attachments?: ChatAttachment[];
}

const SESSION_KEY = "nexbaron-chat-session";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "avif", "svg", "bmp", "ico"];

// Cloudinary classifies PDFs as `resource_type: "image"`, so only render an
// <img> for real image files — PDFs/office docs render as a file chip instead.
function renderAsImage(a: ChatAttachment): boolean {
  if (a.type !== "image") return false;
  const ext = a.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.includes(ext);
}

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
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");

  useEffect(() => {
    nameRef.current = name;
    phoneRef.current = phone;
    emailRef.current = email;
  }, [name, phone, email]);

  const division = pathname.startsWith("/digital")
    ? "digital"
    : pathname.startsWith("/print")
      ? "print"
      : null;

  const [sessionId] = useState(getSessionId);
  const isLoggedIn = !!user;

  // Auto-merge anonymous messages when user logs in
  useEffect(() => {
    if (!division || !user || !sessionId) return;

    const token = getToken(division);
    if (!token) return;

    fetch(`/api/${division}/chat/merge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId,
        name: nameRef.current || undefined,
        phone: phoneRef.current || undefined,
        email: emailRef.current || undefined,
      }),
    }).catch(() => {});
  }, [division, user, sessionId]);

  // Load chat history from backend (initial + silent polling).
  const loadMessages = useCallback(() => {
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
          const next = data.messages.map(
            (m: {
              _id: string;
              message: string;
              sender: string;
              createdAt: string;
              isRead?: boolean;
              edited?: boolean;
              deletedAt?: string | null;
              attachments?: ChatAttachment[];
            }) => ({
              id: m._id,
              text: m.message,
              sender: m.sender === "agent" ? "agent" : "user",
              timestamp: new Date(m.createdAt).getTime(),
              isRead: m.isRead,
              edited: m.edited,
              deletedAt: m.deletedAt,
              attachments: m.attachments,
            }),
          );
          setMessages(next);
        }
      })
      .catch(() => {});
  }, [division, sessionId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Realtime: connect to the chat service socket so new agent messages and read
  // receipts arrive instantly while the widget is open.
  const socketRef = useRef<Socket | null>(null);
  const [agentTyping, setAgentTyping] = useState(false);
  useEffect(() => {
    if (!division || !open) return;
    socketRef.current?.disconnect();
    const token = getToken(division);
    const socket = io(getChatUrl(), {
      transports: ["websocket"],
      auth: {
        division,
        ...(token ? { token } : {}),
        ...(!token ? { sessionId } : {}),
      },
    });
    socket.on("message:new", loadMessages);
    socket.on("message:read", loadMessages);
    socket.on("message:updated", loadMessages);
    socket.on("message:deleted", loadMessages);
    socket.on("typing", (payload: { sender?: string; isTyping?: boolean }) => {
      setAgentTyping(payload.sender === "agent" && !!payload.isTyping);
    });
    socketRef.current = socket;
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [division, open, sessionId, loadMessages]);

  // Mark agent messages as read once the widget is open and visible.
  useEffect(() => {
    if (!division || !open) return;
    const token = getToken(division);
    fetch(`/api/${division}/chat/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {});
  }, [division, open, sessionId, messages]);

  // Presence heartbeat — keeps the CRM's online indicator accurate while the
  // widget is open. Pauses when hidden (pagevisibility throttles timers).
  useEffect(() => {
    if (!division || !open) return;
    const beat = () => {
      const token = getToken(division);
      fetch(`/api/${division}/chat/presence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    };
    beat();
    const interval = setInterval(beat, 30000);
    return () => clearInterval(interval);
  }, [division, open, sessionId]);

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
            phone: phone || undefined,
            email: email || undefined,
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
    [division, sessionId, name, phone, email],
  );

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setFormError("Please enter your name");
      return;
    }
    if (!trimmedPhone && !trimmedEmail) {
      setFormError("Please enter a phone or email so we can reach you");
      return;
    }
    setFormError("");
    setNameSet(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  if (!division) return null;

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="live-chat-panel"
        className="cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-400 hover:scale-110 transition-all duration-300"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquareMore className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="live-chat-panel"
          role="dialog"
          aria-label="Live chat"
          className="absolute bottom-20 right-0 w-80 sm:w-96 h-[28rem] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-slate-800 border-b border-white/10 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <MessageSquareMore className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Nexbaron {division === "digital" ? "Digital" : "Print"}
              </p>
              <p className="text-[10px] text-slate-400">
                {isLoggedIn ? "Replies appear here" : "Log in to save chat history"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
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
                <form onSubmit={handleNameSubmit} className="flex flex-col gap-2 max-w-xs mx-auto">
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setFormError("");
                    }}
                    placeholder="Your name *"
                    aria-label="Your name"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
                    autoFocus
                  />
                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setFormError("");
                    }}
                    type="tel"
                    placeholder="Phone"
                    aria-label="Phone number"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
                  />
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFormError("");
                    }}
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
                  />
                  {formError && (
                    <p className="text-[11px] text-red-400 text-center" role="alert">
                      {formError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="cursor-pointer w-full py-2 bg-teal-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-teal-400"
                  >
                    Start chat
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
                      {msg.deletedAt ? (
                        <span className="italic opacity-60">This message was deleted</span>
                      ) : (
                        msg.text
                      )}
                      {msg.attachments?.map((a, i) => (
                        <div key={`${msg.id}-a${i}`} className="mt-2">
                          {renderAsImage(a) ? (
                            // Chat attachments are presigned R2 URLs; next/image
                            // remotePatterns can't be pinned, so use a raw <img>.
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.url}
                              alt={a.name}
                              className="rounded-lg max-w-full max-h-48 object-cover block"
                            />
                          ) : (
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" /> {a.name}
                            </a>
                          )}
                        </div>
                      ))}
                      <div
                        className={`text-[10px] mt-1 flex items-center gap-1 ${
                          msg.sender === "user" ? "text-slate-700" : "text-slate-500"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {msg.sender === "user" && msg.isRead && <span>· Seen</span>}
                        {msg.sender === "agent" && msg.edited && !msg.deletedAt && (
                          <span>· edited</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {agentTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl bg-slate-800 text-slate-200 rounded-bl-md flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        aria-hidden="true"
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                        aria-hidden="true"
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                        aria-hidden="true"
                      />
                      <span className="text-[11px] text-slate-400 ml-1">typing…</span>
                    </div>
                  </div>
                )}
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
                aria-label="Type your message"
                disabled={sending}
                className="flex-1 px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="cursor-pointer p-2 bg-teal-500 text-slate-950 rounded-xl hover:bg-teal-400 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors"
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
