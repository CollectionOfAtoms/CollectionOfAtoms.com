import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const payload = {
      items: Array.isArray(body.items) ? body.items : [],
      selectedItems: Array.isArray(body.selectedItems) ? body.selectedItems : [],
      reflection: typeof body.reflection === "string" ? body.reflection : "",
      source: typeof body.source === "string" ? body.source : "unknown",
      submittedAt: new Date().toISOString(),
    };

    // basic caps (avoid abuse + giant payloads)
    payload.items = payload.items
      .map((entry) => ({
        text: String(entry?.text ?? "").slice(0, 280),
        selected: Boolean(entry?.selected),
        comment: String(entry?.comment ?? "").slice(0, 800),
      }))
      .slice(0, 25);
    payload.selectedItems = payload.items.filter((entry) => entry.selected).map((entry) => entry.text);
    payload.reflection = payload.reflection.slice(0, 4000);
    payload.source = payload.source.slice(0, 100);

    await query(
      `INSERT INTO meaning_submissions (submitted_at, source, items, selected_items, reflection)
       VALUES ($1, $2, $3::jsonb, $4::jsonb, $5)`,
      [
        payload.submittedAt,
        payload.source,
        JSON.stringify(payload.items),
        JSON.stringify(payload.selectedItems),
        payload.reflection,
      ]
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
