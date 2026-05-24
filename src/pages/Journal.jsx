import { Link } from "react-router-dom"
import { articles } from "../data/articles"

function Journal() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-zinc-100">
      {/* 背景光斑 */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Weisi<span className="text-violet-300">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <a href="#articles" className="transition hover:text-white">
            Articles
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:p-10">
          <p className="mb-4 text-sm text-zinc-400">
            Journal / Logs / Notes
          </p>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            我的
            <span className="bg-gradient-to-r from-violet-300 via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
              {" "}日志空间
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            这里用来放一些日志、随笔、学习记录和文章入口。完整正文可以先放在飞书文档里，
            这个页面负责做统一整理和展示。
          </p>
        </div>

        <section id="articles" className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="flex min-h-72 flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200">
                  {article.tag}
                </span>
                <span className="text-xs text-zinc-500">
                  {article.date}
                </span>
              </div>

              <h2 className="text-xl font-bold leading-snug text-zinc-100">
                {article.title}
              </h2>

              <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">
                {article.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {article.feishuUrl ? (
                  <a
                    href={article.feishuUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
                  >
                    飞书原文
                  </a>
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-500">
                    暂无原文链接
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}

export default Journal