import { getProductDetail } from "@/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryName: string; productSlug: string } }
) {
  try {
    const product = await getProductDetail(params.productSlug);

    return NextResponse.json(product);
  } /* v8 ignore next 2 */ catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
