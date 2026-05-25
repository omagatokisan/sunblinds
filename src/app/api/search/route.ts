import { NextResponse } from "next/server";
import { getContent } from "@/lib/cms/store";
import { buildSearchIndex, searchIndex } from "@/lib/search-index";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const content = await getContent();
  const hits = buildSearchIndex(content);
  const result = searchIndex(hits, q);
  return NextResponse.json(result);
}
