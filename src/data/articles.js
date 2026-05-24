const articleFiles = import.meta.glob("../content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
})

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "")

  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return {
      meta: {},
      content: text,
    }
  }

  const frontmatter = match[1]
  const content = match[2]

  const meta = {}

  frontmatter.split(/\r?\n/).forEach((line) => {
    const index = line.indexOf(":")
    if (index === -1) return

    const key = line.slice(0, index).trim()
    const value = line.slice(index + 1).trim()

    meta[key] = value
  })

  return {
    meta,
    content,
  }
}

function getSlug(path) {
  return path
    .split("/")
    .pop()
    .replace(".md", "")
}

export const articles = Object.entries(articleFiles)
  .map(([path, raw]) => {
    const { meta, content } = parseFrontmatter(raw)

    return {
      id: getSlug(path),
      title: meta.title || "未命名文章",
      date: meta.date || "",
      tag: meta.tag || "随笔",
      summary: meta.summary || "",
      feishuUrl: meta.feishuUrl || "",
      content,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))