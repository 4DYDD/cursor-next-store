import { signUp } from "@/libs/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await signUp(req);

  if (res.status === true) {
    return NextResponse.json(res, { status: 200 });
  } else {
    return NextResponse.json(res, { status: 404 });
  }
}
