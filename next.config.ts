// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "8sek8cisv0zouv0y.public.blob.vercel-storage.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
