import { UserData } from "@/interfaces/UserData";
import { signUp } from "@/services/auth/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = (await request.json()) as UserData;
  const res = await signUp(req);

  return NextResponse.json(
    { user: res.data, message: res.message as string },
    { status: res.statusCode as number }
  );
}
