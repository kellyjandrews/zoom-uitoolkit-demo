import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const basePath = process.env.APP_URL

export default async function middleware(req) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!session && path === `/chat-room`) {
    return NextResponse.redirect(new URL(`/`, basePath))
  } else if (session && (path === `/` || path === `$/register`)) {
    return NextResponse.redirect(new URL(`/chat-room`, basePath))
  }
  return NextResponse.next()
}
