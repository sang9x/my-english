import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { getAllTopics, createTopic } from "@/lib/db";

export async function GET() {
  try {
    const topics = getAllTopics();
    return Response.json({ topics });
  } catch (err) {
    console.error("[GET /api/topics]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, emoji } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return Response.json({ error: "Tên chủ đề không được để trống" }, { status: 400 });
    }

    if (name.trim().length > 100) {
      return Response.json({ error: "Tên chủ đề tối đa 100 ký tự" }, { status: 400 });
    }

    const topic = createTopic({
      id: nanoid(),
      name: name.trim(),
      description: description?.trim() ?? "",
      emoji: emoji ?? "📚",
      shareCode: nanoid(6).toUpperCase(),
    });

    return Response.json({ topic }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/topics]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
