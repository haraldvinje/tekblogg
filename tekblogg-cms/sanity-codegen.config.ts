import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./schemas/schema.js",
  outputPath: "../tekblogg-web/src/types/sanity-schema.ts",
};

export default config;
