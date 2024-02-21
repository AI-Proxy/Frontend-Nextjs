/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",

    experimental: {
        optimizePackageImports: [],
    },

    // typescript: {
    //     ignoreBuildErrors: true,
    // },
};

export default nextConfig;
