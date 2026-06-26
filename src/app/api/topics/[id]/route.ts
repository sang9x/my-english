import { NextRequest } from "next/server";
import { getTopicById, updateTopic, deleteTopic } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const topic = getTopicById(id);
    if (!topic) return Response.json({ error: "Không tìm thấy chủ đề" }, { status: 404 });
    return Response.json({ topic });
  } catch (err) {
    console.error("[GET /api/topics/[id]]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, emoji } = body;

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
      return Response.json({ error: "Tên chủ đề không hợp lệ" }, { status: 400 });
    }

    const topic = updateTopic(id, {
      name: name?.trim(),
      description: description?.trim(),
      emoji,
    });

    if (!topic) return Response.json({ error: "Không tìm thấy chủ đề" }, { status: 404 });
    return Response.json({ topic });
  } catch (err) {
    console.error("[PUT /api/topics/[id]]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteTopic(id);
    if (!deleted) return Response.json({ error: "Không tìm thấy chủ đề" }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/topics/[id]]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
