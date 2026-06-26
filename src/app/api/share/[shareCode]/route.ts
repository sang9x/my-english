import { NextRequest } from "next/server";
import { getTopicByShareCode, getWordsByTopicId } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shareCode: string }> }
) {
  try {
    const { shareCode } = await params;
    const topic = getTopicByShareCode(shareCode.toUpperCase());
    if (!topic) {
      return Response.json(
        { error: "Chủ đề không tồn tại hoặc đã bị xóa" },
        { status: 404 }
      );
    }

    const words = getWordsByTopicId(topic.id).map((w) => ({
      ...w,
      vietnamese: JSON.parse(w.vietnamese) as string[],
    }));

    return Response.json({ topic, words });
  } catch (err) {
    console.error("[GET /api/share/[shareCode]]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
