"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Zoom from "@mui/material/Zoom";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Tooltip from "@mui/material/Tooltip";

const SUGGESTIONS = [
  "Show me gaming laptops",
  "Any deals on monitors?",
  "Recommend a mechanical keyboard",
  "What is the return policy?"
];

export default function ChatbotWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your Tech Mart AI Assistant. How can I help you find the best tech products today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem("tech_mart_chat_history");
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }
  }, []);

  // Save chat history to localStorage when messages change
  const saveHistory = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem("tech_mart_chat_history", JSON.stringify(newMessages));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const userQuery = textToSend || input;
    if (!userQuery.trim() || isLoading) return;

    if (!textToSend) setInput("");

    const newMessages = [
      ...messages,
      { role: "user", content: userQuery }
    ];
    saveHistory(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/API/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to connect to API");
      }

      const data = await response.json();
      if (data.text) {
        saveHistory([...newMessages, { role: "assistant", content: data.text }]);
      } else if (data.error) {
        saveHistory([...newMessages, { role: "assistant", content: "I encountered an error: " + data.error }]);
      } else {
        saveHistory([...newMessages, { role: "assistant", content: "Sorry, I couldn't get a proper reply." }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      saveHistory([
        ...newMessages,
        { role: "assistant", content: "Sorry, I am unable to connect to the assistant right now. Please check your connection or try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    const resetMsg = [
      {
        role: "assistant",
        content: "Chat cleared! How can I help you find the best tech products today?"
      }
    ];
    setMessages(resetMsg);
    localStorage.removeItem("tech_mart_chat_history");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (text) => {
    if (!text) return "";
    
    // Split by code blocks
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).trim();
        return (
          <Box
            key={index}
            component="pre"
            sx={{
              bgcolor: "rgba(0,0,0,0.04)",
              p: 1.5,
              borderRadius: 2,
              fontSize: "0.75rem",
              fontFamily: "monospace",
              overflowX: "auto",
              my: 1.5,
              border: "1px solid rgba(0,0,0,0.06)"
            }}
          >
            <code>{code}</code>
          </Box>
        );
      }
      
      const lines = part.split("\n");
      return lines.map((line, lineIdx) => {
        const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
        let cleanLine = line;
        if (isBullet) {
          cleanLine = line.trim().substring(2);
        }
        
        // Parse bold **text**
        const boldParts = cleanLine.split(/(\*\*.*?\*\*)/g);
        const formattedLine = boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith("**") && bPart.endsWith("**")) {
            return <strong key={bIdx} style={{ fontWeight: 850 }}>{bPart.slice(2, -2)}</strong>;
          }
          return bPart;
        });

        if (isBullet) {
          return (
            <Box key={`${lineIdx}-${index}`} sx={{ display: "flex", alignItems: "flex-start", ml: 1, my: 0.5 }}>
              <Box component="span" sx={{ mr: 1.25, color: "#2453d4", fontWeight: "bold" }}>•</Box>
              <Typography variant="body2" sx={{ fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", color: "inherit", lineHeight: 1.5, fontWeight: 500 }}>
                {formattedLine}
              </Typography>
            </Box>
          );
        }

        return (
          <Typography 
            key={`${lineIdx}-${index}`} 
            variant="body2" 
            sx={{ 
              fontFamily: "var(--font-montserrat)", 
              fontSize: "0.85rem", 
              minHeight: line.trim() === "" ? "0.5em" : "auto",
              mb: 0.5,
              lineHeight: 1.5,
              color: "inherit",
              fontWeight: 500
            }}
          >
            {formattedLine}
          </Typography>
        );
      });
    });
  };

  return (
    <Zoom in={isOpen} style={{ transformOrigin: "bottom right" }}>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 80, sm: 95 },
          right: { xs: 20, sm: 30 },
          zIndex: 9999
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: { xs: "calc(100vw - 40px)", sm: 380 },
            height: { xs: "60vh", sm: 500 },
            borderRadius: "24px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            bgcolor: "white"
          }}
        >
          {/* Minimalist Header */}
          <Box sx={{
            bgcolor: "white",
            p: 2.5,
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: "rgba(36,83,212,0.06)", width: 40, height: 40, border: "1px solid rgba(36,83,212,0.1)" }}>
                <SmartToyIcon sx={{ color: "#2453d4", fontSize: 22 }} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", fontSize: "0.92rem", color: "#0f172a", lineHeight: 1.2 }}>
                  Tech Mart Assistant
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#22c55e" }} />
                  <Typography variant="caption" sx={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>
                    Online
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Clear Chat">
                <IconButton size="small" onClick={handleClear} sx={{ color: "#64748b", "&:hover": { color: "#ef4444", bgcolor: "#f8fafc" } }}>
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={onClose} sx={{ color: "#64748b", "&:hover": { color: "#0f172a", bgcolor: "#f8fafc" } }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Message Panel */}
          <Box sx={{
            flex: 1,
            overflowY: "auto",
            p: 2.5,
            bgcolor: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            scrollbarWidth: "thin"
          }}>
            {messages.map((msg, index) => {
              const isBot = msg.role === "assistant";
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.25,
                    maxWidth: "85%",
                    alignSelf: isBot ? "flex-start" : "flex-end",
                    flexDirection: isBot ? "row" : "row-reverse"
                  }}
                >
                  {isBot && (
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#2453d4", fontSize: "0.85rem", mt: 0.25 }}>
                      <SmartToyIcon sx={{ fontSize: 16, color: "white" }} />
                    </Avatar>
                  )}
                  <Box sx={{
                    bgcolor: isBot ? "white" : "#2453d4",
                    color: isBot ? "#334155" : "white",
                    p: 1.75,
                    borderRadius: isBot ? "4px 16px 16px 16px" : "16px 16px 4px 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    border: isBot ? "1px solid rgba(226, 232, 240, 0.8)" : "none",
                    wordBreak: "break-word"
                  }}>
                    {formatMessage(msg.content)}
                  </Box>
                </Box>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, alignSelf: "flex-start", maxWidth: "85%" }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: "#2453d4" }}>
                  <SmartToyIcon sx={{ fontSize: 16, color: "white" }} />
                </Avatar>
                <Box sx={{
                  bgcolor: "white",
                  p: 1.5,
                  borderRadius: "4px 16px 16px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5
                }}>
                  <Box className="typing-dot" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#94a3b8", animation: "bounce 1.4s infinite ease-in-out", animationDelay: "0s" }} />
                  <Box className="typing-dot" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#94a3b8", animation: "bounce 1.4s infinite ease-in-out", animationDelay: "0.2s" }} />
                  <Box className="typing-dot" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#94a3b8", animation: "bounce 1.4s infinite ease-in-out", animationDelay: "0.4s" }} />
                </Box>
              </Box>
            )}

            {/* Suggestion Pills */}
            {messages.length <= 1 && !isLoading && (
              <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1.25 }}>
                <Typography variant="caption" sx={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, color: "#64748b", ml: 0.5, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Common Inquiries
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <Box
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      sx={{
                        bgcolor: "white",
                        border: "1px solid #e2e8f0",
                        color: "#475569",
                        px: 2,
                        py: 0.9,
                        borderRadius: "999px",
                        fontSize: "0.78rem",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.01)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "rgba(36, 83, 212, 0.04)",
                          color: "#2453d4",
                          borderColor: "rgba(36, 83, 212, 0.15)",
                          transform: "translateY(-1px)"
                        }
                      }}
                    >
                      {suggestion}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Bar */}
          <Box
            component="div"
            sx={{
              p: 2,
              bgcolor: "white",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              gap: 1.25
            }}
          >
            <Box sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f5f9",
              borderRadius: "999px",
              px: 2.5,
              py: 0.9,
              border: "1px solid transparent",
              transition: "all 0.2s ease",
              "&:focus-within": {
                borderColor: "rgba(36, 83, 212, 0.25)",
                bgcolor: "white",
                boxShadow: "0 0 0 3px rgba(36, 83, 212, 0.08)"
              }
            }}>
              <InputBase
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message assistant..."
                disabled={isLoading}
                sx={{
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-montserrat)",
                  color: "#334155",
                  fontWeight: 500
                }}
              />
            </Box>
            <IconButton
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              sx={{
                bgcolor: input.trim() && !isLoading ? "#2453d4" : "#e2e8f0",
                color: input.trim() && !isLoading ? "white" : "#94a3b8",
                "&:hover": {
                  bgcolor: input.trim() && !isLoading ? "#1c42a5" : "#e2e8f0"
                },
                width: 38,
                height: 38,
                transition: "all 0.2s ease"
              }}
            >
              <SendIcon fontSize="small" sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Animation styles for typing bubble */}
          <style jsx global>{`
            @keyframes bounce {
              0%, 80%, 100% { transform: scale(0); }
              40% { transform: scale(1.0); }
            }
          `}</style>
        </Paper>
      </Box>
    </Zoom>
  );
}
