import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const query = `
    *[_type == "post"]{
      title,
      description,
      content,
      "slug": slug.current
    }
  `;
  const posts = await client.fetch(query);
  return NextResponse.json(posts);
}