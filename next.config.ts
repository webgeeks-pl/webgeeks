import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    experimental: {
        // instrumentationHook: true,
    },
    webpack: (config, _options) => {
        // Require webpack at runtime to avoid TypeScript errors when webpack types aren't installed
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const webpack = require("webpack");

        // Replace non-en zod locale files with a small stub to avoid bundling translations/locales
        // Note: the regexp targets zod v4 locale JS files, while allowing `en.js` and `index.js`.
        config.plugins = config.plugins || [];
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /zod\/v4\/locales\/(?!en\.js$|index\.js$).+\.js$/,
                require.resolve("./zod-locale-stub.js")
            )
        );

        return config;
    },
};



const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
