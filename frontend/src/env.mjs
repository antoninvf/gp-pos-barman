import { createEnv } from "@t3-oss/env-nextjs";

import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_API_URL: z.string().min(1),
        NEXT_PUBLIC_BUILD_ENV: z.enum(["development", "production"]),
        NEXT_PUBLIC_SERVER_URL: z.string().url()
    },

    runtimeEnv: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_BUILD_ENV: process.env.NEXT_PUBLIC_BUILD_ENV,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
});
