import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  // Token will exist if user is logged in 
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl
  // Allow the requests if the following is true...pageProps 
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  //redirect them to login if theu don't have token AND are requesting protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }

}