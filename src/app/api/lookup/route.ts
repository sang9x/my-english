import { NextRequest } from "next/server";

// Cambridge Dictionary API (free, no key required)
const DICT_API = "https://api.dictionaryapi.dev/api/v2/entries/en";
const TIMEOUT_MS = 5000;

interface DictEntry {
  word: string;
  phonetics?: Array<{ text?: string; audio?: string }>;
  meanings?: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

export async function GET(request: NextRequest) {
  const word = request.nextUrl.searchParams.get("word")?.trim();

  if (!word) {
    return Response.json({ error: "Thiếu tham số 'word'" }, { status: 400 });
  }

  if (word.length > 100) {
    return Response.json({ error: "Từ quá dài" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(`${DICT_API}/${encodeURIComponent(word)}`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (res.status === 404) {
      return Response.json({
        found: false,
        word,
        ipa: "",
        definitions: [],
        audioUrl: "",
      });
    }

    if (!res.ok) {
      return Response.json(
        { error: "Lỗi kết nối đến từ điển" },
        { status: 502 }
      );
    }

    const data = (await res.json()) as DictEntry[];
    const entry = data[0];

    // Extract IPA
    const ipa =
      entry.phonetics?.find((p) => p.text)?.text ??
      entry.phonetics?.[0]?.text ??
      "";

    // Extract audio URL
    const audioUrl =
      entry.phonetics?.find((p) => p.audio)?.audio ?? "";

    // Extract definitions (max 3 meanings, 2 defs each)
    const definitions = (entry.meanings ?? []).slice(0, 3).flatMap((m) =>
      m.definitions.slice(0, 2).map((d) => ({
        partOfSpeech: m.partOfSpeech,
        definition: d.definition,
        example: d.example ?? "",
      }))
    );

    return Response.json(
      {
        found: true,
        word: entry.word ?? word,
        ipa,
        audioUrl,
        definitions,
      },
      {
        headers: {
          // Cache for 24 hours at the edge (CDN), 1 hour at browser
          "Cache-Control": "public, s-maxage=86400, max-age=3600",
        },
      }
    );
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return Response.json(
        { error: "Tra cứu quá thời gian (timeout 5s). Vui lòng thử lại." },
        { status: 504 }
      );
    }
    console.error("[GET /api/lookup]", err);
    return Response.json({ error: "Lỗi kết nối đến từ điển" }, { status: 502 });
  }
}
