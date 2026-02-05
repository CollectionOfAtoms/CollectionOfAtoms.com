import { query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const result = await query(
    `select id, comic_date, prompt, model, image_url
     from daily_comics
     order by comic_date desc, id desc
     limit 1`
  );

  const row = result.rows?.[0];
  if (!row) {
    return Response.json({ ok: true, data: null });
  }

  return Response.json({
    ok: true,
    data: {
      id: row.id,
      comicDate: row.comic_date,
      prompt: row.prompt,
      model: row.model,
      imageUrl: row.image_url,
    },
  });
}
