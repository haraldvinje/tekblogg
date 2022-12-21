import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import schemas from "./schemas/schema";

export default defineConfig({
  title: "tekblogg",
  projectId: "jbq2yq78",
  dataset: "production",
  plugins: [deskTool(), codeInput(), visionTool()],
  schema: {
    types: schemas,
  },
});
