/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.flaticon.com",
                port: "",
                pathname: "/**",
            },
        ],
    },

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
