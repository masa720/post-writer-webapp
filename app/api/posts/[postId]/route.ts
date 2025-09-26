import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { postPathSchema } from "@/lib/validations/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  try {
    const params = await context.params;

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    const json = await req.json();
    const body = postPathSchema.parse(json);

    await db.post.update({
      where: { id: params.postId },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  try {
    const params = await context.params;

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    await db.post.delete({
      where: { id: params.postId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
