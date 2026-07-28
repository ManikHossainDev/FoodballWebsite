import { NextRequest, NextResponse } from "next/server";

type Role = "player" | "coach" | "club" | "agent";

const roleRoutes: Record<Role, string[]> = {
  player: [
    "/uploadvideo",
    "/ConnectwithAgent",
    "/editprofileplayer",
    "/FootballPlayer",
    "/HireCoach",
    "/MyOrders",
    "/profileplayer",
    "/wallet",
  ],
  coach: [
    "/BookedConsultations",
    "/Couch",
    "/couchprofile",
    "/couchwallet",
    "/editcouchprofile",
    "/Requests",
    "/ReviewVideos",
  ],
  club: [
    "/Club",
    "/clubprofile",
    "/clubrecommendateplayer",
    "/createhiring",
    "/editclubprofile",
    "/hirerplayers",
    "/WorkwithAgents",
  ],
  agent: [
    "/agentprofile",
    "/agents",
    "/editagentprofile",
    "/exploreclubs",
    "/PlacementProgress",
    "/PlacementsRequests",
    "/recommendedplayers",
  ],
};

function isAllowed(role: Role, pathname: string) {
  const allowedRoutes = roleRoutes[role] ?? [];
  return allowedRoutes.some((route) => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string) {
  return Object.values(roleRoutes).some((routes) =>
    routes.some((route) => pathname.startsWith(route)),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const userCookie = request.cookies.get("user")?.value;
  const token = request.cookies.get("token")?.value;

  if (!userCookie || !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const user = JSON.parse(userCookie);
    const role = user?.role as Role | undefined;

    if (!role || !isAllowed(role, pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (err) {

    console.log(err)
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/uploadvideo/:path*",
    "/ConnectwithAgent/:path*",
    "/editprofileplayer/:path*",
    "/FootballPlayer/:path*",
    "/HireCoach/:path*",
    "/MyOrders/:path*",
    "/profileplayer/:path*",
    "/wallet/:path*",

    "/BookedConsultations/:path*",
    "/Couch/:path*",
    "/couchprofile/:path*",
    "/couchwallet/:path*",
    "/editcouchprofile/:path*",
    "/Requests/:path*",
    "/ReviewVideos/:path*",

    "/Club/:path*",
    "/clubprofile/:path*",
    "/clubrecommendateplayer/:path*",
    "/createhiring/:path*",
    "/editclubprofile/:path*",
    "/hirerplayers/:path*",
    "/WorkwithAgents/:path*",

    "/agentprofile/:path*",
    "/agents/:path*",
    "/editagentprofile/:path*",
    "/exploreclubs/:path*",
    "/PlacementProgress/:path*",
    "/PlacementsRequests/:path*",
    "/recommendedplayers/:path*",
  ],
};
