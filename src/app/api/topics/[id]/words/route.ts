import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { getTopicById, addWord, getWordsByTopicId } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const topic = getTopicById(id);
    if (!topic) return Response.json({ error: "Không tìm thấy chủ đề" }, { status: 404 });

    const words = getWordsByTopicId(id).map((w) => ({
      ...w,
      vietnamese: JSON.parse(w.vietnamese) as string[],
    }));

    return Response.json({ words });
  } catch (err) {
    console.error("[GET /api/topics/[id]/words]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const topic = getTopicById(id);
    if (!topic) return Response.json({ error: "Không tìm thấy chủ đề" }, { status: 404 });

    const body = await request.json();
    const { english, vietnamese, ipa, example, exampleVi } = body;

    if (!english || typeof english !== "string" || english.trim().length === 0) {
      return Response.json({ error: "Từ tiếng Anh không được để trống" }, { status: 400 });
    }

    const vietArray = Array.isArray(vietnamese)
      ? vietnamese.map((v: string) => v.trim().toLowerCase()).filter(Boolean)
      : typeof vietnamese === "string"
      ? vietnamese.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean)
      : [];

    if (vietArray.length === 0) {
      return Response.json({ error: "Nghĩa tiếng Việt không được để trống" }, { status: 400 });
    }

    const result = addWord({
      id: nanoid(),
      topicId: id,
      english: english.trim(),
      vietnamese: vietArray,
      ipa: ipa?.trim(),
      example: example?.trim(),
      exampleVi: exampleVi?.trim(),
    });

    if (result.duplicate) {
      return Response.json(
        { error: `Từ "${english.trim()}" đã tồn tại trong chủ đề này` },
        { status: 409 }
      );
    }

    return Response.json(
      {
        word: result.word
          ? { ...result.word, vietnamese: JSON.parse(result.word.vietnamese) }
          : null,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/topics/[id]/words]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
