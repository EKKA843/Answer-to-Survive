import { useState } from "react"
import  { scenarios }  from "./data/scenarios"
import StartScreen from "./components/StartScreen"
import GameScreen from "./components/GameScreen"
import EndScreen from "./components/EndScreen"

const ROUNDS = 5
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

function App() {
  const [screen, setScreen] = useState("start")
  const [rounds, setRounds] = useState([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [history, setHistory] = useState([])

  const score = history.reduce((sum, h) => sum + h.score, 0)
  const maxScore = ROUNDS * 3

  function startGame() {
    setRounds(
      shuffle(scenarios).slice(0, ROUNDS).map((s) => ({ ...s, options: shuffle(s.options) }))
    )
    setIndex(0)
    setPicked(null)
    setHistory([])
    setScreen("game")
  }

  function choose(option) {
    if (picked) return
    setPicked(option)
    setHistory([...history, { ...option, situation: rounds[index].situation }])
  }

  function next() {
    if (index === ROUNDS - 1) return setScreen("end")
    setIndex(index + 1)
    setPicked(null)
  }

  if (screen === "start") return <StartScreen onStart={startGame} />
  if (screen === "end")
    return <EndScreen score={score} maxScore={maxScore} history={history} onRestart={startGame} />

  return (
    <GameScreen
      key={index}
      round={rounds[index]}
      index={index}
      total={ROUNDS}
      score={score}
      maxScore={maxScore}
      picked={picked}
      onChoose={choose}
      onNext={next}
    />
  )
}

export default App