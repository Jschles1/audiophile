import { getCategoryProducts } from "@/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryName: string } }
) {
  try {
    const category = await getCategoryProducts(params.categoryName);

    return NextResponse.json(category);
  } /* v8 ignore next 2 */ catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
