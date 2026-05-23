import { useEffect, useState } from "react"
import { profile } from "./data/profile"

function App() {
  const [now, setNow] = useState(new Date())
  const [randomText, setRandomText] = useState(profile.randomSentences[0])
  const [surpriseText, setSurpriseText] = useState("点一下，看看今天的小彩蛋。")

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function changeRandomText() {
    const index = Math.floor(Math.random() * profile.randomSentences.length)
    setRandomText(profile.randomSentences[index])
  }
  function showSurprise() {
    const index = Math.floor(Math.random() * profile.surprises.length)
    setSurpriseText(profile.surprises[index])
  }

  const dateText = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  const timeText = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-zinc-100">
      {/* 背景光斑 */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* 顶部导航 */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="text-lg font-semibold tracking-tight">
          {profile.siteName.replace(".", "")}
          <span className="text-violet-300">.</span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#now" className="transition hover:text-white">Now</a>
          <a href="#likes" className="transition hover:text-white">Likes</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </div>
      </nav>

      {/* 主体 */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="grid gap-5 md:grid-cols-4">
          {/* Hero 大卡片 */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:col-span-3 md:row-span-2 md:p-10">
            <div className="absolute right-8 top-8 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400 md:block">
              Personal Homepage
            </div>

            <p className="mb-5 text-sm text-zinc-400">
              {profile.heroLabel}
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              {profile.heroTitle}
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
                {profile.heroHighlight}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              {profile.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-300/50 hover:bg-violet-300/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 头像 / 状态卡 */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 via-cyan-200 to-fuchsia-300 p-[3px] shadow-lg">
              <img
                src={profile.avatar}
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold">{profile.status.title}</h2>
            <p className="mt-3 leading-7 text-zinc-400">
              {profile.status.text}
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                {profile.status.moodLabel}
              </p>
              <p className="mt-2 text-lg font-semibold">
                {profile.status.mood}
              </p>
            </div>
          </div>

          {/* Now */}
          <Card
            id="now"
            title="Now"
            emoji="🧭"
            className="md:col-span-2"
          >
            <ul className="space-y-3 text-zinc-300">
              {profile.now.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          {/* Music */}
          <Card title="Music" emoji="🎧">
            <p className="leading-7 text-zinc-300">
              {profile.music}
            </p>
          </Card>

          {/* Today */}
          <Card title="Today" emoji="📅">
            <p className="text-sm text-zinc-400">今天是</p>
            <p className="mt-2 text-lg font-semibold text-zinc-100">
              {dateText}
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Local Time
              </p>
              <p className="mt-2 text-2xl font-bold text-zinc-100">
                {timeText}
              </p>
            </div>
          </Card>

          {/* Random */}
          <Card title="Random" emoji="✨">
            <p className="min-h-20 leading-7 text-zinc-300">
              {randomText}
            </p>

            <button
              onClick={changeRandomText}
              className="mt-5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition hover:border-violet-300/50 hover:bg-violet-300/10 hover:text-white"
            >
              换一句
            </button>
          </Card>
          {/* Little Surprise */}
          <Card title="Little Surprise" emoji="🎲">
            <p className="min-h-20 leading-7 text-zinc-300">
              {surpriseText}
            </p>

            <button
              onClick={showSurprise}
              className="mt-5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
            >
              抽一个小彩蛋
            </button>
          </Card>

          {/* About */}
          <Card
            id="about"
            title="About Me"
            emoji="🌙"
            className="md:col-span-2"
          >
            <p className="leading-8 text-zinc-300">
              {profile.about}
            </p>
          </Card>

          {/* Likes */}
          <Card
            id="likes"
            title="Things I Like"
            emoji="🪐"
            className="md:col-span-2"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.likes.map((item) => (
                <MiniItem
                  key={item.title}
                  title={item.title}
                  text={item.text}
                />
              ))}
            </div>
          </Card>

          {/* Contact */}
          <Card
            id="contact"
            title="Contact"
            emoji="📮"
            className="md:col-span-4"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="text-zinc-300">
                {profile.contactText}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
                  href={`mailto:${profile.links.email}`}
                >
                  Email
                </a>

                <a
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition hover:border-violet-300/50 hover:text-white"
                  href={profile.links.github}
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

function Card({ id, title, emoji, children, className = "" }) {
  return (
    <section
      id={id}
      className={`rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/[0.06] ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-xl">
          {emoji}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {children}
    </section>
  )
}

function MiniItem({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h3 className="font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  )
}

export default App