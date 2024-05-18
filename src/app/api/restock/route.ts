import { restockProducts } from "@/api";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    await restockProducts();
    console.log("Successfully restocked products");
    return Response.json({ success: true });
  } /* v8 ignore next 2 */ catch (error) {
    return new Response("Internal Error", { status: 500 });
  }
}
