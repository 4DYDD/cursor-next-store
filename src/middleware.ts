import { NextResponse } from "next/server";
import WithAuth from "./middlewares/withAuth";

export function mainMiddleware() {
  return NextResponse.next();
}

export default WithAuth(mainMiddleware, [
  "admin",
  "member",
  "login",
  "register",
]);

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };
