import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// This route is for dev mode only. In production static export,
// it falls back gracefully since data comes from public/pages-data.json.
export const dynamic = "force-static";

const DATA_FILE = path.join(process.cwd(), "data", "published-pages.json");

interface PageData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  tags: string[];
  cover: string;
  content: string;
  author: string;
  created_at: string;
}

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function GET() {
  try {
    await ensureFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const pages: PageData[] = JSON.parse(raw);
    return NextResponse.json(pages);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureFile();
    const body = await req.json();
    const { title, excerpt, tags, cover, content, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const now = new Date().toISOString().split("T")[0];

    const newPage: PageData = {
      slug,
      title,
      excerpt: excerpt || "No description provided.",
      date: now,
      read_time: `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`,
      tags: tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      cover: cover || "",
      content,
      author: author || "Jayaharisai",
      created_at: new Date().toISOString(),
    };

    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const pages: PageData[] = JSON.parse(raw);
    const existing = pages.findIndex((p) => p.slug === slug);
    if (existing >= 0) pages[existing] = newPage;
    else pages.unshift(newPage);

    await fs.writeFile(DATA_FILE, JSON.stringify(pages, null, 2), "utf-8");
    return NextResponse.json({ success: true, slug });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save" },
      { status: 500 }
    );
  }
}