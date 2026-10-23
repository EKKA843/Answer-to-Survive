import { useEffect, useState } from "react"
import ChatBubble from "./ChatBubble"
import TypingDots from "./TypingDots"

const KEYS = ["ก", "ข", "ค", "ง"]
const TAGS = [
  { label: "ตาย", color: "bg-bad" },
  { label: "เสี่ยง", color: "bg-warn" },
  { label: "พอไหว", color: "bg-me" },
  { label: "รอดสวย", color: "bg-good" },
]
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function GameScreen({ round, index, total, score, maxScore, picked, onChoose, onNext }) {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const [replied, setReplied] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function play() {
      for (let i = 0; i < round.messages.length; i++) {
        setTyping(true)
        await wait(800)
        if (cancelled) return
        setTyping(false)
        setShown(i + 1)
        await wait(300)
      }
    }
    play()
    return () => { cancelled = true }
  }, [round])

  useEffect(() => {
    if (!picked) return
    let cancelled = false
    async function reply() {
      await wait(500)
      if (cancelled) return
      setTyping(true)
      await wait(1200)
      if (cancelled) return
      setTyping(false)
      setReplied(true)
    }
    reply()
    return () => { cancelled = true }
  }, [picked])

  const readyToAnswer = shown === round.messages.length && !picked
  const percent = (score / maxScore) * 100
  const barColor = percent >= 60 ? "bg-good" : percent >= 30 ? "bg-warn" : "bg-bad"
  const tag = picked ? TAGS[picked.score] : null

  return (
    <main className="mx-auto max-w-[480px] min-h-screen px-4 py-4 flex flex-col gap-3">
      {/* แถบคะแนน */}
      <div className="flex items-center gap-3">
        <span className="font-display text-sm text-muted">แชทที่ {index + 1}/{total}</span>
        <div className="flex-1 h-2 rounded-full bg-chip overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="font-display text-sm tabular-nums">{score}/{maxScore}</span>
      </div>

      {/* หน้าจอแชท */}
      <div className="flex-1 flex flex-col rounded-3xl border border-line bg-white overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <div
            className="w-10 h-10 rounded-full grid place-items-center font-display text-white"
            style={{ background: round.color }}
          >
            {round.who.charAt(0)}
          </div>
          <div>
            <p className="font-display font-medium">{round.who}</p>
            <p className="text-xs text-muted">{typing ? "กำลังพิมพ์..." : "ออนไลน์"}</p>
          </div>
        </div>

        <div className="flex-1 bg-chat p-4 flex flex-col gap-1.5 min-h-72">
          <p className="self-center mb-1.5 rounded-full bg-chip px-3 py-1 text-xs text-muted">
            {round.situation}
          </p>
          {round.messages.slice(0, shown).map((m, i) => (
            <ChatBubble key={i} text={m} />
          ))}
          {picked && <ChatBubble text={picked.text} fromMe />}
          {replied && <ChatBubble text={picked.reply} />}
          {typing && <TypingDots />}
        </div>
      </div>

      {/* ตัวเลือกคำตอบ */}
      {readyToAnswer && (
        <div className="flex flex-col gap-2">
          <p className="font-display text-sm text-muted">ตอบว่าอะไรดี</p>
          {round.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onChoose(opt)}
              className="animate-pop flex items-start gap-3 text-left rounded-2xl border-[1.5px] border-line bg-white px-3.5 py-3 hover:border-me transition-colors"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-chip grid place-items-center font-display text-sm">
                {KEYS[i]}
              </span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* ผลของคำตอบ */}
      {replied && (
        <div className="animate-pop rounded-2xl border-[1.5px] border-line bg-white p-4 flex flex-col gap-3">
          <span className={`self-start rounded-full px-3 py-1 font-display text-sm text-white ${tag.color}`}>
            {tag.label} +{picked.score}
          </span>
          <p>{picked.verdict}</p>
          <button
            onClick={onNext}
            className="rounded-full bg-accent py-3.5 font-display text-lg text-white hover:brightness-105"
          >
            {index === total - 1 ? "ดูผลสรุป" : "แชทต่อไป"}
          </button>
        </div>
      )}
    </main>
  )
}

export default GameScreen