import { NextRequest } from "next/server";
import { updateWord, deleteWord } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; wordId: string }> }
) {
  try {
    const { wordId } = await params;
    const body = await request.json();
    const { english, vietnamese, ipa, example, exampleVi } = body;

    const vietArray = vietnamese
      ? Array.isArray(vietnamese)
        ? vietnamese.map((v: string) => v.trim().toLowerCase()).filter(Boolean)
        : vietnamese.split(",").map((v: string) => v.trim().toLowerCase()).filter(Boolean)
      : undefined;

    const word = updateWord(wordId, {
      english: english?.trim(),
      vietnamese: vietArray,
      ipa: ipa?.trim(),
      example: example?.trim(),
      exampleVi: exampleVi?.trim(),
    });

    if (!word) return Response.json({ error: "Không tìm thấy từ" }, { status: 404 });

    return Response.json({
      word: { ...word, vietnamese: JSON.parse(word.vietnamese) },
    });
  } catch (err) {
    console.error("[PUT /api/topics/[id]/words/[wordId]]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; wordId: string }> }
) {
  try {
    const { wordId } = await params;
    const deleted = deleteWord(wordId);
    if (!deleted) return Response.json({ error: "Không tìm thấy từ" }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/topics/[id]/words/[wordId]]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
