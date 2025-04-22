import { UserData } from "@/interfaces/UserData";
import { signUp } from "@/libs/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = (await request.json()) as UserData;
  const res = await signUp(req);

  if (res.status === true) {
    return NextResponse.json(res, { status: res.statusCode || 200 });
  } else {
    return NextResponse.json(res, { status: res.statusCode || 404 });
  }
}
