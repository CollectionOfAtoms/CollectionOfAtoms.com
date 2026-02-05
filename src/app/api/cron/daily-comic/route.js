import OpenAI from "openai";
import { del, put } from "@vercel/blob";
import { query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const key = params.get("key");
  if (key !== process.env.CRON_SECRET) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  const force = params.get("force");
  const existing = await query(
    "select id, image_url from daily_comics where comic_date = $1",
    [today]
  );
  if (!force && existing.rowCount) {
    return Response.json({ ok: true, status: "already exists" });
  }

  const prompts =
    ["Generate a comic that shows a narrative arc.",
     "Generate a comic where two characters are talking with narrative stucture",
     "Generate a comic with a compelling plot and narrative."
    ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  const sizes = ["1024x1024", "1536x1024"]; //Always square or squat to fit on the page.
  const size = sizes[Math.floor(Math.random() * sizes.length)];

  const img = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size,
    quality: "medium",
    output_format: "webp",
    output_compression: 60,
  });

  const b64 = img.data?.[0]?.b64_json;
  if (!b64) {
    return Response.json(
      { ok: false, error: "image generation failed" },
      { status: 502 }
    );
  }

  const buffer = Buffer.from(b64, "base64");
  const filename = `daily-comics/${today}.webp`;

  const blob = await put(filename, buffer, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/webp",
  });

  if (force && existing.rowCount) {
    const previousUrl = existing.rows[0]?.image_url;
    if (previousUrl) {
      try {
        await del(previousUrl);
      } catch {
        // Best-effort cleanup; keep going if delete fails.
      }
    }
    await query(
      `update daily_comics
       set prompt = $2, model = $3, image_url = $4
       where comic_date = $1`,
      [today, prompt, "gpt-image-1-mini", blob.url]
    );
  } else {
    await query(
      `insert into daily_comics (comic_date, prompt, model, image_url)
       values ($1, $2, $3, $4)`,
      [today, prompt, "gpt-image-1-mini", blob.url]
    );
  }

  return Response.json({ ok: true, imageUrl: blob.url });
}
