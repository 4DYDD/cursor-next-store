import { deleteData, retrieveData, updateData } from "@/libs/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//
//
//
// BUAT JUGA FITUR API ACCESS TOKEN UNTUK GET USERS NANTI !
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

export async function PUT(request: NextRequest) {
  const { id, data } = await request.json();
  const Authorization = request.headers.get("Authorization");
  const token = Authorization?.split(" ")[1] || "";

  const result = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("users", id, data, ({ status }) => {
            if (status === true) {
              return resolve(
                NextResponse.json({
                  status: true,
                  statusCode: 200,
                  message: "Update Data Success!",
                })
              );
            } else {
              return reject(
                NextResponse.json({
                  status: false,
                  statusCode: 400,
                  message: "Update Data Failed!",
                })
              );
            }
          });
        } else {
          reject(
            NextResponse.json(
              {
                status: false,
                statusCode: 403,
                message: "Access Denied!",
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

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const Authorization = request.headers.get("Authorization");
  const token = Authorization?.split(" ")[1] || "";

  return await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "member") {
          await deleteData("users", id, ({ status }) => {
            if (status === true) {
              return resolve(
                NextResponse.json(
                  {
                    status: true,
                    statusCode: 200,
                    message: "Success",
                  },
                  { status: 200 }
                )
              );
            } else {
              return reject(
                NextResponse.json(
                  {
                    status: false,
                    statusCode: 400,
                    message: "Failed",
                  },
                  { status: 400 }
                )
              );
            }
          });
        } else {
          reject(
            NextResponse.json(
              {
                status: false,
                statusCode: 403,
                message: "Access Denied!",
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
}
