import { NextResponse } from "next/server";

import { isValidUnlockCode } from "@/lib/unlock-codes";

export async function POST(request: Request) {
  let body: { code?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code : "";

  if (!isValidUnlockCode(code)) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
