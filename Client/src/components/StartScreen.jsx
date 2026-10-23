function StartScreen({ onStart }) {
  return (
    <main className="mx-auto max-w-md p-6 flex flex-col gap-6">
      <h1 className="text-5xl font-bold">ตอบให้<span className="text-pink-500">รอด</span></h1>
      <p className="text-gray-500">มีคนทักมาตอนที่คุณไม่พร้อมที่สุด เลือกคำตอบที่พาคุณรอด</p>
      <button onClick={onStart} className="rounded-full bg-pink-500 py-3 text-lg text-white">
        เริ่มเลย
      </button>
    </main>
  )
}

export default StartScreen