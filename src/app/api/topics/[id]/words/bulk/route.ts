import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { getTopicById, bulkAddWords } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const topic = getTopicById(id);
    if (!topic) return Response.json({ error: "Không tìm thấy chủ đề" }, { status: 404 });

    const body = await request.json();
    const { words } = body;

    if (!Array.isArray(words) || words.length === 0) {
      return Response.json({ error: "Danh sách từ không hợp lệ" }, { status: 400 });
    }

    if (words.length > 200) {
      return Response.json({ error: "Tối đa 200 từ mỗi lần import" }, { status: 400 });
    }

    const normalizedWords = words
      .filter((w) => w.english && typeof w.english === "string")
      .map((w) => ({
        id: nanoid(),
        english: w.english.trim(),
        vietnamese: Array.isArray(w.vietnamese)
          ? w.vietnamese.map((v: string) => v.trim().toLowerCase()).filter(Boolean)
          : typeof w.vietnamese === "string"
          ? w.vietnamese.split(",").map((v: string) => v.trim().toLowerCase()).filter(Boolean)
          : [],
        ipa: w.ipa?.trim() ?? "",
        example: w.example?.trim() ?? "",
        exampleVi: w.exampleVi?.trim() ?? "",
      }))
      .filter((w) => w.vietnamese.length > 0);

    if (normalizedWords.length === 0) {
      return Response.json(
        { error: "Không có từ hợp lệ nào để thêm" },
        { status: 400 }
      );
    }

    const result = bulkAddWords(id, normalizedWords);

    return Response.json({
      message: `Đã thêm ${result.added} từ thành công`,
      ...result,
    });
  } catch (err) {
    console.error("[POST /api/topics/[id]/words/bulk]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
