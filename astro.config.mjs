import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
// https://astro.build/config
import mdx from "@astrojs/mdx";

import remarkPrism from 'remark-prism';

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [[remarkPrism, { plugins: ["line-numbers"] }]],
  },
   integrations: [
      mdx({
        remarkPlugins: [remarkReadingTime],
        extendDefaultPlugins: true,
      }),
     preact(),
   ],
});
