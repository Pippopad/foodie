import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type ItemsContext = {
  params: {
    id: number;
  };
};

const PUT = async (req: NextRequest, context: ItemsContext) => {
  try {
    const id = +context.params.id;
    if (!id)
      return NextResponse.json({
        code: "INVALID_PARAMATERS",
        status: 400,
        message: "Invalid id",
      });

    const item = await req.json();

    const res = await prisma.item.update({
      where: {
        id: id,
      },
      data: item,
    });

    return NextResponse.json(res);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.message.includes("not found")) {
        return NextResponse.json({
          code: "NOT_FOUND",
          status: 404,
        });
      }
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

const DELETE = async (req: NextRequest, context: ItemsContext) => {
  try {
    const id = +context.params.id;
    if (!id)
      return NextResponse.json({
        code: "INVALID_PARAMATERS",
        status: 400,
        message: "Invalid id",
      });

    const res = await prisma.item.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(res);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.message.includes("not found")) {
        return NextResponse.json({
          code: "NOT_FOUND",
          status: 404,
        });
      }
      return NextResponse.json({
        code: "DATABASE_CONNECTION_ERROR",
        status: 500,
      });
    }
  }
};

export { PUT, DELETE };
