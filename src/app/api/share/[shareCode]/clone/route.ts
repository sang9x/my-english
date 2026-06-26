import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { cloneTopic } from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ shareCode: string }> }
) {
  try {
    const { shareCode } = await params;
    const newId = nanoid();
    const newShareCode = nanoid(6).toUpperCase();

    const cloned = cloneTopic(shareCode.toUpperCase(), newId, newShareCode);

    if (!cloned) {
      return Response.json(
        { error: "Chủ đề không tồn tại hoặc đã bị xóa" },
        { status: 404 }
      );
    }

    return Response.json({ topic: cloned }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/share/[shareCode]/clone]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
