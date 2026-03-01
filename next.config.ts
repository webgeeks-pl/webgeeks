import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const allowVercelToolbar = process.env.ALLOW_VERCEL_TOOLBAR === "1";

const ContentSecurityPolicy = `
  default-src 'self' ${allowVercelToolbar ? "https://vercel.live/" : ""};
  script-src 'self' 'unsafe-inline' 'unsafe-eval' ${allowVercelToolbar ? "https://vercel.live/ https://va.vercel-scripts.com" : ""};
  style-src 'self' 'unsafe-inline' ${allowVercelToolbar ? "https://vercel.live" : ""};
  img-src 'self' blob: data: https://cdn.jsdelivr.net ${allowVercelToolbar ? "https://vercel.live https://vercel.com data: blob:" : ""};
  font-src 'self' ${allowVercelToolbar ? "https://vercel.live https://assets.vercel.com" : ""};
  connect-src 'self'  ${allowVercelToolbar ? "https://vercel.live wss://ws-us3.pusher.com http://localhost:25000" : ""};
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' ${allowVercelToolbar ? "https://vercel.live/" : ""};
  object-src 'none';
`.replace(/\n/g, "");

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    poweredByHeader: false,
    crossOrigin: "anonymous",
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    // THIS is the important part:
    output: "standalone",
    experimental: {
        optimizePackageImports: [
            "lucide-react",
            "motion",
            "motion/react",
            "radix-ui",
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "@headlessui/react",
            "embla-carousel-react",
        ],
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: ContentSecurityPolicy,
                    },
                ],
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
