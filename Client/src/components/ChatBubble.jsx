function ChatBubble({ text, fromMe }) {
  const side = fromMe
    ? "self-end bg-me text-white rounded-br-md"
    : "self-start bg-white border border-line rounded-bl-md"
  return <p className={`animate-pop max-w-[80%] rounded-2xl px-3.5 py-2.5 ${side}`}>{text}</p>
}

export default ChatBubble