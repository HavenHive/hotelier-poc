import { env } from "@/lib/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: `${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com`,
			},
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
			},
		],
	},
};

export default nextConfig;
