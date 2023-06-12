import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // const { pathname } = req.nextUrl;

  const supabase = createMiddlewareClient<any>({ req, res });
  await supabase.auth.getSession();

  // if (!session && pathname === "/") {
  //   const url = new URL(req.url);
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  return res;
}

// export const config = {
//   matcher: ["/"],
// };
