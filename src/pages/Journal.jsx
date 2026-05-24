import { Link, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { articles } from "../data/articles"

function Journal() {
  const { id } = useParams()
  const currentArticle = id
    ? articles.find((article) => String(article.id) === id)
    : null

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
          <Link to="/journal" className="transition hover:text-white">
            Journal
          </Link>
        </div>
      </nav>

      {currentArticle ? <ArticleDetail article={currentArticle} /> : <ArticleList />}
    </main>
  )
}

function ArticleList() {
  return (
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
          这里用来放一些日志、随笔、学习记录和文章入口。列表页只展示简介，点开后可以查看完整内容。
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
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
              <Link
                to={`/journal/${article.id}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                阅读全文
              </Link>

              {article.feishuUrl && (
                <a
                  href={article.feishuUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-cyan-300/40 hover:text-white"
                >
                  飞书原文
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}

function ArticleDetail({ article }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-10">
      <Link
        to="/journal"
        className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition hover:border-violet-300/40 hover:text-white"
      >
        ← 返回日志列表
      </Link>

      <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200">
            {article.tag}
          </span>
          <span className="text-sm text-zinc-500">
            {article.date}
          </span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {article.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          {article.summary}
        </p>

        <div className="my-8 h-px bg-white/10" />

        {article.content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-6 mt-2 text-4xl font-black leading-tight text-zinc-100">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-10 text-2xl font-bold text-zinc-100">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-8 text-xl font-bold text-zinc-100">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="my-4 text-base leading-9 text-zinc-300">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="my-4 list-disc space-y-2 pl-6 text-zinc-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 list-decimal space-y-2 pl-6 text-zinc-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-8">
                  {children}
                </li>
              ),
              code: ({ children }) => (
                <code className="rounded-md border border-white/10 bg-black/40 px-1.5 py-0.5 text-sm text-cyan-200">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="my-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-5 text-sm leading-7 text-zinc-200">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-5 border-l-4 border-violet-300/60 bg-white/[0.03] px-5 py-3 text-zinc-300">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
                >
                  {children}
                </a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        ) : (
          <p className="text-zinc-500">
            这篇文章暂时还没有完整正文。
          </p>
        )}

        {article.feishuUrl && (
          <div className="mt-10">
            <a
              href={article.feishuUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              打开飞书原文
            </a>
          </div>
        )}
      </article>
    </section>
  )
}

export default Journal