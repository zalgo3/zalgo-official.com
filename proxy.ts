import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const slugMatch = /^\/([^/]+)$/.exec(pathname);

    // Top-level routes that must NOT be treated as legacy blog slugs.
    const reservedPaths = ['blog', 'privacy-policy', 'discography', 'about'];

    if (
        slugMatch &&
        // Skip files/route handlers (e.g. feed.xml, manifest.webmanifest);
        // post slugs never contain a dot.
        !slugMatch[1].includes('.') &&
        !reservedPaths.includes(slugMatch[1])
    ) {
        const slug = slugMatch[1];
        const redirectUrl = new URL(`/blog/${slug}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.*.xml).*)',
    ],
};
