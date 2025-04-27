import { retrieveData } from "@/libs/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await retrieveData("users").then((datas: any) => {
    return datas.map((data: any) => {
      delete data.password;
      return data;
    });
  });

  return NextResponse.json({
    status: true,
    statusCode: 200,
    message: "Success",
    data: users,
  });
}
