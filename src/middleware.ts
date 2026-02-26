import { NextResponse } from 'next/server';

export default function middleware(req: Request) {
    const { pathname } = new URL(req.url);
    const isOnDashboard = pathname.startsWith('/dashboard');
    
    // Obtener token de sesión de las cookies
    const sessionToken = req.headers.get('cookie')?.match(/next-auth.session-token=([^;]+)/)?.[1];
    
    if (isOnDashboard && !sessionToken) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
