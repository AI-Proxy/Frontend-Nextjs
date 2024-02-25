/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",

    experimental: {
        optimizePackageImports: [],
    },

    // compiler: {
    //     removeConsole: {
    //         exclude: ["error"],
    //     },
    // },

    // typescript: {
    //     ignoreBuildErrors: true,
    // },
};

export default nextConfig;
