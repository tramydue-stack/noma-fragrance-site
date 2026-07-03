import React, { useEffect, useRef, useState } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/uvhpjne5xo7xf86as9rxotwru5j8ygxm";

export default function NomaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Dạ NOMA chào bạn ạ. Bạn muốn tìm mùi hương nhẹ nhàng, tươi mát hay ấm áp hơn ạ?",
    },
  ]);

  useEffect(() => {
    let storedUserId = localStorage.getItem("noma_website_user_id");

    if (!storedUserId) {
      storedUserId =
        "web_" +
        Date.now().toString() +
        "_" +
        Math.random().toString(36).substring(2, 8);

      localStorage.setItem("noma_website_user_id", storedUserId);
    }

    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: trimmedMessage,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: trimmedMessage,
        }),
      });

      const responseText = await response.text();

      let botReply = responseText;

      try {
        const data = JSON.parse(responseText);
        botReply = data.reply || data.message || responseText;
      } catch {
        botReply = responseText;
      }

      if (!botReply || botReply.toLowerCase() === "accepted") {
        botReply =
          "NOMA đã nhận được tin nhắn của bạn rồi ạ. Bạn chờ NOMA phản hồi trong giây lát nha.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Hiện tại NOMA chưa phản hồi được. Bạn thử lại sau một chút giúp NOMA nha.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-[#2B211B] text-warm-ivory shadow-2xl flex items-center justify-center text-xl hover:scale-105 transition-transform"
        aria-label="Open NOMA chatbot"
      >
        {isOpen ? "×" : "💬"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[calc(100vw-32px)] h-[520px] bg-warm-ivory border border-deep-brown/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-[#2B211B] text-warm-ivory px-5 py-4">
            <p className="text-sm tracking-[0.18em] uppercase">
              NOMA Fragrance
            </p>
            <p className="text-xs text-warm-ivory/70 mt-1">
              Tư vấn mùi hương cùng NOMA
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  message.sender === "user"
                    ? "ml-auto bg-[#2B211B] text-warm-ivory rounded-br-sm"
                    : "mr-auto bg-[#EFE7DC] text-[#2B211B] rounded-bl-sm"
                }`}
              >
                {message.text}
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto bg-[#EFE7DC] text-[#2B211B] max-w-[82%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm">
                NOMA đang tư vấn cho bạn...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-deep-brown/10 p-3 flex gap-2 bg-warm-ivory">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Nhập tin nhắn..."
              className="flex-1 rounded-full border border-deep-brown/20 px-4 py-2 text-sm outline-none bg-white text-[#2B211B]"
            />

            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="rounded-full bg-[#2B211B] text-warm-ivory px-4 py-2 text-sm disabled:opacity-50"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
