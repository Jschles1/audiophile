import getCategoryProducts from "@/lib/server/getCategoryProducts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryName: string } }
) {
  try {
    const category = await getCategoryProducts(params.categoryName);

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
