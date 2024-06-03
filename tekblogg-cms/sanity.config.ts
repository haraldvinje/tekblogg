import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schemas";

export default defineConfig({
  title: "tekblogg",
  projectId: "jbq2yq78",

  dataset: "production",

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
