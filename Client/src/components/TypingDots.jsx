function TypingDots() {
  return (
    <div className="self-start flex gap-1 rounded-2xl border bg-white px-4 py-3">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

export default TypingDots