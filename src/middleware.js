import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('token')?.value
  
  console.log("path name", request.nextUrl.pathname);

    if (request.nextUrl.pathname.startsWith('/document')) {
      return NextResponse.next();
    }

    // if (token && !request.nextUrl.pathname.startsWith('/dashboard')) {
    //   return Response.redirect(new URL('/dashboard', request.url))
    // }
    if (token && request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/booking', request.url))
    }
   
    if (!token && !request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url))
    }
  }
   
  export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }