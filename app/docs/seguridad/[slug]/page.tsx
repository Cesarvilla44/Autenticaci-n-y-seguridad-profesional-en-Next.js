import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";

const documents = {
  oauth: "oauth.md",
  middleware: "middleware.md",
  credenciales: "credenciales.md",
} as const;

type DocumentSlug = keyof typeof documents;

function isDocumentSlug(slug: string): slug is DocumentSlug {
  return slug in documents;
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const elements = [];
  let codeBlock: string[] = [];
  let inCodeBlock = false;
  let codeBlockIndex = 0;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${codeBlockIndex++}`} className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-200 border border-slate-700">
            <code>{codeBlock.join("\n")}</code>
          </pre>
        );
        codeBlock = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlock.push(line);
      continue;
    }

    if (!line.trim()) {
      elements.push(<div key={index} className="h-3" />);
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(<h1 key={index} className="text-4xl font-bold text-white mb-6">{line.slice(2)}</h1>);
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>);
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(<h3 key={index} className="text-xl font-semibold text-blue-300 mt-6 mb-3">{line.slice(4)}</h3>);
      continue;
    }

    if (line.startsWith("- ")) {
      elements.push(<p key={index} className="text-slate-300 leading-7 pl-4">{line}</p>);
      continue;
    }

    if (/^\d+\. /.test(line)) {
      elements.push(<p key={index} className="text-slate-300 leading-7 pl-4">{line}</p>);
      continue;
    }

    elements.push(<p key={index} className="text-slate-300 leading-7">{line}</p>);
  }

  return elements;
}

export default async function SecurityDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isDocumentSlug(slug)) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "docs", "seguridad", documents[slug]);
  const markdown = await readFile(filePath, "utf8");

  return (
    <main className="animated-bg min-h-screen px-4 py-12 relative" suppressHydrationWarning>
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <article className="relative z-10 max-w-4xl mx-auto bg-slate-800/90 border border-slate-700 rounded-2xl shadow-2xl p-8">
        <Link href="/dashboard" className="inline-block text-blue-400 hover:text-blue-300 font-semibold mb-8">
          ← Volver al dashboard
        </Link>
        <div className="space-y-2">{renderMarkdown(markdown)}</div>
      </article>
    </main>
  );
}
