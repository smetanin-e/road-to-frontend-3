import { NextResponse } from 'next/server';

export function setRefreshTokenCookie(response: NextResponse, token: string, maxAgesSec: number) {
  response.cookies.set('refresh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict',
    maxAge: maxAgesSec,
  });
}

// import { cookies } from "next/headers"

// export function setRefreshTokenCookie(token: string, maxAgeSec: number) {
//   cookies().set("refresh_token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     sameSite: "strict",
//     maxAge: maxAgeSec,
//   })
// }
