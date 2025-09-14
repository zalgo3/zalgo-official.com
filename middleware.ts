import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const slugMatch = /^\/([^/]+)$/.exec(pathname);

    if (
        slugMatch &&
        slugMatch[1] !== 'blog' &&
        slugMatch[1] !== 'privacy-policy'
    ) {
        const slug = slugMatch[1];
        const redirectUrl = new URL(`/blog/${slug}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|robots.txt|sitemap.*.xml).*)',
    ],
};
