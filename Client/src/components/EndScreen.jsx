import { RANKS } from "../data/scenarios"

function EndScreen({ score, maxScore, history, onRestart }) {
  const percent = (score / maxScore) * 100
  const rank = RANKS.find((r) => percent >= r.min)

  return (
    <main className="mx-auto max-w-md p-6 flex flex-col gap-4">
      <p className="text-sm text-gray-500">ระดับการเอาตัวรอดของคุณ</p>
      <h2 className="text-3xl font-bold">{rank.title}</h2>
      <p className="text-5xl font-bold text-pink-500">{score}/{maxScore}</p>
      <p className="text-gray-500">{rank.desc}</p>
      <ul className="flex flex-col gap-2">
        {history.map((h, i) => (
          <li key={i} className="rounded-xl border p-3 flex justify-between gap-3">
            <span>
              <b>{h.situation}</b>
              <br />
              <span className="text-sm text-gray-500">“{h.text}”</span>
            </span>
            <span className="font-bold">+{h.score}</span>
          </li>
        ))}
      </ul>
      <button onClick={onRestart} className="rounded-full bg-pink-500 py-3 text-white">
        เล่นอีกรอบ
      </button>
    </main>
  )
}

export default EndScreen