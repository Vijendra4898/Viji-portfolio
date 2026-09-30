"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Loader2,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  {
    label: "AI Product",
    prompt:
      "I want to build an AI-powered SaaS product. Help me define the product scope, features, architecture and recommended technology stack.",
  },
  {
    label: "SaaS",
    prompt:
      "I want to build a SaaS MVP for businesses. Help me plan the core modules, architecture and development approach.",
  },
  {
    label: "Dashboard",
    prompt:
      "I need a modern enterprise dashboard with analytics, charts, filters and real-time data. How would you architect it?",
  },
  {
    label: "Website",
    prompt:
      "I need a premium modern website for my business. Help me define the sections, UX, animations, SEO and technology stack.",
  },
  {
    label: "E-commerce",
    prompt:
      "I want to build a scalable e-commerce platform. Help me define the important features, architecture and development roadmap.",
  },
];

const initialMessage: Message = {
  role: "assistant",
  content:
    "Tell me what you want to build. I’ll help you turn the idea into a clear product scope, recommended architecture, technology stack and next steps.",
};

export default function ProjectAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    initialMessage,
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [sessionId] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const existing = window.localStorage.getItem(
      "portfolio-chat-session",
    );

    if (existing) {
      return existing;
    }

    const id = crypto.randomUUID();

    window.localStorage.setItem(
      "portfolio-chat-session",
      id,
    );

    return id;
  });

  const sendMessage = async (message?: string) => {
    const text = (message ?? input).trim();

    if (!text || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong.",
        );
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(
        "Project Assistant error:",
        error,
      );

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't connect to the AI service right now. Please try again in a moment or start a direct conversation by email.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleQuickPrompt = async (
    prompt: string,
  ) => {
    await sendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  return (
    <section
      className="assistant-section section-pad"
      id="assistant"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} />
            INTERACTIVE SYSTEM
          </span>

          <h2>
            Describe an idea.
            <br />
            <em>I&apos;ll map the build.</em>
          </h2>
        </div>

        <p>
          Give a client a reason to interact instead
          of simply scrolling through a portfolio.
        </p>
      </div>

      <div className="assistant-grid">
        {/* CHAT PANEL */}
        <div className="assistant-panel glass-panel">
          <div className="assistant-head">
            <div className="assistant-status">
              <span className="status-dot" />
              <span>
                PROJECT ASSISTANT / ONLINE
              </span>
            </div>

            {messages.length > 1 && (
              <button
                className="assistant-clear"
                type="button"
                onClick={clearChat}
                aria-label="Clear conversation"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* QUICK PROMPTS */}
          <div className="assistant-options">
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                className="assistant-option"
                onClick={() =>
                  handleQuickPrompt(item.prompt)
                }
                disabled={loading}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CHAT */}
          <div className="assistant-chat">
            {messages.map(
              (message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "chat-message user-message"
                      : "chat-message assistant-message"
                  }
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <div className="chat-avatar">
                    {message.role ===
                    "user" ? (
                      <User size={15} />
                    ) : (
                      <Bot size={15} />
                    )}
                  </div>

                  <div className="chat-content">
                    <span className="chat-role">
                      {message.role ===
                      "user"
                        ? "YOU"
                        : "PROJECT AI"}
                    </span>

                    {message.role ===
                    "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({
                              children,
                              href,
                            }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                              </a>
                            ),

                            code: ({
                              children,
                              className,
                            }) => {
                              const isBlock =
                                Boolean(
                                  className,
                                );

                              if (
                                isBlock
                              ) {
                                return (
                                  <pre className="markdown-code-block">
                                    <code
                                      className={
                                        className
                                      }
                                    >
                                      {
                                        children
                                      }
                                    </code>
                                  </pre>
                                );
                              }

                              return (
                                <code className="markdown-inline-code">
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="user-text">
                        {message.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ),
            )}

            {/* TYPING */}
            {loading && (
              <motion.div
                className="chat-message assistant-message"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <div className="chat-avatar">
                  <Bot size={15} />
                </div>

                <div className="chat-content">
                  <span className="chat-role">
                    PROJECT AI
                  </span>

                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* INPUT */}
          <form
            className="assistant-input-wrap"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Example: I need an AI SaaS for a recruitment company..."
              disabled={loading}
              maxLength={2000}
            />

            <button
              type="submit"
              disabled={
                !input.trim() || loading
              }
              aria-label="Send message"
            >
              {loading ? (
                <Loader2
                  className="spin"
                  size={18}
                />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>

          <div className="assistant-hint">
            <span>GROQ AI</span>
            <span>•</span>
            <span>
              GOOGLE SHEETS CRM
            </span>
            <span>•</span>
            <span>NO DATABASE</span>
          </div>
        </div>

        {/* SIDE CTA */}
        <motion.div
          className="assistant-side glass-panel"
          whileHover={{
            y: -6,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <div className="assistant-side-orb" />

          <span className="mini-label">
            NEXT ACTION
          </span>

          <h3>
            Turn the idea
            <br />
            into a <em>real product.</em>
          </h3>

          <p>
            Have a project idea but don&apos;t know
            where to start? Talk to the AI assistant
            first and get a technical direction
            before discussing the actual scope.
          </p>

          <a
            className="line-link"
            href="mailto:patelvijendra55@gmail.com?subject=Project%20Inquiry&body=Hi%20Vijendra%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0AThanks"
          >
            Start a conversation
            <ArrowUpRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}