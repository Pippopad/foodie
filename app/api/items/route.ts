import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  let items;
  try {
    items = await prisma.item.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json({ data: items, status: 200 });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        code: "DATABASE_CONNECTION_ERROR",
        status: 500,
      });
    }
  }
};

const POST = async (req: NextRequest) => {
  try {
    const item = await req.json();
    if (
      item.name === undefined ||
      item.price === undefined ||
      item.amount === undefined
    )
      throw Error();

    const res = await prisma.item.create({
      data: item,
    });

    return NextResponse.json(res);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        code: "DATABASE_CONNECTION_ERROR",
        status: 500,
      });
    } else {
      return NextResponse.json({
        code: "INVALID_REQUEST_BODY",
        status: 400,
      });
    }
  }
};

export { GET, POST };
