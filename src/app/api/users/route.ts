import { deleteData, retrieveData, updateData } from "@/libs/firebase/service";
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

export async function PUT(request: NextRequest) {
  const { id, data } = await request.json();
  return await updateData("users", id, data, ({ status }) => {
    if (status === true) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Update Data Success!",
      });
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Update Data Failed!",
      });
    }
  });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  return await deleteData("users", id, ({ status }) => {
    if (status === true) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Success",
      });
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Failed",
      });
    }
  });
}
