/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_PROXY}/:path*` // Proxy to Backend
            }
        ]
    }
};

export default nextConfig;
