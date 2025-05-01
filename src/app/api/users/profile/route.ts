import { retrieveDataById } from "@/libs/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const Authorization = request.headers.get("Authorization");
  const token = Authorization?.split(" ")[1] || "";

  const result = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          const profile: any = await retrieveDataById("users", decoded.id);
          profile.password = undefined;

          resolve(
            NextResponse.json(
              {
                status: true,
                statusCode: 200,
                message: "Success",
                data: profile,
              },
              { status: 200 }
            )
          );
        } else {
          reject(
            NextResponse.json(
              {
                status: false,
                statusCode: 403,
                message: "Access Denied!",
                data: null,
              },
              { status: 403 }
            )
          );
        }
      }
    );
  })
    .then((response: any) => response)
    .catch((error: any) => error);

  return result;
}
