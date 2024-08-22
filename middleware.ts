import { NextRequest, NextResponse } from "next/server";
import db from "./lib/db";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean;
}

// public으로 접근 가능한 URL
// object 사용 이유 : object 내에서 포함 여부 검색하는 게 array보다 빠름
const publicOnlyUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true,
};

export async function middleware(request: NextRequest) {
    // session 가져오고 user가 cookie에 ID 가지고 있는지 확인
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];
    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (exists) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    }
}

export const config = {
    // middleware가 실행되어야 하는 페이지 지정
    // user로 시작하는 모든 단일 URL에서 실행 : "/user/:path*"
    // matcher: ["/", "/profile", "/create-account"],
    // api, next/static, next/image, favicon 제외하고 middleware 실행
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
