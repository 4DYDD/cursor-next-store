import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: true, message: "Registrasi berhasil" },
    { status: 201 }
  );
}
