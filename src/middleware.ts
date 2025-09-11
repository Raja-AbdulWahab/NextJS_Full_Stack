import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    // Either token might be there or not so if its there than take value else empty
    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 

// See "Matching Paths" below to learn more. Below are the routes on which we want to run middleware
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
]
}