import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

    if (isOnDashboard && !isLoggedIn) {
        const loginUrl = new URL('/login', req.nextUrl.origin);
        loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/dashboard/:path*'],
};
