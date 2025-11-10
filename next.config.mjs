import {withSentryConfig} from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: false,
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 year
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pyu0cnhpfktnlqct.public.blob.vercel-storage.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    trailingSlash: true,
    poweredByHeader: false,
    compress: true,
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        webVitalsAttribution: ["CLS", "LCP"],
        optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value:
                            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains; preload",
                    },
                ],
            },
            {
                source:
                    "/(.*)\\.(js|css|svg|png|jpg|jpeg|gif|ico|webp|avif|woff|woff2|ttf|eot)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/api/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value:
                            "public, max-age=300, s-maxage=300, stale-while-revalidate=300",
                    },
                ],
            },
            {
                source:
                    "/(sitemap\\.xml|robots\\.txt|manifest\\.json|browserconfig\\.xml)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=3600, s-maxage=3600",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [];
    },
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true,
            },
            {
                source: "/dashboard",
                destination: "/",
                permanent: true,
            },
            {
                source: "/index",
                destination: "/",
                permanent: true,
            },
            {
                source: "/index.html",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "astrode",

    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
});